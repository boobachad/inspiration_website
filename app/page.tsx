// app/page.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NewsletterForm from "@/components/newsletter-form";
import { getAllPosts, Post as MdPost } from "@/lib/posts";
import { getAllPostsMeta, PostFrontmatter as MdxPostMeta } from "@/lib/mdx-posts";
import { format } from "date-fns";
import "@/styles/globals.css";



interface Experience {
  title: string;
  company: string;
  current: boolean;
  date?: string;
}

interface Project {
  icon: string;
  title: string;
  description: string;
  link?: string;
}

interface CombinedPostMeta {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  type: 'md' | 'mdx';
}

const experiences: Experience[] = [
  {
    title: "hoarder",
    company: "College",
    current: true,
    date: "1990-2099",
  },
  {
    title: "hoarder",
    company: "College",
    current: false,
    date: "1990-2099",
  },
  {
    title: "hoarder",
    company: "College",
    current: false,
    date: "1990-2099",
  },
];

const projects: Project[] = [
  {
    icon: "N",
    title: "Nothing",
    description: "nothing fro nothing.",
    link: "#",
  },
  {
    icon: "N",
    title: "Nothing",
    description: "nothing fro nothing.",
    link: "#",
  },
  {
    icon: "N",
    title: "Nothing",
    description: "nothing fro nothing.",
    link: "#",
  },
  {
    icon: "N",
    title: "Nothing",
    description: "nothing fro nothing.",
    link: "#",
  },
];

export default async function Home() {

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

  allPostsMeta.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const latestPosts = allPostsMeta.slice(0, 3);



  return (
    <div className="container mx-auto px-4 py-8 space-y-16">

      <section>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          I am Boobachad, nothing nothing blah balh
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Experience</h2>
        <div className="space-y-6">
          {experiences.map((exp: Experience, index: number) => (
            <div key={index}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-900 dark:text-gray-100">{exp.title}</span>
                {exp.current && (
                  <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
                    PRESENT
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{exp.company}</p>
              {exp.date && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{exp.date}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {projects.map((project: Project, index: number) => (
            <div
              key={index}
              className="rounded-lg p-4 hover:shadow-md dark:hover:shadow-gray-700 transition-shadow duration-200">

              <div className="bg-gray-900 dark:bg-gray-200 rounded-lg w-8 h-8 mb-3 flex items-center justify-center">
                <span className="text-white dark:text-gray-900 text-sm">{project.icon}</span>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">{project.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
              {project.link && (
                <Link
                  href={project.link}
                  className="inline-flex items-center mt-2 text-sm text-blue-500 dark:text-blue-400 hover:
                  
                  line transition-colors duration-200"
                >
                  Learn more <ArrowRight size={14} className="ml-1" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Latest Blogs</h2>
          <Link
            href="/blog"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 flex items-center transition-colors duration-200"
          >
            Read More <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
        <div className="space-y-4">
          {latestPosts.map((post: CombinedPostMeta) => (
            <div key={`${post.type}-${post.slug}`} className="flex justify-between items-center pb-2">

              <Link
                href={`/blog/${post.type}/${post.slug}`}
                className="text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 hover:underline transition-colors duration-200"
              >
                {post.title}
              </Link>
              <span className="text-sm text-gray-500 dark:text-gray-400">{post.formattedDate}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">My Newsletter</h2>
        <NewsletterForm />
      </section>
    </div>
  );
}
