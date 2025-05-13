'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function NavLinks() {
    const pathname = usePathname()

    console.log('Current path:', pathname)

    return (
        <nav className="mb-8">
            <ul className="flex gap-4 text-sm">
                <li key="/">
                    <Link
                        href="/"
                        className={`px-3 py-1 rounded-full transition-colors duration-200 ${pathname === "/"
                            ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                    >
                        About
                    </Link>
                </li>
                <li key="/blog">
                    <Link
                        href="/blog"
                        className={`px-3 py-1 rounded-full transition-colors duration-200 ${pathname.startsWith("/blog")
                            ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                    >
                        Blog
                    </Link>
                </li>
                {/* 
                <li key="/#">//considering another page
                    <Link
                        href="/#"
                        className={`px-3 py-1 rounded-full transition-colors duration-200 ${
                            pathname === "/#"
                                ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                    >
                        another page
                    </Link>
                </li>
                */}
            </ul>
        </nav>
    )
}