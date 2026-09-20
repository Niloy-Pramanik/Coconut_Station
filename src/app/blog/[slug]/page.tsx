import * as React from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getPostBySlug, getPosts } from "@/features/blog/api"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) {
    return {
      title: "Not Found | Coconut Station",
    }
  }

  return {
    title: `${post.title} | Coconut Station`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  const posts = getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return notFound()
  }

  return (
    <div className="bg-canvas min-h-screen pt-24 pb-32">
      <div className="container px-4 max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-ink-soft hover:text-leaf-800 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all notes
          </Link>
        </div>

        <article>
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-leaf-100 text-leaf-900 px-3 py-1 rounded-pill text-xs font-semibold uppercase tracking-wider">
                {post.category}
              </span>
              <time className="text-sm font-medium text-ink-muted">
                {new Date(post.date).toLocaleDateString('en-BD', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-ink leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-ink-soft leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-12 bg-leaf-50">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-lg prose-leaf max-w-none">
            <MDXRemote source={post.content} />
          </div>
        </article>
        
        <div className="mt-16 pt-8 border-t border-line text-sm text-ink-soft">
          <strong>Disclaimer:</strong> The content in our blog is provided for general information purposes only and is not intended as medical advice.
        </div>
      </div>
    </div>
  )
}
