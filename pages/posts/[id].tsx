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
    };
};

export default function Post({ postData }: PostProps){
    return(
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <div className="max-w-3xl mx-auto px-4 py-8 text-white-800">
                <h1 className="text-4xl font-bold mb-6">{postData.title}</h1>
                <p className="text-sm text-gray-500 mb-4">
                    Posted on {postData.date}
                </p>
{/* Need to change the below div at some point */}
                <div
                className={`prose prose-lg prose-gray-800 dark:prose-invert`}
                dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                ></div>
            </div>
        </Layout>
    )
}