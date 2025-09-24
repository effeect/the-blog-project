import Image from "next/image";
import Link from "next/link";

// Custom Imports
import HeroHeader from "./components/heroHeader";
import PostsList from "./components/postsList";
import { getSortedPosts } from './lib/posts'; 

// Might need it back I'm not sure
// export async function getStaticProps(){
//     const allPostsData = getSortedPosts();
//     return {
//         props: {
//             allPostsData
//         }
//     };
// }

export default function Home() {
  const allPostsData = getSortedPosts();

  return (<>
    <HeroHeader></HeroHeader>
    <PostsList></PostsList>
    </>
  );
}
