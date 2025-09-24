// Custom Imports
import HeroHeader from "./components/heroHeader";
import PostsList from "./components/postsList";

export default function Home() {
  console.log("Home Page Loaded");
  return (<>
    <HeroHeader></HeroHeader>
    <PostsList></PostsList>
    </>
  );
}
