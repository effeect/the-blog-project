# Project Context

This is my personal blog at `https://oliverdimes.dev`, built with Next.js and hosted on Vercel. It serves a mixture of personal blog posts written in Markdown.

When working in this codebase: prioritize readability over cleverness, and ask clarifying questions before making architectural changes.

## Key Directories

| Path                  | Purpose                             |
| --------------------- | ----------------------------------- |
| `src/app/`            | Next.js app router root             |
| `src/app/components/` | UI components (atomic structure)    |
| `posts/`              | Markdown blog post content          |
| `public/`             | Static assets (images, fonts, etc.) |

## Standards

- **Component structure** follows atomic design — place new components at the appropriate level (atom/molecule/organism)
- **Blog posts** are Markdown files in `posts/` — do not move or rename this directory as it may affect routing
- **E2E tests** live in `tests/e2e/` and use Playwright

## Common Commands

```bash
npm run dev
npm run test             # run tests
```

## Deployment

- Hosted on **Vercel** — merges to `main` trigger automatic deployments
- Production URL: `https://oliverdimes.dev`
