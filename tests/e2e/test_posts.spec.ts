import { test, expect } from "@playwright/test";

test("posts page should have the correct title ", async ({ page }) => {
  // Navigating to the home page
  await page.goto("/posts");

  const title = await page.title();
  expect(title).toBe("oliverdimes.dev - Posts");
});

test("confirm that the button navigation works", async ({ page }) => {
  await page.goto("/posts");
  const nextButton = page.getByRole("link", { name: "Next page" });
  const prevButton = page.getByRole("link", { name: "Previous" });

  // Confirm that the previous button is disabled as we are on page 1
  await expect(prevButton).toHaveAttribute("aria-disabled", "true");
  await expect(prevButton).toHaveClass(/is-disabled/);
  await nextButton.click();
  await expect(page).toHaveURL(/.*page=2/);
  // Confirm that the previous button now works as expected
  await expect(page.getByRole("link", { name: "Previous" })).toHaveAttribute(
    "aria-disabled",
    "false",
  );
});

test("confirm that there are the correct number of posts on the page", async ({
  page,
}) => {
  await page.goto("/posts");
  //
  const block = page.locator(".block");
  await expect(block).toBeVisible();
  const posts = block.locator(".box");
  await expect(posts).toHaveCount(5);
});

test("confirm all posts are clickable", async ({ page }) => {
  await page.goto("/posts");
  // Search for all clickable links
  const postLinks = page.locator('div[class*="blockfield_postBox"] > a');
  const count = await postLinks.count();
  await expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const link = postLinks.nth(i);
    await expect(link).toBeVisible();
    const href = await link.getAttribute("href");
    expect(href).toMatch(/^\/posts\/.+/);
  }
});
