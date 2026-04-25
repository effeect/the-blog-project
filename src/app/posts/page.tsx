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
  const currentPage = Number(page) || 1;
  const postsPerPage = 5;
  const totalPosts = allPostsData.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

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
