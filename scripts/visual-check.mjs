import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const browserPath =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const outputDir = path.join(process.cwd(), ".qa");

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: browserPath,
  headless: true
});

const checks = [
  { name: "home-desktop", url: "/", width: 1440, height: 1100 },
  { name: "home-mobile", url: "/", width: 390, height: 844 },
  { name: "classes-mobile", url: "/classes/", width: 390, height: 844 },
  { name: "gallery-desktop", url: "/gallery/", width: 1440, height: 1000 },
  {
    name: "contact-form-mobile",
    url: "/contact/",
    width: 390,
    height: 844,
    selector: ".contact-form-panel"
  }
];

for (const check of checks) {
  const page = await browser.newPage({
    viewport: { width: check.width, height: check.height },
    deviceScaleFactor: 1
  });
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto(`http://localhost:3000${check.url}`, {
    waitUntil: "networkidle"
  });
  const screenshotPath = path.join(outputDir, `${check.name}.png`);
  if (check.selector) {
    await page.locator(check.selector).screenshot({ path: screenshotPath });
  } else {
    await page.screenshot({ path: screenshotPath, fullPage: false });
  }

  const metrics = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    title: document.title
  }));

  console.log(
    JSON.stringify({
      name: check.name,
      ...metrics,
      overflow: metrics.scrollWidth > metrics.viewport,
      consoleErrors: errors
    })
  );
  await page.close();
}

await browser.close();
