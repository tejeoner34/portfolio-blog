export interface WordPressPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  content?: string;
  excerpt?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  author?: {
    node: {
      name: string;
    };
  };
}
