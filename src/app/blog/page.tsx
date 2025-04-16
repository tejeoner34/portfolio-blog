import { getAllPosts } from '@/lib/api';
import { WordPressPost } from '@/lib/types';
import Image from 'next/image';

export const revalidate = 3600;
export const dynamic = 'force-static';

export default async function BlogPage() {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">
          <h1 className="text-2xl font-bold mb-4">No Posts Found</h1>
          <p>There are no blog posts available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: WordPressPost) => (
          <article key={post.id} className="border rounded-lg overflow-hidden shadow-lg">
            {post.featuredImage?.node && (
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <div
                className="text-gray-600 mb-4"
                dangerouslySetInnerHTML={{ __html: post.excerpt || '' }}
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  By {post.author?.node?.name || 'Unknown Author'}
                </span>
                <a href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800">
                  Read more →
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
