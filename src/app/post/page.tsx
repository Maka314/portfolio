import { Suspense } from 'react';
import type { Metadata } from 'next';
import PostPageClient from './PostPageClient';
import Spinner from '@/components/Spinner';

export const metadata: Metadata = {
  title: "Post - Mingchen's Portfolio",
};

export default function PostPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <PostPageClient />
    </Suspense>
  );
}
