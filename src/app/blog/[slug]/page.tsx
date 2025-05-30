import { getAllPosts, getPostBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { Metadata } from 'next';

export const revalidate = 3600;
export const dynamic = 'force-static';

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Portfolio',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | Portfolio Blog`,
    description: post.excerpt?.replace(/<[^>]*>/g, '') || 'Read this blog post from my portfolio.',
  };
}

export default async function BlogPost({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }
  const subtitle = (
    <div className="flex items-center text-muted-foreground mt-4">
      <span>By {post.author?.node?.name || 'Unknown Author'}</span>
      <span className="mx-2">•</span>
      <time>{new Date(post.date).toLocaleDateString()}</time>
    </div>
  );

  return (
    <>
      <PageHeader title={post.title} subtitle={subtitle}>
        <Link href="/" className="font-medium mb-4 inline-block">
          ← Back to Blog
        </Link>
      </PageHeader>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-p:text-muted-foreground">
          <div
            className="text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </article>
      </div>
    </>
  );
}
