// This library is responsible for getting blog posts from makrdown files
// Standard stuff
import fs from 'fs';
import path from 'path';
// Third Party Imports
import matter from 'gray-matter';
import { remark } from 'remark';
import html from "remark-html"

const postsDir = path.join(process.cwd(), 'posts');

// Grabbing the files from the postsDir, the posts are in the .md format
export function getSortedPosts(){
    const fileNames = fs.readdirSync(postsDir);

    // Map array to get all the posts out of the app
    const allPostsData = fileNames.map(fileName => {
        //Remove the .md from the file name (so it can become the page point)
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDir, fileName);
        console.log(fullPath)
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Using the gray matter module to grab the file contents for the metadata!
        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data
        };
    })

    return allPostsData.sort((a, b) => {
        if(a.date < b.date){
            return 1;
        } else {
            return -1;
        }
    })
}

// Returns all the post_ids available in the posts directory
export function getAllPostIds(){
    const fileNames = fs.readdirSync(postsDir);

    return fileNames.map(fileName => {
    return {
        params: {
            id: fileName.replace(/\.md$/, '')
        }
    };
})
}

export async function getPostData(id){
    //Using the gray matter function
    const fullPath = path.join(postsDir, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    const matterResult = matter(fileContents)

    const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
    const contentHtml = processedContent.toString();


    return {
        id,
        contentHtml,
        ...matterResult.data,
    };

}