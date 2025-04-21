import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Portfolio Blog',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="container mx-auto px-4 max-w-md text-center">
        <PageHeader
          title="404"
          subtitle="The page you are looking for doesn't exist or has been moved."
        />
        <Link
          href="/blog"
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
        >
          Return to Blog
        </Link>
      </div>
    </div>
  );
}
