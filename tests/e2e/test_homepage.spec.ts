import { test, expect } from "@playwright/test";

test("Homepage should have the correct title", async ({ page }) => {
  await page.goto("/");
  const title = await page.title();
  expect(title).toBe("oliverdimes.dev - Home");
});

test("Homepage should have the latest posts", async ({ page }) => {
  await page.goto("/");

  const latestPostsContainer = page.locator('[data-testid="latest-posts"]');
  await expect(latestPostsContainer).toBeVisible();
  const postEntries = latestPostsContainer.locator("li");
  await expect(postEntries).toHaveCount(5);
});

test("Homepage navbar should have working links", async ({ page }) => {
  await page.goto("/");

  const navbar = page.locator('[aria-label="main navigation"]');

  await expect(navbar.getByText("oliverdimes.dev")).toHaveAttribute("href", "/");
  await expect(navbar.getByRole("link", { name: "Posts" })).toHaveAttribute(
    "href",
    "/posts",
  );
  await expect(navbar.getByRole("link", { name: "About Me" })).toHaveAttribute(
    "href",
    "/about",
  );
  await expect(navbar.locator('a[href*="github.com"]')).toBeVisible();
  await expect(navbar.locator('a[href*="linkedin.com"]')).toBeVisible();
  await expect(navbar.locator('a[href*="bsky.app"]')).toBeVisible();
  await expect(navbar.locator('a[href^="mailto:"]')).toHaveAttribute(
    "href",
    "mailto:effeect-contact@pm.me",
  );
});
