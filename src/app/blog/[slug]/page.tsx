import { getAllPosts, getPostBySlug } from '@/lib/api';
import { WordPressPost } from '@/lib/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 3600;
export const dynamic = 'force-static';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post: WordPressPost) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/blog"
            className="text-primary hover:text-primary/80 transition-colors mb-4 inline-block"
          >
            ← Back to Blog
          </Link>
          <h1 className="text-4xl font-bold text-foreground">{post.title}</h1>
          <div className="flex items-center text-muted-foreground mt-4">
            <span>By {post.author?.node?.name || 'Unknown Author'}</span>
            <span className="mx-2">•</span>
            <time>{new Date(post.date).toLocaleDateString()}</time>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {post.featuredImage?.node && (
          <div className="relative h-64 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <article className="prose prose-invert max-w-none">
          <div
            className="text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </article>
      </div>
    </>
  );
}
