import { chromium } from "playwright-core";

const browserPath =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const baseURL = "http://localhost:3000";
const checkExternalForm = process.argv.includes("--external");
const googleFormPath =
  "/forms/d/e/1FAIpQLSdplyiycVzvKNsoa24rAN3w3vqr_RQl5srWJSif3hY0qvnGZg/viewform";
const routes = [
  "/",
  "/about/",
  "/classes/",
  "/gallery/",
  "/workshops/",
  "/registration/",
  "/contact/"
];
const results = [];

const browser = await chromium.launch({
  executablePath: browserPath,
  headless: true
});

async function checkRoute(route, viewport) {
  const page = await browser.newPage({ viewport });
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  const response = await page.goto(`${baseURL}${route}`, {
    waitUntil: "networkidle"
  });
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));
  const result = {
    route,
    viewport: `${viewport.width}x${viewport.height}`,
    status: response?.status(),
    overflow: dimensions.scrollWidth > dimensions.viewport,
    consoleErrors
  };
  results.push(result);
  if (result.status !== 200 || result.overflow || consoleErrors.length) {
    throw new Error(`Route check failed: ${JSON.stringify(result)}`);
  }
  await page.close();
}

for (const route of routes) {
  await checkRoute(route, { width: 390, height: 844 });
}
await checkRoute("/", { width: 1440, height: 1000 });

const menuPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
await menuPage.goto(baseURL, { waitUntil: "networkidle" });
const floatingWhatsApp = await menuPage
  .locator(".floating-whatsapp")
  .getAttribute("href");
if (!floatingWhatsApp?.startsWith("https://wa.me/919976146493")) {
  throw new Error(`Unexpected floating WhatsApp link: ${floatingWhatsApp}`);
}
await menuPage.locator(".menu-button").click();
if (!(await menuPage.locator(".mobile-panel.open").isVisible())) {
  throw new Error("Mobile menu did not open");
}
await menuPage.locator(".mobile-nav a", { hasText: "Classes" }).click();
await menuPage.waitForURL("**/classes/");
results.push({ interaction: "mobile navigation", passed: true });
results.push({ interaction: "WhatsApp number link", passed: true });
await menuPage.close();

const classPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await classPage.goto(`${baseURL}/classes/`, { waitUntil: "networkidle" });
await classPage.getByRole("button", { name: "Craft", exact: true }).click();
const visibleCraftClasses = await classPage.locator(".course-card").count();
if (visibleCraftClasses !== 2) {
  throw new Error(`Expected 2 craft classes, found ${visibleCraftClasses}`);
}
results.push({
  interaction: "class category filter",
  passed: true,
  visibleCraftClasses
});
await classPage.close();

const galleryPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await galleryPage.goto(`${baseURL}/gallery/`, { waitUntil: "networkidle" });
await galleryPage.locator(".gallery-item").first().click();
if (!(await galleryPage.locator(".lightbox").isVisible())) {
  throw new Error("Gallery lightbox did not open");
}
await galleryPage.keyboard.press("Escape");
if (await galleryPage.locator(".lightbox").isVisible()) {
  throw new Error("Gallery lightbox did not close with Escape");
}
results.push({ interaction: "gallery lightbox keyboard close", passed: true });
await galleryPage.close();

const contactPage = await browser.newPage({
  viewport: { width: 390, height: 844 }
});
let resolveGoogleFormResponse;
const googleFormResponsePromise = new Promise((resolve) => {
  resolveGoogleFormResponse = resolve;
});
contactPage.on("response", (response) => {
  if (
    response.url().includes(googleFormPath) &&
    response.request().resourceType() === "document"
  ) {
    resolveGoogleFormResponse(response);
  }
});
await contactPage.goto(`${baseURL}/contact/`, { waitUntil: "networkidle" });
const enquiryForm = contactPage.getByTitle("Sri School of Art enquiry form");
if (!(await enquiryForm.isVisible())) {
  throw new Error("Google Forms enquiry embed is not visible");
}
const enquiryFormSource = await enquiryForm.getAttribute("src");
if (
  enquiryFormSource !==
  "https://docs.google.com/forms/d/e/1FAIpQLSdplyiycVzvKNsoa24rAN3w3vqr_RQl5srWJSif3hY0qvnGZg/viewform?embedded=true"
) {
  throw new Error(`Unexpected Google Forms embed: ${enquiryFormSource}`);
}
results.push({ interaction: "Google Forms enquiry embed", passed: true });

if (checkExternalForm) {
  await enquiryForm.scrollIntoViewIfNeeded();
  const googleFormResponse = await Promise.race([
    googleFormResponsePromise,
    new Promise((resolve) => setTimeout(() => resolve(null), 15000))
  ]);
  if (!googleFormResponse) {
    throw new Error("Google Forms embed did not return a document response");
  }
  if (googleFormResponse.status() >= 400) {
    throw new Error(
      `Google Forms embed returned HTTP ${googleFormResponse.status()}`
    );
  }

  const googleFormFrame = contactPage
    .frames()
    .find((frame) => frame.url().includes(googleFormPath));
  const googleFormText = googleFormFrame
    ? (await googleFormFrame.locator("body").innerText()).toLowerCase()
    : "";
  if (
    !googleFormText ||
    googleFormText.includes("you must sign in to access this content") ||
    googleFormText.includes("you need access")
  ) {
    throw new Error("Google Forms embed is not publicly usable");
  }
  results.push({
    interaction: "public Google Forms availability",
    passed: true
  });
}
await contactPage.close();

const registrationPage = await browser.newPage({
  viewport: { width: 1280, height: 900 }
});
await registrationPage.goto(`${baseURL}/registration/`, {
  waitUntil: "networkidle"
});
await registrationPage.locator('[name="studentName"]').fill("Test Learner");
await registrationPage.locator('[name="age"]').fill("12");
await registrationPage.locator('[name="guardianName"]').fill("Test Parent");
await registrationPage.locator('[name="phone"]').fill("9876543210");
await registrationPage.locator('[name="email"]').fill("test@example.com");
await registrationPage
  .locator('[name="selectedClass"]')
  .selectOption({ label: "Drawing Foundations" });
await registrationPage
  .locator('[name="preferredBatch"]')
  .selectOption({ label: "Saturday morning" });
await registrationPage
  .locator('[name="mode"]')
  .selectOption({ label: "Studio / offline" });
await registrationPage
  .locator('[name="experience"]')
  .selectOption({ label: "Complete beginner" });
await registrationPage.getByRole("button", { name: "Send registration request" }).click();
if (!(await registrationPage.locator(".form-success").isVisible())) {
  throw new Error("Registration confirmation did not appear");
}
const registrationWhatsApp = await registrationPage
  .getByRole("link", { name: "Continue on WhatsApp" })
  .getAttribute("href");
if (
  !registrationWhatsApp?.startsWith("https://wa.me/919976146493") ||
  !registrationWhatsApp.includes("Test%20Learner")
) {
  throw new Error(
    `Registration WhatsApp handoff is incorrect: ${registrationWhatsApp}`
  );
}
results.push({ interaction: "registration confirmation", passed: true });
await registrationPage.close();

await browser.close();

for (const result of results) {
  console.log(JSON.stringify(result));
}
