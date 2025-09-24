import { getSortedPosts } from '../lib/posts';
import Link from 'next/link';
import Date from '../lib/date';

export default function PostsList() {
    // Fetching sorted posts data for the list
    const allPostsData = getSortedPosts();

    return (<>
    <div className='max-w-3xl mx-auto px-4 py-10'>
    <section className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">Latest Posts </h2>
    <ul className="space-y-4">
        {/* Below will loop through the array and create a line item and link item along with it*/}
    {allPostsData.map(({id, date, title}) => (
        <li className="hover:bg-gray-500 transition-colors rounded-md p-4" key={id}>
        <Link href={`/posts/${id}`}> <h3 className="text-lg font-medium text-white hover:underline">{title}</h3></Link>
        
        <label>Posted on </label><Date dateString={date}></Date>
        </li>
    ))}
    
    
    </ul>
</section>
    </div>
    </>);
}