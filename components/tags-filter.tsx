"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface TagsFilterProps {
  tags: string[]
  selectedTags: string[]
  onSelect: (tags: string[]) => void
}

export function TagsFilter({ tags, selectedTags, onSelect }: TagsFilterProps) {
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)

  // Animation variants for tags
  const tagVariants = {
    rest: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    selected: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  // Animation variants for badges
  const badgeVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  }

  return (
    <div className="space-y-4">
      {/* Tag Selector */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag)
          return (
            <motion.button
              key={tag}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium",
                isSelected
                  ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                  : "bg-transparent text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800",
                "transition-colors duration-200"
              )}
              variants={tagVariants}
              initial="rest"
              animate={isSelected ? "selected" : "rest"}
              whileHover="hover"
              onHoverStart={() => setHoveredTag(tag)}
              onHoverEnd={() => setHoveredTag(null)}
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
            </motion.button>
          )
        })}
      </div>

      {/* Selected Tags as Badges */}
      <AnimatePresence>
        {selectedTags.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {selectedTags.map((tag) => (
              <motion.div
                key={tag}
                className="relative"
                variants={badgeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <span
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}