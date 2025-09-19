import Image from "next/image";
import Link from "next/link";

// Custom Imports
import HeroHeader from "../components/heroHeader";
import { getSortedPosts } from '../lib/posts'; 

// Might need it back I'm not sure
// export async function getStaticProps(){
//     const allPostsData = getSortedPosts();
//     return {
//         props: {
//             allPostsData
//         }
//     };
// }

export default function AboutPage() {
  const allPostsData = getSortedPosts();

  return(<>
    <h1>
        Hello World
    </h1>
  </>)

}