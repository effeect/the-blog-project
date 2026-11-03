import type { Metadata } from "next";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import {
  getAllTags,
  getPostsByTag,
  getSortedPosts,
  getTagSlug,
} from "../lib/posts";
import { defaultPreviewImage, getPostsUrl, siteName } from "../lib/site";
import BlockField from "../components/atoms/blockfield";
import PageControls from "../components/atoms/pagecontrols";
import TagSearch from "../components/molecules/TagSearch/TagSearch";

const postsPerPage = 5;

type TagParam = string | string[] | undefined;

type Props = {
  searchParams: Promise<{ page?: string; tag?: TagParam }>;
};

function getTotalPages(postCount: number) {
  return Math.ceil(postCount / postsPerPage);
}

// Clamp to a whole page in the valid range so unusual ?page= values (0, -1, 1.5,
// 999) don't render an empty list or the wrong slice of posts with a 200 status.
function getCurrentPage(page: string | undefined, totalPages: number) {
  const requestedPage = Math.floor(Number(page)) || 1;
  return Math.min(Math.max(1, requestedPage), Math.max(1, totalPages));
}

// The posts to list, plus the tag they were narrowed to if there is one. A repeated
// ?tag=a&tag=b arrives as an array, and only the first is used.
function getPostsForTagParam(tagParam: TagParam) {
  const requested = (Array.isArray(tagParam) ? tagParam[0] : tagParam)?.trim();
  if (!requested) return { posts: getSortedPosts(), tag: null };

  const slug = getTagSlug(requested);
  const knownTag = getAllTags().find((tag) => tag.slug === slug);

  return {
    posts: getPostsByTag(slug),
    tag: { slug, label: knownTag?.label ?? requested },
  };
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { page, tag: tagParam } = await searchParams;
  const { posts, tag } = getPostsForTagParam(tagParam);
  const currentPage = getCurrentPage(page, getTotalPages(posts.length));
  const isFirstPage = currentPage === 1;

  const url = getPostsUrl({
    tag: tag?.slug,
    page: isFirstPage ? undefined : currentPage,
  });
  const listName = tag ? `Posts tagged ${tag.label}` : "Posts";
  const title = isFirstPage
    ? `oliverdimes.dev - ${listName}`
    : `oliverdimes.dev - ${listName} (page ${currentPage})`;
  const description = tag
    ? `Posts by Oliver Dimes tagged ${tag.label}`
    : "All posts by Oliver Dimes, covering development, personal projects and more";

  return {
    title,
    description,
    alternates: { canonical: url },
    // Search results repeat posts already listed on /posts, and anyone can link
    // to a tag that has none, so crawlers follow them without indexing them.
    robots: tag ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website",
      images: [defaultPreviewImage],
    },
  };
}

export default async function PostsPage({ searchParams }: Props) {
  const { page, tag: tagParam } = await searchParams;
  const { posts, tag } = getPostsForTagParam(tagParam);
  const totalPages = getTotalPages(posts.length);
  const currentPage = getCurrentPage(page, totalPages);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Box component="section" sx={{ py: 6 }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 3, pb: 1, borderBottom: 1, borderColor: "divider" }}
        >
          All Posts
        </Typography>
        <TagSearch tags={getAllTags()} selectedSlug={tag?.slug} />
        {tag && (
          <Typography
            data-testid="tag-search-summary"
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            {posts.length} {posts.length === 1 ? "post" : "posts"} tagged &quot;
            {tag.label}&quot;.{" "}
            <Link component={NextLink} href="/posts">
              Show all posts
            </Link>
          </Typography>
        )}
        {posts.length > 0 && <BlockField currentPosts={currentPosts} />}
        {totalPages > 1 && (
          <PageControls
            currentPage={currentPage}
            totalPages={totalPages}
            tag={tag?.slug}
          />
        )}
      </Container>
    </Box>
  );
}
