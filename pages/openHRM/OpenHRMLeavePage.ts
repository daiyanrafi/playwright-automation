import { BasePage } from "@pages/BasePage";
import { Page, Locator } from "@playwright/test";

export class OpenHRMLeavePage extends BasePage {
  private leaveTypeDropdown: Locator;
  private selectOption: Locator;
  private fromDateInput: Locator;
  private selectFromDate: Locator;
  private reasonInput: Locator;
  private applyButton: Locator;
  private myLeave: Locator;
  private leaveListButton: Locator;
  private commentHere: Locator;
  private addCommentButton: Locator;
  private saveButton: Locator;
  private updatedText: Locator;
  private cancelButton: Locator;

  constructor(page: Page) {
    super(page);

    this.leaveTypeDropdown = page.getByText("-- Select --").first();
    this.selectOption = page.getByRole("option", { name: "CAN - FMLA" });
    this.fromDateInput = page.getByPlaceholder("dd-mm-yyyy").first();
    this.selectFromDate = page.getByText("14");

    this.reasonInput = page.locator("textarea");
    this.applyButton = page.getByRole("button", { name: "Apply" });

    this.myLeave = page.getByRole("link", { name: "My Leave" });
    this.leaveListButton = page.getByRole("button", { name: "" });
    this.leaveListButton = page
      .getByRole("row", { name: " 2024-15-08 aaa oEQii wQAqg" })
      .getByRole("listitem")
      .getByRole("button");
    this.addCommentButton = page.getByText("Add Comment");
    this.commentHere = page.getByPlaceholder("Comment here");
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.updatedText = page.getByText("Family-GG-1");
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
  }

  async applyLeave(reason: string) {
    await this.clickButton(this.leaveTypeDropdown);
    await this.clickButton(this.selectOption);
    await this.clickButton(this.fromDateInput);
    await this.clickButton(this.selectFromDate);
    await this.fillInput(this.reasonInput, reason);
    await this.clickButton(this.applyButton);
  }

  async updateLeave(updatedReason: string) {
    await this.clickButton(this.myLeave);
    await this.clickButton(this.leaveListButton);
    await this.clickButton(this.addCommentButton);
    await this.clickButton(this.commentHere);
    await this.fillInput(this.reasonInput, updatedReason);
    await this.clickButton(this.saveButton);
  }

  async cancelLeave(fromDate: string) {
    await this.clickButton(this.leaveListButton);
    await this.clickButton(this.cancelButton);
  }

  async updatedLeaveComment(): Promise<boolean> {
    return this.updatedText.isVisible();
  }
}
