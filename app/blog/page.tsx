// app/blog/page.tsx
import Link from "next/link";
import { getAllPosts, Post as MdPost } from "@/lib/posts";
import { getAllPostsMeta, PostFrontmatter as MdxPostMeta } from "@/lib/mdx-posts";

interface CombinedPostMeta {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  type: 'md' | 'mdx';
}

export default async function BlogPage() {
  const mdPosts = await getAllPosts();

  const mdxPostsMeta = await getAllPostsMeta();

  const formattedMdPostsMeta: CombinedPostMeta[] = mdPosts.map(post => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    formattedDate: post.formattedDate,
    type: 'md',
  }));

  const allPostsMeta: CombinedPostMeta[] = [
    ...formattedMdPostsMeta,
    ...mdxPostsMeta.map(meta => ({
      slug: meta.slug,
      title: meta.title,
      date: meta.date,
      formattedDate: meta.formattedDate,
      type: 'mdx'
    }))
  ];

  // sorting in desc order
  allPostsMeta.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (!allPostsMeta.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No blog posts found</p>
        <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Return home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {allPostsMeta.map((post) => (
        <div key={`${post.type}-${post.slug}`} className="flex justify-between">
          {/* if md open md slug page, if mdx opne mdx slug page */}
          <Link
            href={`/blog/${post.type}/${post.slug}`}
            className="hover:underline"
          >
            {post.title}
          </Link>
          <span className="text-sm text-gray-500">
            {post.formattedDate}
          </span>
        </div>
      ))}
    </div>
  );
}
