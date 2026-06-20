import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { getSortedPosts } from "../lib/posts";
import BlockField from "../components/atoms/blockfield";
import PageControls from "../components/atoms/pagecontrols";

type PostData = {
  id: string;
  date: string;
  title: string;
  tags?: string[];
  summary?: string;
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function PostsPage({ searchParams }: Props) {
  const allPostsData = getSortedPosts() as PostData[];

  const { page } = await searchParams;
  const postsPerPage = 5;
  const totalPosts = allPostsData.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Clamp to a valid range so out-of-bounds ?page= values (0, -1, 999) don't
  // render an empty list with a 200 status.
  const requestedPage = Number(page) || 1;
  const currentPage = Math.min(Math.max(1, requestedPage), Math.max(1, totalPages));

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPostsData.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <title>oliverdimes.dev - Posts</title>
      <Box component="section" sx={{ py: 6 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{ mb: 3, pb: 1, borderBottom: 1, borderColor: "divider" }}
          >
            All Posts
          </Typography>
          <BlockField currentPosts={currentPosts} />
          <PageControls currentPage={currentPage} totalPages={totalPages} />
        </Container>
      </Box>
    </>
  );
}
