import { test, expect } from "@playwright/test"
import { CARD_DECLINED, CARD_SUCCEEDS } from "./const"

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/")
})

test("Home is shop and has navigation buttons", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: "Shop Collection" })
  ).toBeVisible()
  await expect(
    page.getByRole("link", { name: "Shop", exact: true })
  ).toBeVisible()
  await expect(
    page.getByRole("link", { name: "Subscriptions", exact: true })
  ).toBeVisible()
})

test("can checkout purchase correctly", async ({ page }) => {
  await page.getByRole("button", { name: "Purchase" }).first().click()

  await page.getByRole("textbox", { name: "Email" }).fill("test@example.com")
  await page.getByRole("textbox", { name: "Card number" }).fill(CARD_SUCCEEDS)
  await page.getByRole("textbox", { name: "Expiration" }).fill("12/34")
  await page.getByRole("textbox", { name: "CVC" }).fill("777")
  await page.getByRole("textbox", { name: "Cardholder name" }).fill("Test User")

  await page.getByRole("button", { name: "Pay" }).click()

  await page.getByRole("heading", { name: "Payment successful" }).waitFor()
  await page.getByRole("link", { name: "Return to Home" }).click()

  await expect(
    page.getByRole("heading", { name: "Shop Collection" })
  ).toBeVisible()
})

test("decline card and fail authentication", async ({ page }) => {
  await page.getByRole("button", { name: "Purchase" }).first().click()

  await page.getByRole("textbox", { name: "Email" }).fill("test@example.com")
  await page.getByRole("textbox", { name: "Expiration" }).fill("12/34")
  await page.getByRole("textbox", { name: "CVC" }).fill("777")
  await page.getByRole("textbox", { name: "Cardholder name" }).fill("Test User")

  await page.getByRole("textbox", { name: "Card number" }).fill(CARD_DECLINED)
  await page.getByRole("button", { name: "Pay" }).click()
  await page.getByText("declined").waitFor()
})

test("renders cancel page correctly", async ({ page }) => {
  await page.getByRole("button", { name: "Purchase" }).first().click()

  await page.getByRole("link", { name: "Back" }).click()
  await page.getByRole("heading", { name: "Payment Cancelled" }).waitFor()
  await page.getByRole("link", { name: "Return to Home" }).click()

  await expect(
    page.getByRole("heading", { name: "Shop Collection" })
  ).toBeVisible()
})
