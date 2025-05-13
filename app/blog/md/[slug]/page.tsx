// app/blog/md/[slug]/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NewsletterForm from "@/components/newsletter-form";
import { notFound } from "next/navigation";
import { getPost, getAllPosts, Post } from "@/lib/posts";

export const dynamicParams = false;


export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default async function MarkdownBlogPost({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  let post: Post | undefined;
  try {
    post = await getPost(slug);
    if (!post) {
      notFound();
    }
  } catch (error) {
    console.error('Markdown Post load failed:', error);
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/blog" className="inline-flex items-center text-sm mb-6 text-gray-700 dark:text-gray-300 hover:underline">
        <ArrowLeft size={14} className="mr-1" /> BACK TO BLOG
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">{post.title || 'Untitled'}</h1>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
        {post.formattedDate} ({post.readTime || '5 min read'}) - {post.views || '0 views'}
      </p>

      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <div className="mt-16 border-t pt-8 border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Subscribe To My Newsletter</h2>
        <NewsletterForm />
      </div>
    </div>
  );
}
