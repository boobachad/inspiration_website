// lib/mdx-posts.ts
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostFrontmatter {
    slug: string;
    title: string;
    date: string;
    formattedDate: string;
    readTime: string;
    views: string;
    [key: string]: any;
}


async function readPostFile(slug: string): Promise<{ frontmatter: PostFrontmatter; content: string }> {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.mdx`);
        const fileContents = await fs.readFile(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const formattedDate = format(new Date(data.date || new Date()), 'MMMM d, yyyy');

        const frontmatter: PostFrontmatter = {
            slug,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            formattedDate,
            readTime: data.readTime || '5 min read',
            views: data.views || '0 views',
            ...data,
        };

        return { frontmatter, content };
    } catch (error) {
        console.error(`Failed to load post: ${slug}`, error);
        throw new Error(`Post not found: ${slug}`);
    }
}


export async function getAllPostsMeta(): Promise<PostFrontmatter[]> {
    try {
        const fileNames = await fs.readdir(postsDirectory);

        const postsMeta = await Promise.all(
            fileNames
                .filter(fileName => fileName.endsWith('.mdx'))
                .map(async (fileName) => {
                    const slug = fileName.replace(/\.mdx$/, '');
                    const { frontmatter } = await readPostFile(slug);
                    return frontmatter;
                })
        );

        return postsMeta.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
        console.error('Failed to load posts metadata:', error);
        return [];
    }
}



export async function getPostData(slug: string): Promise<{ frontmatter: PostFrontmatter; content: string }> {
    return await readPostFile(slug);
}

export async function getAllPostSlugs(): Promise<string[]> {
    try {
        const fileNames = await fs.readdir(postsDirectory);
        return fileNames
            .filter(fileName => fileName.endsWith('.mdx'))
            .map(fileName => fileName.replace(/\.mdx$/, ''));
    } catch (error) {
        console.error('Failed to get post slugs:', error);
        return [];
    }
}
