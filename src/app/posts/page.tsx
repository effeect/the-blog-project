import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { getSortedPosts } from "../lib/posts";
import { defaultPreviewImage, siteName } from "../lib/site";
import BlockField from "../components/atoms/blockfield";
import PageControls from "../components/atoms/pagecontrols";

const postsPerPage = 5;

type Props = {
  searchParams: Promise<{ page?: string }>;
};

function getTotalPages() {
  return Math.ceil(getSortedPosts().length / postsPerPage);
}

// Clamp to a whole page in the valid range so unusual ?page= values (0, -1, 1.5,
// 999) don't render an empty list or the wrong slice of posts with a 200 status.
function getCurrentPage(page: string | undefined, totalPages: number) {
  const requestedPage = Math.floor(Number(page)) || 1;
  return Math.min(Math.max(1, requestedPage), Math.max(1, totalPages));
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { page } = await searchParams;
  const currentPage = getCurrentPage(page, getTotalPages());
  const isFirstPage = currentPage === 1;

  const url = isFirstPage ? "/posts" : `/posts?page=${currentPage}`;
  const title = isFirstPage
    ? "oliverdimes.dev - Posts"
    : `oliverdimes.dev - Posts (page ${currentPage})`;
  const description =
    "All posts by Oliver Dimes, covering development, personal projects and more";

  return {
    title,
    description,
    alternates: { canonical: url },
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
  const allPostsData = getSortedPosts();

  const { page } = await searchParams;
  const totalPages = getTotalPages();
  const currentPage = getCurrentPage(page, totalPages);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPostsData.slice(indexOfFirstPost, indexOfLastPost);

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
        <BlockField currentPosts={currentPosts} />
        <PageControls currentPage={currentPage} totalPages={totalPages} />
      </Container>
    </Box>
  );
}
