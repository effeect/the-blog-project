// This page will show all posts in a list format with links to each post
// Using getSortedPosts function from lib/posts.ts to get the data
import Link from "next/link";
import Date from "../lib/date";
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
      <section className="section">
        <div className="container is-max-desktop">
          {/* Title has a white border bottom to appear as a hr */}
          <h2
            className="title is-2  mb-6 pb-2"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.2)" }}
          >
            All Posts
          </h2>
          <BlockField currentPosts={currentPosts} />
          <PageControls currentPage={currentPage} totalPages={totalPages} />
        </div>
      </section>
    </>
  );
}
