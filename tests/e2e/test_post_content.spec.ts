import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POST_ID = "a-cool-css-trick";

function parsePost(id: string) {
  const filePath = path.join(process.cwd(), "posts", `${id}.md`);
  const fileContents = fs.readFileSync(filePath, "utf-8");
  return matter(fileContents);
}

const CONTENT_LOCATOR = '[data-testid="post-content"]';

function extractHeadings(content: string): string[] {
  const headingRegex = /^#{1,6}\s+(.+)$/gm;
  const headings: string[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push(match[1].trim());
  }
  return headings;
}

function extractFirstParagraph(content: string): string {
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (
      trimmed &&
      !trimmed.startsWith("#") &&
      !trimmed.startsWith("!") &&
      !trimmed.startsWith("```") &&
      !trimmed.startsWith("-") &&
      !trimmed.startsWith("_")
    ) {
      return trimmed;
    }
  }
  return "";
}

test.describe("Post page content matches markdown source", () => {
  test("title from frontmatter is rendered in the page header", async ({
    page,
  }) => {
    const { data } = parsePost(POST_ID);
    await page.goto(`/posts/${POST_ID}`);
    await expect(
      page.getByRole("heading", { name: data.title, exact: true }),
    ).toBeVisible();
  });

  test("all markdown headings are present in the rendered content", async ({
    page,
  }) => {
    const { content } = parsePost(POST_ID);
    const headings = extractHeadings(content);
    expect(headings.length).toBeGreaterThan(0);

    await page.goto(`/posts/${POST_ID}`);
    const contentDiv = page.locator(CONTENT_LOCATOR);

    for (const heading of headings) {
      await expect(
        contentDiv.getByRole("heading", { name: heading }),
      ).toBeVisible();
    }
  });

  test("first body paragraph text is present in the rendered content", async ({
    page,
  }) => {
    const { content } = parsePost(POST_ID);
    const firstParagraph = extractFirstParagraph(content);
    expect(firstParagraph.length).toBeGreaterThan(0);

    await page.goto(`/posts/${POST_ID}`);
    const contentDiv = page.locator(CONTENT_LOCATOR);
    // Check the first ~80 chars to stay robust against minor trailing punctuation diffs
    await expect(contentDiv).toContainText(firstParagraph.slice(0, 80));
  });

  test("date from frontmatter is displayed on the page", async ({ page }) => {
    const { data } = parsePost(POST_ID);
    await page.goto(`/posts/${POST_ID}`);
    // The date is formatted by the ArticleHeader component — check the raw year at minimum
    const year = new Date(data.date).getUTCFullYear().toString();
    await expect(page.locator("section")).toContainText(year);
  });
});
