import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

const canonical = 'link[rel="canonical"]';

test("about page is canonical to itself, not the homepage", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator(canonical)).toHaveAttribute(
    "href",
    "https://oliverdimes.dev/about",
  );
});

test("posts page has a description, canonical and Open Graph tags", async ({
  page,
}) => {
  await page.goto("/posts");
  await expect(page.locator(canonical)).toHaveAttribute(
    "href",
    "https://oliverdimes.dev/posts",
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /.+/,
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "oliverdimes.dev - Posts",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://oliverdimes.dev/default_preview.png",
  );
});

test("later posts pages have their own title and canonical", async ({ page }) => {
  await page.goto("/posts?page=2");
  await expect(page).toHaveTitle("oliverdimes.dev - Posts (page 2)");
  await expect(page.locator(canonical)).toHaveAttribute(
    "href",
    "https://oliverdimes.dev/posts?page=2",
  );
});

test("tag search results are titled but not indexed", async ({ page }) => {
  await page.goto("/posts?tag=javascript&page=2");
  await expect(page).toHaveTitle(
    "oliverdimes.dev - Posts tagged JavaScript (page 2)",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, follow",
  );
  await expect(page.locator(canonical)).toHaveAttribute(
    "href",
    "https://oliverdimes.dev/posts?tag=javascript&page=2",
  );
});

test("the full posts list stays indexable", async ({ page }) => {
  await page.goto("/posts");
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
});

test("a post with no preview image falls back to one that exists", async ({
  page,
  request,
}) => {
  await page.goto("/posts/my-first-post");
  const ogImage = await page
    .locator('meta[property="og:image"]')
    .getAttribute("content");

  const response = await request.get(new URL(ogImage!).pathname);
  expect(response.status()).toBe(200);
});

test("a preview image path with no leading slash still resolves", async ({
  page,
}) => {
  await page.goto("/posts/a-cool-css-trick");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://oliverdimes.dev/assets/cool-css-trick/preview.png",
  );
});

for (const url of ["/", "/posts", "/about", "/posts/my-first-post"]) {
  test(`${url} has exactly one h1`, async ({ page }) => {
    await page.goto(url);
    await expect(page.locator("h1")).toHaveCount(1);
  });
}

test("post headings sit below the title and skip no levels", async ({ page }) => {
  await page.goto("/posts/using-ansible-ssh-on-windows");
  const content = page.locator('[data-testid="post-content"]');
  await expect(content.locator("h1")).toHaveCount(0);
  await expect(content.locator("h2").first()).toBeVisible();
  await expect(content.locator("h3").first()).toBeVisible();
});

test("a post that starts at ## still starts at h2", async ({ page }) => {
  await page.goto("/posts/a-playwright-introduction");
  const content = page.locator('[data-testid="post-content"]');
  await expect(content.locator("h2").first()).toBeVisible();
  await expect(content.locator("h3")).toHaveCount(0);
});

test("the <Link> mention in prose is shown instead of being dropped", async ({
  page,
}) => {
  await page.goto("/posts/a-github-search-app");
  await expect(page.locator('[data-testid="post-content"]')).toContainText(
    "<Link>",
  );
});

for (const [post, language] of [
  ["using-ansible-ssh-on-windows", "powershell"],
  ["quick-way-to-make-a-node-container", "Dockerfile"],
  ["a-look-at-vue", "vue"],
]) {
  test(`${language} code blocks are highlighted`, async ({ page }) => {
    await page.goto(`/posts/${post}`);
    await expect(
      page.locator(`code.language-${language} span[class^="hljs-"]`).first(),
    ).toBeVisible();
  });
}

test("post images load lazily with their real dimensions", async ({ page }) => {
  await page.goto("/posts/a-guide-for-bluesky-posting");
  const image = page.locator('[data-testid="post-content"] img').first();
  await expect(image).toHaveAttribute("loading", "lazy");
  await expect(image).toHaveAttribute("width", /^\d+$/);
  await expect(image).toHaveAttribute("height", /^\d+$/);
});

test("every image in a post has alt text and a file that exists", () => {
  const postsDir = path.join(process.cwd(), "posts");
  for (const fileName of fs.readdirSync(postsDir)) {
    const markdown = fs.readFileSync(path.join(postsDir, fileName), "utf-8");
    for (const [, alt, src] of markdown.matchAll(/!\[(.*?)\]\((.*?)\)/g)) {
      expect(alt, `${fileName}: ${src}`).not.toBe("");
      if (src.startsWith("../public/")) {
        const file = path.join(process.cwd(), src.replace("../", ""));
        expect(fs.existsSync(file), `${fileName}: ${src}`).toBe(true);
      }
    }
  }
});

test("robots.txt points crawlers at the sitemap", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);
  expect(await response.text()).toContain(
    "https://oliverdimes.dev/sitemap.xml",
  );
});

test("sitemap.xml lists the main pages and every post", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const sitemap = await response.text();

  expect(sitemap).toContain("<loc>https://oliverdimes.dev/about</loc>");
  for (const fileName of fs.readdirSync(path.join(process.cwd(), "posts"))) {
    const id = fileName.replace(/\.md$/, "");
    expect(sitemap).toContain(`<loc>https://oliverdimes.dev/posts/${id}</loc>`);
  }
});

for (const post of [
  "using-ansible-ssh-on-windows",
  "writing-a-bsky-post",
  "centos-world-of-pain",
]) {
  test(`${post} doesn't scroll sideways on a phone`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto(`/posts/${post}`);
    const pageWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    expect(pageWidth).toBeLessThanOrEqual(390);
  });
}

test("the footer stays at the bottom of a short page", async ({ page }) => {
  await page.goto("/this-page-does-not-exist");
  const footer = await page.locator("footer").boundingBox();
  const viewport = page.viewportSize();
  expect(footer!.y + footer!.height).toBeGreaterThanOrEqual(
    viewport!.height - 1,
  );
});
