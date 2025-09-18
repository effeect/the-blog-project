import Image from "next/image";
import Link from "next/link";

// Custom Imports
import HeroHeader from "./components/heroHeader";
import { getSortedPosts } from '../../lib/posts'; 

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
    <div></div>
      <h2> Latest Posts : </h2>
      <section>
      <ul>
        {allPostsData.map(({id, date, title}) => (
          <li key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
          </li>
        ))}
        
        
      </ul>
    </section>
    </>
  );
}
