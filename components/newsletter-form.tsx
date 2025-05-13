"use client"

import type React from "react"
import { useState } from "react"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Subscribing email:", email)
    setEmail("")
    alert("Thanks for subscribing!")
  }

  return (
    <div>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Stay ahead of the curve with my monthly newsletter called Luminary.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <label htmlFor="email" className="sr-only">Email address</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 placeholder-gray-500 dark:placeholder-gray-400 transition-shadow duration-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}