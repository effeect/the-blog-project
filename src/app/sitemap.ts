import type { MetadataRoute } from "next";
import { getSortedPosts } from "./lib/posts";
import { siteUrl } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/posts", "/about"].map((pagePath) => ({
    url: `${siteUrl}${pagePath}`,
  }));

  const posts = getSortedPosts().map(({ id, date }) => ({
    url: `${siteUrl}/posts/${id}`,
    lastModified: date,
  }));

  return [...pages, ...posts];
}
