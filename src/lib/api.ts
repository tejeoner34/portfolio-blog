import { GET_ALL_POSTS, GET_POST_BY_SLUG } from './queries';
import { WordPressPost } from './types';

interface Variables {
  [key: string]: string | number | boolean;
}

export async function fetchAPI(query: string, { variables }: { variables?: Variables } = {}) {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  if (!apiUrl) {
    throw new Error('WordPress API URL is not configured');
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();

    if (json.errors) {
      console.error('GraphQL Errors:', json.errors);
      throw new Error('GraphQL query failed');
    }

    return json.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function getAllPosts(): Promise<WordPressPost[]> {
  try {
    const data = await fetchAPI(GET_ALL_POSTS.loc?.source.body || '');
    return data?.posts?.nodes || [];
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const data = await fetchAPI(GET_POST_BY_SLUG.loc?.source.body || '', {
      variables: { slug },
    });
    return data?.post || null;
  } catch (error) {
    console.error(`Failed to fetch post with slug ${slug}:`, error);
    return null;
  }
}
