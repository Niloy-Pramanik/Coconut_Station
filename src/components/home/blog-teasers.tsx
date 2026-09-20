"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

export interface BlogPostTeaser {
  slug: string
  title: string
  excerpt: string
  date: string
  cover: string
  category: string
}

// Temporary mock data until T2.7 is implemented
const MOCK_POSTS: BlogPostTeaser[] = [
  {
    slug: "hydration-basics",
    title: "Hydration Basics: Why Coconut Water?",
    excerpt: "Discover the science behind natural electrolytes and why they beat artificial sports drinks.",
    date: "2026-09-15",
    cover: "/assets/products/water-500ml.webp", // placeholder
    category: "Wellness",
  },
  {
    slug: "morning-walk-ritual",
    title: "A Morning Walk Ritual",
    excerpt: "How a fresh coconut can transform your early morning routine.",
    date: "2026-09-10",
    cover: "/assets/products/coconut-regular.webp", // placeholder
    category: "Lifestyle",
  },
  {
    slug: "choosing-your-coconut-size",
    title: "Choosing Your Coconut Size",
    excerpt: "Premium, Regular, or Lite? A guide to finding the perfect coconut for your thirst.",
    date: "2026-09-05",
    cover: "/assets/products/coconut-premium.webp", // placeholder
    category: "Guide",
  },
]

export function BlogTeasers({ posts = MOCK_POSTS }: { posts?: BlogPostTeaser[] }) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="py-24 bg-canvas overflow-hidden">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-extrabold text-leaf-800 uppercase mb-4">
              Coconut Notes
            </h2>
            <p className="text-lg text-ink-soft max-w-md">
              Tips, guides, and lifestyle notes from our team.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center text-leaf-700 font-semibold hover:text-leaf-800 transition-colors focus-ring rounded-sm"
          >
            Read all posts <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              className="group cursor-pointer flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.42, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/blog/${post.slug}`} className="block focus-ring rounded-xl h-full flex flex-col">
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-6 bg-leaf-50">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-canvas/90 backdrop-blur-sm px-3 py-1 rounded-pill text-xs font-semibold text-leaf-900 uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col">
                  <time className="text-sm font-medium text-ink-muted mb-2 block">
                    {new Date(post.date).toLocaleDateString('en-BD', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </time>
                  <h3 className="text-2xl font-bold text-ink mb-3 group-hover:text-leaf-800 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-ink-soft line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="text-leaf-700 font-semibold group-hover:text-leaf-800 flex items-center mt-auto">
                    Read more <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
