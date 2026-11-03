import { test, expect } from "@playwright/test";

test("posts page should have the correct title ", async ({ page }) => {
  await page.goto("/posts");
  const title = await page.title();
  expect(title).toBe("oliverdimes.dev - Posts");
});

test("confirm that the button navigation works", async ({ page }) => {
  await page.goto("/posts");
  const nextButton = page.getByRole("link", { name: "Next page" });

  // On the first page "Previous" is a disabled button, not a link
  await expect(page.getByRole("button", { name: "Previous" })).toBeDisabled();
  await expect(page.getByRole("link", { name: "Previous" })).toHaveCount(0);
  await nextButton.click();
  await expect(page).toHaveURL(/.*page=2/);
  await expect(page.getByRole("link", { name: "Previous" })).toHaveAttribute(
    "href",
    "/posts?page=1",
  );
});

test("the next control is disabled on the last page", async ({ page }) => {
  await page.goto("/posts?page=999");
  await expect(page.getByRole("button", { name: "Next page" })).toBeDisabled();
  await expect(page.getByRole("link", { name: "Next page" })).toHaveCount(0);
});

test("a fractional page number is rounded down to a whole page", async ({
  page,
}) => {
  await page.goto("/posts?page=2.5");
  await expect(page.getByText(/^2 of \d+$/)).toBeVisible();
  await expect(page.locator('[data-testid="post-card"]')).toHaveCount(5);
});

test("the padding around a post card is clickable", async ({ page }) => {
  await page.goto("/posts");
  const card = page.locator('[data-testid="post-card"]').first();
  const href = await card.locator("a").getAttribute("href");
  await card.click({ position: { x: 5, y: 5 } });
  await expect(page).toHaveURL(new RegExp(`${href}$`));
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
  const postLinks = page.locator('[data-testid="post-card"] a');
  const count = await postLinks.count();
  await expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const link = postLinks.nth(i);
    await expect(link).toBeVisible();
    const href = await link.getAttribute("href");
    expect(href).toMatch(/^\/posts\/.+/);
  }
});
