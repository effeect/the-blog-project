// This page will show all posts in a list format with links to each post
// Using getSortedPosts function from lib/posts.ts to get the data
import Link from "next/link";
import Date from "../lib/date";

// Custom Imports
import { getSortedPosts } from '../lib/posts'; 

export default function PostsPage() {
  const allPostsData = getSortedPosts();

  return(
  <>
    <section className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2"> All Posts : </h2>
    <ul className="space-y-4">
        {/* Below will loop through the array and create a line item and link item along with it*/}
    {allPostsData.map(({id, date, title}) => (
        <li className="hover:bg-blue-900 transition-colors rounded-md p-4 shadow-sm border border-gray-200" key={id}>
        <Link href={`/posts/${id}`}> <h3 className="text-lg font-medium text-blue-600 hover:underline">{title}</h3></Link>
        <br/>
        <Date dateString={date}></Date>
        </li>
    ))}
    
    
    </ul>
</section>
    </>)

}