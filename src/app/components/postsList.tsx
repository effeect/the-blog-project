import { getSortedPosts } from '../lib/posts';
import Link from 'next/link';

export default function PostsList() {
    // Fetching sorted posts data for the list
    const allPostsData = getSortedPosts();

    return (<>
    <div className='max-w-3xl mx-auto px-4 py-10'>
      <h2 className='text-2xl font-bold mb-4'> Latest Posts : </h2>
      <section>
      <ul>
        {allPostsData.map(({id, date, title}) => (
          <li className='hover:bg-blue-900 transition-colors rounded-md p-4 shadow-sm border border-gray-200' key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
          </li>
        ))}
      </ul>
    </section>
    </div>
    </>);
}