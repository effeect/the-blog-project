import Layout from "../../src/app/layout";
import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/posts";

export async function getStaticPaths(){
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }){
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        }
    }
}

// Function that will display the post as we want it.
// Using the Layout from the app as the main file
export default function Post({postData}){
    return(
        <Layout>
            <Head>
                <title>Hello World!</title>
            </Head>
            <h1>PLEASE READ</h1>
            <div dangerouslySetInnerHTML={{__html:postData.contentHtml}}></div>
        </Layout>
    )
}