import Image from 'next/image';
import Link from 'next/link';
import type { WordPressPost } from '@/lib/types';

interface BlogPostCardProps {
  post: WordPressPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="flex flex-col bg-card rounded-lg overflow-hidden shadow-lg border border-border hover:border-primary/50 transition-colors">
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
      <div className="flex flex-1 flex-col items-stretch p-6">
        <h2 className="text-xl font-semibold mb-2 text-card-foreground">{post.title}</h2>
        <div
          className="text-muted-foreground mb-4 line-clamp-3 flex-grow"
          dangerouslySetInnerHTML={{ __html: post.excerpt || '' }}
        />
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            By {post.author?.node?.name || 'Unknown Author'}
          </span>
          <Link href={`/blog/${post.slug}`} className="font-medium">
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
