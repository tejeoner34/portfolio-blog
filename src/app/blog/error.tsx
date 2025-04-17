'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Blog Error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center py-16">
      <div className="container mx-auto px-4 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-destructive">Something went wrong!</h1>
        <p className="text-muted-foreground mb-6">
          {error.message || 'Failed to load blog posts. Please try again later.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/blog"
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 transition-colors"
          >
            Go back to blog
          </Link>
        </div>
      </div>
    </div>
  );
}
