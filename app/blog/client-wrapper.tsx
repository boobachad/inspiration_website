"use client"

import { useState } from "react"
import Link from "next/link"
import { TagsFilter } from "@/components/tags-filter"
import { CombinedPostMeta } from "./page"

export function BlogClient({
    posts,
    allTags,
}: {
    posts: CombinedPostMeta[]
    allTags: string[]
}) {
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const filteredPosts = posts.filter(
        (post) =>
            selectedTags.length === 0 || selectedTags.some((tag) => post.tags.includes(tag))
    )

    return (
        <div className="space-y-6">
            <TagsFilter
                tags={allTags}
                selectedTags={selectedTags}
                onSelect={setSelectedTags}
            />
            <div className="space-y-4">
                {filteredPosts.map((post) => (
                    <div
                        key={`${post.type}-${post.slug}`}
                        className="rounded-lg p-4 flex justify-between items-center"
                    >
                        <Link
                            href={`/blog/${post.type}/${post.slug}`}
                            className="text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 hover:underline text-base font-medium transition-colors duration-200"
                            aria-label={`Read post: ${post.title}`}
                        >
                            {post.title}
                        </Link>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {post.formattedDate}
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 text-xs cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                                        onClick={() =>
                                            setSelectedTags(
                                                selectedTags.includes(tag)
                                                    ? selectedTags.filter((t) => t !== tag)
                                                    : [...selectedTags, tag]
                                            )
                                        }
                                        aria-label={`Filter by tag: ${tag}`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}