import Layout from "../../src/app/layout";
import Head from "next/head";
import { getAllPostIds, getPostData } from "../../src/app/lib/posts";

export async function getStaticPaths(){
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }: { params: { id: string } }){
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        }
    }
}

// Function that will display the post as we want it.
// Using the Layout from the app as the main file
type PostProps = {
    postData: {
        title: string;
        contentHtml: string;
        date: string;
        tags ?: string[];
    };
};

export default function Post({ postData }: PostProps){
    return(
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <div className="max-w-5xl mx-auto px-4 py-8 text-white-800">
                <h1 className="text-5xl font-bold mb-6">{postData.title}</h1>
                <p className="text-sm text-gray-500 mb-4">
                    Posted on {postData.date}
                </p>
                <div className="mt-2">
                    {postData.tags && postData.tags.length > 0 && (
                        <div className="mt-2">
                            {postData.tags.map((tag) => (
                                <span key={tag} className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full mr-2 hover:bg-amber-700">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <hr className="my-6 border-gray-300" />
                <div
                className={`prose dark:prose-invert min-h-[500px] max-w-5xl`}
                dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                ></div>
            </div>
        </Layout>
    )
}