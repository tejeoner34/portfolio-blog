import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="container mx-auto px-4 max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4 text-foreground">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
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
