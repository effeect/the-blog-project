import { test, expect } from "@playwright/test";

test("post should have correct Metadata", async ({ page }) => {
  await page.goto("posts/a-cool-css-trick");
  const ogTitle = page.locator('meta[property="og:title"]');
  await expect(ogTitle).toHaveAttribute(
    "content",
    "A cool CSS Hover trick I found",
  );
  const ogDescription = page.locator('meta[property="og:description"]');
  await expect(ogDescription).toHaveAttribute("content", /tutorial|overview/); // Matches if it contains these words

  const ogUrl = page.locator('meta[property="og:url"]');
  await expect(ogUrl).toHaveAttribute("content", /.*\/posts\/a-cool-css-trick/);

  const ogImage = page.locator('meta[property="og:image"]');
  await expect(ogImage).toHaveAttribute("content", /.*\.png|.*\.jpg|.*\.webp/);

  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    "article",
  );
});

test("Confirm that button navigation at the bottom works", async ({ page }) => {
  // In this test we will simply go back and forth with the page
  await page.goto("posts/a-cool-css-trick");
  const nextButton = page.getByRole("link", { name: "Next Post" });
  await nextButton.click();
  const prevButton = page.getByRole("link", { name: "Previous Post" });
  await prevButton.click();
  await expect(page).toHaveURL(/.*a-cool-css-trick/);
});
