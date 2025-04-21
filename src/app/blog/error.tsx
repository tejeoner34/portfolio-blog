'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Error | Portfolio Blog',
  description: 'Something went wrong. Please try again later.',
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center py-16">
      <div className="container mx-auto px-4 max-w-md text-center">
        <PageHeader
          title="Something went wrong!"
          subtitle="We apologize for the inconvenience. Please try again later."
        />
        <div className="space-x-4">
          <button
            onClick={reset}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Try again
          </button>
          <Link href="/blog" className="font-medium inline-block">
            Return to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
