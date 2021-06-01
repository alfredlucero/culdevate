import "expect-playwright";
import { chromium, firefox, webkit, Browser, Page } from "playwright";

describe("Sample E2E Tests", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    // Start a browser instance in headless mode
    browser = await chromium.launch();
    // Start a browser instance with the GUI open
    // browser = await chromium.launch({ headless: false, slowMo: 100 });
    // browser = await firefox.launch({ headless: false, slowMo: 100 });
    // browser = await webkit.launch({ headless: true, slowMo: 100 });
  });

  afterAll(async () => {
    // Make sure to close the browser out at the end
    await browser.close();
  });

  beforeEach(async () => {
    // Single tab/pop-up window within browser context; can also interact with Frames
    page = await browser.newPage();
  });

  afterEach(async () => {
    // Close out the page
    await page.close();
  });

  it("should be able to go to an example website", async () => {
    await page.goto("https://www.example.com");
    expect(await page.title()).toBe("Example Domain");

    // Default Playwright API text content checks
    const isHeaderVisible = await page.isVisible("h1");
    expect(isHeaderVisible).toBe(true);
    const headerContent = await page.textContent("h1");
    expect(headerContent).toBe("Example Domain");

    // Using expect-playwright helpers: https://github.com/playwright-community/expect-playwright#api-documentation
    await expect(page).toHaveText("h1", "Example Domain");
  });

  it.skip("should take a screenshot of a site", async () => {
    await page.goto("http://whatsmyuseragent.org/");
    await page.screenshot({ path: `src/e2e/outputs/useragentscreenshot.png` });
  });
});
