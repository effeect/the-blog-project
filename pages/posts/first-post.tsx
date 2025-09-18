import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';

import Layout from '../../src/app/layout';


export default function FirstPost() {
  return (
    <>
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <Script 
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }></Script>
      <h1>First Post</h1>
      <h2>
        <Link href="/">Back to home</Link>
        
      </h2>
      <p>Hello World</p>
  </Layout>
  </>
  );
}
