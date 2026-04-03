import { test, expect } from "@playwright/test";

const uniqueEmail = `qa+${Date.now()}@example.com`;
const password = "Qa!12345_test";

test.describe("@auth-prod Vercel auth flows", () => {
  test.describe.configure({ mode: "serial" });

  test("signup collects required fields and shows OTP banner", async ({ page }) => {
    await page.goto("/auth");
    await page.getByRole("button", { name: /^SIGN UP$/ }).click();

    await page.fill("#fullName", "QA Bot");
    await page.fill("#whatsapp", "+1 415 555 0101");
    await page.fill("#manager", "RS-AUTO");
    await page.fill("#signup-email", uniqueEmail);
    await page.fill("#new-password", password);
    await page.fill("#confirm-password", password);

    await page.getByRole("button", { name: /SEND OTP/i }).click();
    await expect(page.getByText(/OTP sent to your email/i)).toBeVisible({ timeout: 20_000 });
  });

  test("login tab shows error on incorrect password (unconfirmed user)", async ({ page }) => {
    await page.goto("/auth");
    await page.getByRole("button", { name: /^LOGIN$/ }).click();

    await page.fill("#email", uniqueEmail);
    await page.fill("#password", "WrongPass123!");
    await page.getByRole("button", { name: /^LOGIN$/ }).click();

    await expect(page.getByText(/email|credentials|confirm/i)).toBeVisible({ timeout: 15_000 });
  });

  test("Google button reaches consent screen", async ({ page, context }) => {
    await page.goto("/auth");
    const [popup] = await Promise.all([
      context.waitForEvent("page"),
      page.getByRole("button", { name: /Continue with Google/i }).click(),
    ]);
    await popup.waitForLoadState("domcontentloaded", { timeout: 20_000 });
    await expect(popup).toHaveURL(/accounts\.google\.com/);
    await popup.close();
  });
});
