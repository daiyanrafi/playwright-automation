import { test } from "@playwright/test";
import openHRMLoginAndNavigateTests from "../testCases/openHRMLoginAndNavigate.spec";

test.describe(
  "Open HRM Login and Navigate Test Suite",
  openHRMLoginAndNavigateTests
);
