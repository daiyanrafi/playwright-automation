import { Page, Locator } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async fillInput(locator: Locator, value: string) {
    await locator.isVisible();
    await locator.fill(value);
  }

  public async clickButton(locator: Locator) {
    await locator.isEnabled();
    await locator.isVisible();
    await locator.click();
  }

  public async navigateTo(url: string) {
    await this.page.goto(url, { waitUntil: "networkidle", timeout: 86400000 });
  }

  public async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) || "";
  }

  public async waitForSelector(locator: Locator, timeout: number = 30000) {
    await locator.waitFor({ state: "visible", timeout });
  }
}
