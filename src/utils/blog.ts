import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  category: string;
  contentHtml?: string;
}

const postsDirectory = path.join(process.cwd(), 'posts');

// Helper to check if posts directory exists
function ensureDirectoryExists() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

export function getAllPosts(): BlogPost[] {
  ensureDirectoryExists();
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      const { data } = matter(fileContents);
      
      return {
        slug,
        title: data.title || 'Untitled Post',
        date: data.date || '',
        description: data.description || '',
        author: data.author || 'Anonymous',
        category: data.category || 'General',
      };
    });
    
  // Sort posts by date descending
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    ensureDirectoryExists();
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Configure marked for safe, simple HTML compile
    const contentHtml = await marked.parse(content);
    
    return {
      slug,
      title: data.title || 'Untitled Post',
      date: data.date || '',
      description: data.description || '',
      author: data.author || 'Anonymous',
      category: data.category || 'General',
      contentHtml,
    };
  } catch (error) {
    console.error(`Error reading blog post slug "${slug}":`, error);
    return null;
  }
}
