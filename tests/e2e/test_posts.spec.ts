import { test, expect } from "@playwright/test";

test("posts page should have the correct title ", async ({ page }) => {
  await page.goto("/posts");
  const title = await page.title();
  expect(title).toBe("oliverdimes.dev - Posts");
});

test("confirm that the button navigation works", async ({ page }) => {
  await page.goto("/posts");
  const nextButton = page.getByRole("link", { name: "Next page" });
  const prevButton = page.getByRole("link", { name: "Previous" });

  await expect(prevButton).toHaveAttribute("aria-disabled", "true");
  await nextButton.click();
  await expect(page).toHaveURL(/.*page=2/);
  await expect(
    page.getByRole("link", { name: "Previous" }),
  ).toHaveAttribute("aria-disabled", "false");
});

test("confirm that there are the correct number of posts on the page", async ({
  page,
}) => {
  await page.goto("/posts");
  const postList = page.locator('[data-testid="post-list"]');
  await expect(postList).toBeVisible();
  const posts = postList.locator('[data-testid="post-card"]');
  await expect(posts).toHaveCount(5);
});

test("confirm all posts are clickable", async ({ page }) => {
  await page.goto("/posts");
  const postLinks = page.locator("a").filter({ has: page.locator("h5") });
  const count = await postLinks.count();
  await expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const link = postLinks.nth(i);
    await expect(link).toBeVisible();
    const href = await link.getAttribute("href");
    expect(href).toMatch(/^\/posts\/.+/);
  }
});
