import { getAllPosts, getPostBySlug } from '@/lib/api';
import { WordPressPost } from '@/lib/types';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const revalidate = 3600; // Revalidate every hour

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
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {post.featuredImage?.node && (
        <Image
          src={post.featuredImage.node.sourceUrl}
          alt={post.featuredImage.node.altText || post.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center text-gray-600 mb-8">
        <span>By {post.author?.node?.name || 'Unknown Author'}</span>
        <span className="mx-2">•</span>
        <time>{new Date(post.date).toLocaleDateString()}</time>
      </div>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content || '' }}
      />
    </article>
  );
}
