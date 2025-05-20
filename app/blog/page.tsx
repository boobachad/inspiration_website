import { getAllPosts, Post as MdPost } from "@/lib/posts";
import { getAllPostsMeta, PostFrontmatter as MdxPostMeta } from "@/lib/mdx-posts";
import { BlogClient } from "./client-wrapper";

interface CombinedPostMeta {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  type: 'md' | 'mdx';
  tags: string[];
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
    tags: post.tags
  }));

  const allPostsMeta: CombinedPostMeta[] = [
    ...formattedMdPostsMeta,
    ...mdxPostsMeta.map(meta => ({
      slug: meta.slug,
      title: meta.title,
      date: meta.date,
      formattedDate: meta.formattedDate,
      type: 'mdx',
      tags: meta.tags
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const allTags = Array.from(
    new Set(
      allPostsMeta
        .flatMap((post) => post.tags)
        .filter((tag): tag is string => !!tag)
    )
  ).sort();

  return <BlogClient posts={allPostsMeta} allTags={allTags} />;
}