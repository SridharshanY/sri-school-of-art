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
  "/contact/",
  "/admin/"
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
  const dimensions = await page.evaluate(() => {
    const viewport = document.documentElement.clientWidth;
    const pageRoot = document.documentElement.classList.contains("admin-document")
      ? document.body
      : document.documentElement;
    return {
      viewport,
      scrollWidth: pageRoot.scrollWidth
    };
  });
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

const mapEmbed = contactPage.getByTitle(
  "Sri School of Arts location on Google Maps"
);
if (!(await mapEmbed.isVisible())) {
  throw new Error("Google Maps location embed is not visible");
}
const mapEmbedSource = await mapEmbed.getAttribute("src");
if (
  !mapEmbedSource?.startsWith("https://www.google.com/maps/embed?pb=") ||
  !mapEmbedSource.includes("SRI%20SCHOOL%20OF%20ARTS")
) {
  throw new Error(`Unexpected Google Maps embed: ${mapEmbedSource}`);
}
results.push({ interaction: "Google Maps location embed", passed: true });
const directionsLink = contactPage.getByRole("link", {
  name: "Get directions"
});
const directionsSource = await directionsLink.getAttribute("href");
if (
  directionsSource !==
  "https://www.google.com/maps/dir/?api=1&destination=11.457126428321008%2C77.43991021002283"
) {
  throw new Error(`Unexpected Google Maps directions link: ${directionsSource}`);
}

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

const adminPage = await browser.newPage({
  viewport: { width: 1440, height: 1000 }
});
await adminPage.goto(`${baseURL}/admin/`, { waitUntil: "networkidle" });
if (
  (await adminPage.locator("header.site-header").count()) !== 0 ||
  (await adminPage.locator(".floating-whatsapp").count()) !== 0
) {
  throw new Error("Public website chrome is visible inside the admin portal");
}
if (
  !(await adminPage
    .getByRole("heading", { name: "Welcome back." })
    .isVisible()) ||
  !(await adminPage.getByLabel("Email address").isVisible()) ||
  !(await adminPage.getByLabel("Password").isVisible())
) {
  throw new Error("Protected admin route did not show the login screen");
}
results.push({ interaction: "admin route authentication guard", passed: true });
await adminPage.close();

const adminMobilePage = await browser.newPage({
  viewport: { width: 390, height: 844 }
});
await adminMobilePage.goto(`${baseURL}/admin/login/`, {
  waitUntil: "networkidle"
});
if (!(await adminMobilePage.getByRole("button", { name: "Sign in to admin" }).isVisible())) {
  throw new Error("Admin mobile login form is not usable");
}
results.push({ interaction: "admin mobile login", passed: true });
await adminMobilePage.close();

const apiPage = await browser.newPage();
const healthResponse = await apiPage.request.get(`${baseURL}/api/health/`);
const healthBody = await healthResponse.json();
if (healthResponse.status() !== 200 || healthBody.status !== "ok") {
  throw new Error(`API health check failed: ${JSON.stringify(healthBody)}`);
}
const sessionResponse = await apiPage.request.get(
  `${baseURL}/api/admin/session/`
);
if (![401, 503].includes(sessionResponse.status())) {
  throw new Error(
    `Unauthenticated admin session returned ${sessionResponse.status()}`
  );
}
results.push({ interaction: "API health and session guards", passed: true });
await apiPage.close();

await browser.close();

for (const result of results) {
  console.log(JSON.stringify(result));
}
