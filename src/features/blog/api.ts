import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  cover: string
  category: string
  content: string
}

const POSTS_DIR = path.join(process.cwd(), "src/content/blog")

export function getPosts(): Omit<BlogPost, "content">[] {
  if (!fs.existsSync(POSTS_DIR)) return []

  const files = fs.readdirSync(POSTS_DIR)
  const posts = files
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "")
      const filePath = path.join(POSTS_DIR, filename)
      const fileContent = fs.readFileSync(filePath, "utf-8")
      const { data } = matter(fileContent)

      return {
        slug,
        title: data.title || "Untitled",
        excerpt: data.excerpt || "",
        date: data.date || "1970-01-01",
        cover: data.cover || "/assets/products/water-500ml.webp",
        category: data.category || "General",
      }
    })
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))

  return posts
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)

  return {
    slug,
    title: data.title || "Untitled",
    excerpt: data.excerpt || "",
    date: data.date || "1970-01-01",
    cover: data.cover || "/assets/products/water-500ml.webp",
    category: data.category || "General",
    content,
  }
}
