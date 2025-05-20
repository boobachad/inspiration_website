// app/blog/mdx/[slug]/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NewsletterForm from "@/components/newsletter-form";
import { notFound } from "next/navigation";
import { getPostData, getAllPostSlugs } from "@/lib/mdx-posts";
import { MDXRemote } from 'next-mdx-remote/rsc';
import CustomButton from '@/components/CustomButton';

export const dynamicParams = false;

export async function generateStaticParams() {
    const slugs = await getAllPostSlugs();
    return slugs.map(slug => ({ slug }));
}

export default async function MDXBlogPost({ params }: { params: { slug: string } }) {
    const slug = params.slug;

    let postData;
    try {
        postData = await getPostData(slug);
        if (!postData) {
            notFound();
        }
    } catch (error) {
        console.error('MDX Post load failed:', error);
        notFound();
    }

    const { frontmatter, content } = postData;

    const components = {
        NewsletterForm,
        CustomButton,
    };


    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/blog" className="inline-flex items-center text-xl mb-6 text-gray-700 dark:text-gray-300 hover:underline">#BLOG
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">{frontmatter.title || 'Untitled'}</h1>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
                {frontmatter.formattedDate} ({frontmatter.readTime || '5 min read'}) - {frontmatter.views || '0 views'}
            </p>

            <div className="prose dark:prose-invert max-w-none">
                <MDXRemote source={content} components={components} />
            </div>

            <div className="mt-16 border-t pt-8 border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Subscribe To My Newsletter</h2>
                <NewsletterForm />
            </div>
        </div>
    );
}
