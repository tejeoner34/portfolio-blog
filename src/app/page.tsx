import { getAllPosts } from '@/lib/api';
import type { WordPressPost } from '@/lib/types';
import PageHeader from '@/components/PageHeader';
import BlogPostCard from '@/components/BlogPostCard';

export const revalidate = 3600;
export const dynamic = 'force-static';

export default async function Home() {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="No Posts Found"
          subtitle="There are no blog posts available at the moment."
        />
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Portfolio Blog"
        subtitle="Detailed insights and updates about my projects and work"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: WordPressPost) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
