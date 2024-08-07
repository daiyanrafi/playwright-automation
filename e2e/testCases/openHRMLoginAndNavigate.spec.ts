// import { test, expect, Page } from "@playwright/test";
// import { OpenHRMLoginPage } from "../../pages/openHRM/OpenHRMLoginPage";
// import { OpenHRMDashboardPage } from "../../pages/openHRM/OpenHRMDashboardPage";
// import { openHRMCredentials } from "../../fixtures/constants";
// import { OpenHRMLeavePage } from "@pages/openHRM/OpenHRMLeavePage";

// export default function openHRMLoginAndNavigateTests() {
//   test.describe("Open HRM Login and Navigate Test Cases", () => {
//     let page: Page;
//     let loginPage: OpenHRMLoginPage;
//     let dashboardPage: OpenHRMDashboardPage;
//     let leavePage: OpenHRMLeavePage;

//     test.beforeAll(async ({ browser }) => {
//       const context = await browser.newContext();
//       page = await context.newPage();

//       loginPage = new OpenHRMLoginPage(page);
//       dashboardPage = new OpenHRMDashboardPage(page);
//       leavePage = new OpenHRMLeavePage(page);

//       await loginPage.navigateTo(
//         "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
//       );
//       await loginPage.login(
//         openHRMCredentials.username,
//         openHRMCredentials.password
//       );

//       await expect(dashboardPage.dashboardHeader).toBeVisible();
//     });

//     test("Should login to Open HRM and navigate to Apply Leave", async () => {
//       await dashboardPage.navigateToApplyLeave();

//       await page.waitForTimeout(5000); // 5 seconds gg
//       await expect(dashboardPage.applyLeaveHeader).toBeVisible();
//     });

//     test("Should apply for leave", async () => {
//       await dashboardPage.navigateToApplyLeave();
//       await page.waitForTimeout(5000); // 5 seconds gg

//       await leavePage.applyLeave("Family-GG-1");
//     });

//     test("Should update the applied leave", async () => {
//       await dashboardPage.navigateToApplyLeave();

//       // Update leave
//       await leavePage.updateLeave("Updated reason");
//       expect(await leavePage.updatedLeaveComment()).toBe(true);
//     });

//     test("Should cancel the updated leave", async () => {
//       await dashboardPage.navigateToApplyLeave();

//       // Cancel leave
//       await leavePage.cancelLeave("2023-08-10");
//       await expect(
//         page.locator("text=Leave Canceled Successfully")
//       ).toBeVisible();
//     });
//   });

//   test.describe("Open HRM Invalid Login Test Case", () => {
//     let page: Page;
//     let loginPage: OpenHRMLoginPage;

//     test.beforeAll(async ({ browser }) => {
//       const context = await browser.newContext();
//       page = await context.newPage();
//       loginPage = new OpenHRMLoginPage(page);
//     });

//     test("Login with invalid credentials", async () => {
//       await loginPage.navigateTo(
//         "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
//       );
//       await loginPage.invalidLogin("invalid_user", "invalid_password");
//       await page.waitForTimeout(5000); // 5 seconds wait
//       expect(await loginPage.isLoginErrorVisible()).toBe(true);
//     });
//   });
// }


import { test, expect, Page } from "@playwright/test";
import { OpenHRMLoginPage } from "../../pages/openHRM/OpenHRMLoginPage";
import { OpenHRMDashboardPage } from "../../pages/openHRM/OpenHRMDashboardPage";
import { openHRMCredentials } from "../../fixtures/constants";
import { OpenHRMLeavePage } from "@pages/openHRM/OpenHRMLeavePage";
import { urls } from "@fixtures/testData";

export default function openHRMLoginAndNavigateTests() {
  test.describe("Open HRM Login and Navigate Test Cases", () => {
    let page: Page;
    let loginPage: OpenHRMLoginPage;
    let dashboardPage: OpenHRMDashboardPage;
    let leavePage: OpenHRMLeavePage;

    test.beforeAll(async ({ browser }) => {
      const context = await browser.newContext();
      page = await context.newPage();

      loginPage = new OpenHRMLoginPage(page);
      dashboardPage = new OpenHRMDashboardPage(page);
      leavePage = new OpenHRMLeavePage(page);

      // await test.step("Navigate to login page", async () => {
      //   // await loginPage.navigateTo("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
      //   await loginPage.navigateTo(urls.loginUrl);
      // });

      // await test.step("Login with valid credentials", async () => {
      //   await loginPage.login(
      //     openHRMCredentials.username,
      //     openHRMCredentials.password
      //   );
      // });

      await test.step("Verify dashboard header is visible", async () => {
        await loginPage.navigateTo(urls.loginUrl);
        await loginPage.login()
        await expect(dashboardPage.dashboardHeader).toBeVisible();
      });
    });

    test("Should login to Open HRM and navigate to Apply Leave", async () => {
      await test.step("Navigate to Apply Leave", async () => {
        await dashboardPage.navigateToApplyLeave();
      });

      await test.step("Wait for Apply Leave page to load", async () => {
        await page.waitForTimeout(5000); // 5 seconds wait
      });

      await test.step("Verify Apply Leave header is visible", async () => {
        await expect(dashboardPage.applyLeaveHeader).toBeVisible();
      });
    });

    test("Should apply for leave", async () => {
      await test.step("Navigate to Apply Leave", async () => {
        await dashboardPage.navigateToApplyLeave();
      });

      await test.step("Wait for Apply Leave page to load", async () => {
        await page.waitForTimeout(5000); // 5 seconds wait
      });

      await test.step("Apply for leave", async () => {
        await leavePage.applyLeave("Family-GG-1");
      });
    });

    test("Should update the applied leave", async () => {
      await test.step("Navigate to Apply Leave", async () => {
        await dashboardPage.navigateToApplyLeave();
      });

      await test.step("Update leave", async () => {
        await leavePage.updateLeave("Updated reason");
      });

      await test.step("Verify leave comment is updated", async () => {
        expect(await leavePage.updatedLeaveComment()).toBe(true);
      });
    });

    test("Should cancel the updated leave", async () => {
      await test.step("Navigate to Apply Leave", async () => {
        await dashboardPage.navigateToApplyLeave();
      });

      await test.step("Cancel leave", async () => {
        await leavePage.cancelLeave("2023-08-10");
      });

      await test.step("Verify leave cancellation success message", async () => {
        await expect(
          page.locator("text=Leave Canceled Successfully")
        ).toBeVisible();
      });
    });
  });

  test.describe("Open HRM Invalid Login Test Case", () => {
    let page: Page;
    let loginPage: OpenHRMLoginPage;

    test.beforeAll(async ({ browser }) => {
      const context = await browser.newContext();
      page = await context.newPage();
      loginPage = new OpenHRMLoginPage(page);
    });

    test("Login with invalid credentials", async () => {
      await test.step("Navigate to login page", async () => {
        await loginPage.navigateTo(urls.loginUrl);
      });

      await test.step("Login with invalid credentials", async () => {
        await loginPage.invalidLogin("invalid_user", "invalid_password");
      });

      await test.step("Wait for error message", async () => {
        await page.waitForTimeout(5000); // 5 seconds wait
      });

      await test.step("Verify login error is visible", async () => {
        expect(await loginPage.isLoginErrorVisible()).toBe(true);
      });
    });
  });
}
