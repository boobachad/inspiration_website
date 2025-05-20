"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface TagsFilterProps {
  tags: string[]
  selectedTags: string[]
  onSelect: (tags: string[]) => void
}

export function TagsFilter({ tags, selectedTags, onSelect }: TagsFilterProps) {
  return (
    <div className="space-y-4">
      {/* Tag Selector */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag)
          return (
            <button
              key={tag}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium",
                isSelected
                  ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                  : "bg-transparent text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800",
                "transition-colors duration-200"
              )}
              onClick={() =>
                onSelect(
                  isSelected
                    ? selectedTags.filter((t) => t !== tag)
                    : [...selectedTags, tag]
                )
              }
              aria-pressed={isSelected}
              aria-label={`Filter by ${tag}`}
            >
              {tag}
            </button>
          )
        })}
      </div>

      {/* Selected Tags as Badges */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 text-sm cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              onClick={() => onSelect(selectedTags.filter((t) => t !== tag))}
              aria-label={`Remove ${tag} filter`}
            >
              {tag}
              <X
                size={14}
                className="ml-1 opacity-70 hover:opacity-100 transition-opacity duration-200"
              />
            </span>
          ))}
        </div>
      )}
    </div>
  )
}