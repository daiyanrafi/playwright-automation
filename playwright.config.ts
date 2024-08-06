import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalSetup: require.resolve('./global-setup.ts'),
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  testMatch: '*tests/**/*.spec.ts',
  workers: 4,
  // timeout: 6 * 60 * 1000,
  timeout: 86400000,
  expect: {
    timeout: 10000,
  },
  use: {
    video: 'on',
    trace: 'on',
    ignoreHTTPSErrors: true,
  },
  projects: [
    // {
    //   name: 'Worker 1 - Chrome',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     browserName: 'chromium',
    //   },
    //   testMatch: 'e2e/suites/googleLoginAndSearch.spec.ts',
    // },
    {
      name: 'Worker 2 - Firefox',
      use: {
        ...devices['Desktop Firefox'],
        browserName: 'firefox',
      },
      testMatch: 'e2e/suites/openHRMLoginAndNavigate.spec.ts',
    },
    // {
    //   name: 'Worker 3 - WebKit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     browserName: 'webkit',
    //   },
    //   testMatch: 'e2e/suites/googleLoginAndSearch.spec.ts',
    // },
  ],
});
