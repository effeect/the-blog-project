---
title: "Writing and setting up Playwright tests on my blog"
date: "2026-04-05"
tags: ["Playwright", "Testing", "E2E", "CI/CD"]
summary: "With upcoming changes I want to make to this site, I wanted to implement some basic Playwright tests to ensure the blog is working as expected."
previewImage: "/assets/playwright/image.png"
---

**Today,** I wanted to tackle something that I’ve been meaning to do for a while and that is having some form of E2E testing for my website.

The reason why I'm doing this is that in the next few weeks, I want to make a bunch of modifications to the website to document some more things apart from just development posts and rambles. And before delving into that world (I have a bunch of ideas I want to implement), I really wanted to implement some automated tests/checks for this blog as I don't want to be making a bunch of changes that might break already existing functionality.

## Using Playwright

[Playwright](https://playwright.dev/) is a test runner focused specifically in the world of web automation.

Specifically, this is focused in the world of E2E web testing and effectively spins up a headless web browser to perform the actions needed.

I’ve had plenty of experience writing end to end manual tests in the past, however I’ve always wanted to delve deeper into the world of Playwright as it can automate basic website functionality without needing a human tester to load up an environment and test it for themselves. It saves vaulable time and allows testers to focus on things that are far more critical.

This type of automated testing also allows for less human error, as theortically, as long as the test is written correctly (which is the human part in this case), there would be no human error when the test being run and should be consistent. We also get the benefit that if the test coverage is perfect, if there is an issue, an engineer can identify the problematic component very quickly.

**To be clear, Playwright cannot be a full replacement for all your testing needs,** spinning up a full test runner like can be slow and impractical. For example, if I wanted to check if an API is returning the correct data, a basic test framework like pytest or vitest (there are plenty of them) would be far more cost effective and easier to implement. However, for anything that requires a web browser to test correctly, playwright is an excellent choice.

For the time being, I'm focused on getting this implemented into a CI/CD environment and spit out a small report at the end of it if needed. There are reporting frameworks such as Allure report which I won't dive into today but may add to my blog in the future.

## Writing the tests

One of the first things I wanted to do was to write a test to confirm that the title of the page is correct, this is fairly trival to do. Whilst simple, this is useful especially if we have dynamic titles.

```ts
import { test, expect } from "@playwright/test";

test("posts page should have the correct title ", async ({ page }) => {
  // Navigating to the home page
  await page.goto("/posts");

  const title = await page.title();
  expect(title).toBe("oliverdimes.dev - Posts");
});
```

Next, I wanted to check that the homepage has 5 of the latest posts on the front page, this can be done quite easily by filtering the page :

```ts
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
```

I also wanted to write a test that will confirm whether the navbar on the blog has working links, which can be done like this :

```ts
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
```

## Running the tests in a CI/CD pipeline

After writing a bunch of these basic tests, I wanted to implement a simple Github Action that will run the tests everytime we commit to the main branch. This can be done with the following :

```yaml
name: Playwright Tests
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
  workflow_dispatch: # Needed to allow for manual workflow runs (mostly for testing)
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

One of the other config changes I had to make was in the `playwright.config.ts`, I want to make sure when we run `npx playwright test`, it will spin up a local instance of the blog itself, I achieved this with this modification in the config file.

```ts
  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
```

I'll continue to write up some more tests but I'm pretty happy with my experience with Playwright for my blog so far, this is all in Typescript which I've not done before but the experience is fairly similar to using it in Python.
