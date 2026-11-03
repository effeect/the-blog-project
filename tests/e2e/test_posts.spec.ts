import { test, expect, type Page } from "@playwright/test";

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

test.describe("tag search", () => {
  const cards = '[data-testid="post-card"]';
  const summary = '[data-testid="tag-search-summary"]';

  // Typing before the page has hydrated doesn't open the list, so retry until it does
  async function chooseTag(page: Page, text: string, tag: RegExp) {
    const search = page.getByRole("combobox", { name: "Search by tag" });
    const option = page.getByRole("option", { name: tag });
    await expect(async () => {
      await search.fill("");
      await search.fill(text);
      await expect(option).toBeVisible({ timeout: 1000 });
    }).toPass();
    await option.click();
  }

  test("choosing a tag lists only the posts with that tag", async ({ page }) => {
    await page.goto("/posts");
    await chooseTag(page, "ansi", /^Ansible/);

    await expect(page).toHaveURL(/\/posts\?tag=ansible$/);
    await expect(page.locator(summary)).toContainText('tagged "Ansible"');
    const results = page.locator(cards);
    await expect(results.first()).toBeVisible();
    for (const card of await results.all()) {
      await expect(card.getByText("Ansible", { exact: true })).toBeVisible();
    }
  });

  test("clearing the search goes back to all posts", async ({ page }) => {
    await page.goto("/posts");
    await chooseTag(page, "ansi", /^Ansible/);
    await expect(page).toHaveURL(/tag=ansible/);

    await page.getByRole("combobox", { name: "Search by tag" }).hover();
    await page.getByRole("button", { name: "Clear" }).click();
    await expect(page).toHaveURL(/\/posts$/);
    await expect(page.locator(summary)).toHaveCount(0);
  });

  test("the search box shows the tag from the URL", async ({ page }) => {
    await page.goto("/posts?tag=ansible");
    await expect(
      page.getByRole("combobox", { name: "Search by tag" }),
    ).toHaveValue("Ansible");
  });

  test("different spellings of a tag find the same posts", async ({ page }) => {
    await page.goto("/posts?tag=NEXT.JS");
    const results = page.locator(cards);
    await expect(results.getByText("Nextjs", { exact: true }).first()).toBeVisible();
    await expect(results.getByText("next.js", { exact: true }).first()).toBeVisible();
  });

  test("a tag containing a slash can be searched", async ({ page }) => {
    await page.goto("/posts");
    await chooseTag(page, "ci/", /^CI\/CD/);
    await expect(page).toHaveURL(/tag=ci%2Fcd$/);
    await expect(page.locator(cards).first()).toBeVisible();
  });

  test("moving between pages keeps the tag", async ({ page }) => {
    await page.goto("/posts?tag=javascript");
    await expect(page.locator(cards)).toHaveCount(5);

    await page.getByRole("link", { name: "Next page" }).click();
    await expect(page).toHaveURL(/\/posts\?tag=javascript&page=2$/);
    await expect(page.getByRole("link", { name: "Previous" })).toHaveAttribute(
      "href",
      "/posts?tag=javascript&page=1",
    );
  });

  test("page controls are hidden when the results fit on one page", async ({
    page,
  }) => {
    await page.goto("/posts?tag=ansible");
    await expect(page.locator(cards).first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Previous" })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Next page" })).toHaveCount(0);
  });

  test("a tag with no posts offers a way back to all posts", async ({ page }) => {
    await page.goto("/posts?tag=not-a-real-tag");
    await expect(page.locator(summary)).toContainText(
      '0 posts tagged "not-a-real-tag"',
    );
    await expect(page.locator(cards)).toHaveCount(0);

    await page.getByRole("link", { name: "Show all posts" }).click();
    await expect(page).toHaveURL(/\/posts$/);
    await expect(page.locator(cards)).toHaveCount(5);
  });

  test("a repeated tag parameter uses the first one", async ({ page }) => {
    const response = await page.goto("/posts?tag=ansible&tag=docker");
    expect(response?.status()).toBe(200);
    await expect(page.locator(summary)).toContainText('tagged "Ansible"');
  });

  test("an empty tag parameter lists all posts", async ({ page }) => {
    await page.goto("/posts?tag=");
    await expect(page.locator(summary)).toHaveCount(0);
    await expect(page.locator(cards)).toHaveCount(5);
  });
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
