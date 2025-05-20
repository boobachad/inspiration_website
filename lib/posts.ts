import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { format } from 'date-fns'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
    slug: string
    title: string
    date: string
    formattedDate: string
    content: string
    contentHtml: string
    readTime: string
    views: string
    tags: string[]
}

async function readPostFile(slug: string): Promise<Post> {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`)
        const fileContents = await fs.readFile(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        const processedContent = await remark().use(html).process(content)
        const contentHtml = processedContent.toString()

        return {
            slug,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            formattedDate: format(new Date(data.date || new Date()), 'MMMM d, yyyy'),
            content,
            contentHtml,
            readTime: data.readTime || '5 min read',
            views: data.views || '0 views',
            tags: data.tags ? data.tags.split(',').map((tag: string) => tag.trim()) : [],
        }
    } catch (error) {
        console.error(`Failed to load post: ${slug}`, error)
        throw new Error(`Post not found: ${slug}`)
    }
}

export async function getAllPosts(): Promise<Post[]> {
    try {
        const fileNames = await fs.readdir(postsDirectory)
        const posts = await Promise.all(
            fileNames
                .filter(fileName => fileName.endsWith('.md'))
                .map(async (fileName) => {
                    const slug = fileName.replace(/\.md$/, '')
                    return await readPostFile(slug)
                })
        )
        return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } catch (error) {
        console.error('Failed to load posts:', error)
        return []
    }
}

export async function getPost(slug: string): Promise<Post> {
    return await readPostFile(slug)
}