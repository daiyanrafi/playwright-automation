import { Page, Locator } from "@playwright/test";
import { BasePage } from "../BasePage";

export class OpenHRMDashboardPage extends BasePage {
  public dashboardHeader: Locator;
  public applyLeaveHeader: Locator;
  private applyLeaveMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboardHeader = page.getByRole("heading", { name: "Dashboard" });
    this.applyLeaveMenu = page.getByRole("button", { name: "Apply Leave" });
    this.applyLeaveHeader = page.getByRole("heading", { name: "Apply Leave" });
  }

  async navigateToApplyLeave() {
    await this.clickButton(this.applyLeaveMenu);
  }
}
