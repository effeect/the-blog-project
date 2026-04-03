import { test, expect } from "@playwright/test";

test("Homepage should have the correct title", async ({ page }) => {
  // Navigating to the home page
  await page.goto("/");

  const title = await page.title();
  expect(title).toBe("oliverdimes.dev - Home");
});

test("Homepage should have the latest posts", async ({ page }) => {
  // Navigating to the home page
  await page.goto("/");

  const latestPostsContainer = page.locator("div.box").filter({
    has: page.getByRole("heading", { name: "Latest Posts" }),
  });
  // Confirming that we have 5 posts as expected
  await expect(latestPostsContainer).toBeVisible();
  const postEnteries = latestPostsContainer.locator("li");
  await expect(postEnteries).toHaveCount(5);
});

test("Homepage navbar should have working links", async ({ page }) => {
  await page.goto("/");

  const navbar = page.locator(".navbar");

  // Check all the links in the Navbar if they are still responding as expected
  await expect(navbar.getByText("oliverdimes.dev")).toHaveAttribute(
    "href",
    "/",
  );
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
