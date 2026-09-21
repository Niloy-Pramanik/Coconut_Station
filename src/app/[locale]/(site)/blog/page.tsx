import * as React from "react"
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { getPosts } from "@/features/blog/api"

export const metadata: Metadata = {
  title: "Blog | Coconut Station",
  description: "Notes, news, and wellness tips from Coconut Station.",
}

export default function BlogIndexPage() {
  const posts = getPosts()

  return (
    <div className="bg-canvas min-h-screen pt-24 pb-32">
      <div className="container px-4 max-w-7xl mx-auto">
        <header className="mb-16">
          <h1 className="text-5xl font-extrabold text-leaf-900 uppercase tracking-tight mb-6">
            Coconut Notes
          </h1>
          <p className="text-xl text-ink-soft leading-relaxed max-w-2xl">
            Tips, guides, and lifestyle notes from our team.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-ink-muted text-lg">No posts yet. Check back soon!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.slug} className="group flex flex-col h-full">
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
                    <h2 className="text-2xl font-bold text-ink mb-3 group-hover:text-leaf-800 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-ink-soft line-clamp-3 mb-6 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="text-leaf-700 font-semibold group-hover:text-leaf-800 flex items-center mt-auto">
                      Read more <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
