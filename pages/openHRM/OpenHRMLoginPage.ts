import { Page, Locator } from "@playwright/test";
import { BasePage } from "../BasePage";
import { openHRMCredentials } from "@fixtures/constants";

export class OpenHRMLoginPage extends BasePage {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private loginError: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.loginError = page
      .getByRole("alert")
      .locator("div")
      .filter({ hasText: "Invalid credentials" });
  }

  async login(
    username: string = openHRMCredentials.username,
    password: string = openHRMCredentials.password
  ) {
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.clickButton(this.loginButton);
  }

  async invalidLogin(username: string, password: string) {
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.clickButton(this.loginButton);
  }

  async isLoginErrorVisible(): Promise<boolean> {
    return this.loginError.isVisible();
  }
}
