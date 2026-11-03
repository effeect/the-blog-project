// Shared site details for metadata, robots.txt and the sitemap
export const siteUrl = "https://oliverdimes.dev";
export const siteName = "oliverdimes.dev";
export const defaultPreviewImage = "/default_preview.png";

// A link to the posts list, which can be narrowed to a tag and split into pages
export function getPostsUrl({ tag, page }: { tag?: string; page?: number }) {
  const params = new URLSearchParams();
  if (tag) params.set("tag", tag);
  if (page) params.set("page", String(page));

  const query = params.toString();
  return query ? `/posts?${query}` : "/posts";
}
