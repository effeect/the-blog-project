import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {
  getAllPostIds,
  getCurrentIndex,
  getNextAndPrevPosts,
  getPostData,
} from "@/app/lib/posts";
import "highlight.js/styles/github-dark.css";
import ArticleHeader from "@/app/components/atoms/ArticleHeader/ArticleHeader";
import ContactButtons from "@/app/components/atoms/contactButtons/contactButtons";
import PostControls from "@/app/components/atoms/PostControls/PostControls";
import { defaultPreviewImage, siteName, siteUrl } from "@/app/lib/site";

// Only serve pre-generated ids; any other path returns a 404 automatically.
export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllPostIds();
}

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const post = await getPostData(id);
  const url = `${siteUrl}/posts/${id}`;

  if (!post) return { title: "Post Not Found" };

  return {
    alternates: { canonical: url },
    title: `oliverdimes.dev - ${post.title}`,
    description: post.summary ?? `A post about ${post.tags?.join(", ")}`,
    keywords: post.tags?.join(", ") ?? "Blog post by Oliver Dimes",
    openGraph: {
      title: post.title ?? "No title given",
      description: post.summary ?? "No summary given",
      url,
      type: "article",
      publishedTime: post.date,
      authors: ["Oliver Dimes"],
      siteName,
      images: [post.previewImage ?? defaultPreviewImage],
    },
  };
}

export default async function PostPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;

  const postData = await getPostData(id);

  // Guard before touching navigation helpers — an unknown id would otherwise
  // index out of bounds and throw a 500.
  if (!postData || !postData.contentHtml) return notFound();

  const nearbyPosts = getNextAndPrevPosts(id);
  const currentIndexInfo = getCurrentIndex(id);

  if (!nearbyPosts || !currentIndexInfo) return notFound();

  return (
    <Box component="section" sx={{ py: 6 }}>
      <Container maxWidth="md">
        <ArticleHeader postData={postData} />
        <Divider sx={{ my: 3 }} />

        <Box
          className="post-content"
          data-testid="post-content"
          sx={{ minHeight: 500 }}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </Container>

      <Divider sx={{ my: 4 }} />

      <Container maxWidth="md">
        <Typography variant="body1" sx={{ mb: 2 }}>
          Feel free to contact me below with the following methods:
        </Typography>
        <ContactButtons />
        <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
          As always, thank you for reading.
        </Typography>
        <PostControls
          currentPost={id}
          currentIndex={String(currentIndexInfo.currentIndex + 1)}
          nextPost={nearbyPosts.nextIndex}
          prevPost={nearbyPosts.prevIndex}
          ArrayLength={String(currentIndexInfo.arrayLength)}
        />
      </Container>
    </Box>
  );
}
