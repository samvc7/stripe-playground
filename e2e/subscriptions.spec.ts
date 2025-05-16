import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/subscriptions")
})

test("can checkout purchase correctly", async ({ page }) => {
  await page.getByRole("button", { name: "Subscribe" }).first().click()

  const iframe = page.frameLocator("iframe[name='embedded-checkout']")

  await iframe.getByRole("textbox", { name: "Email" }).fill("test@example.com")
  await iframe
    .getByRole("textbox", { name: "Card number" })
    .fill("4242 4242 4242 4242")
  await iframe.getByRole("textbox", { name: "Expiration" }).fill("12/34")
  await iframe.getByRole("textbox", { name: "CVC" }).fill("777")
  await iframe
    .getByRole("textbox", { name: "Cardholder name" })
    .fill("Test User")

  await iframe.getByRole("button", { name: "Pay" }).click()

  await page.getByRole("heading", { name: "Subscription Activated!" }).waitFor()
  await page.getByRole("link", { name: "Return to Home" }).click()

  await expect(
    page.getByRole("heading", { name: "Shop Collection" })
  ).toBeVisible()
})
