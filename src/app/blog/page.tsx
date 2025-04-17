import { getAllPosts } from '@/lib/api';
import { WordPressPost } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 3600;
export const dynamic = 'force-static';

export default async function BlogPage() {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-muted-foreground">
          <h1 className="text-2xl font-bold mb-4">No Posts Found</h1>
          <p>There are no blog posts available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-foreground">Blog</h1>
          <p className="text-muted-foreground mt-2">Thoughts, ideas, and insights</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: WordPressPost) => (
            <article
              key={post.id}
              className="bg-card rounded-lg overflow-hidden shadow-lg border border-border hover:border-primary/50 transition-colors"
            >
              {post.featuredImage?.node && (
                <div className="relative h-48 w-full">
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText || post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-card-foreground">{post.title}</h2>
                <div
                  className="text-muted-foreground mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt || '' }}
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    By {post.author?.node?.name || 'Unknown Author'}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
