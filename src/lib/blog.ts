import type { CollectionEntry } from 'astro:content';

type BlogPost = CollectionEntry<'blog'>;

export const sortBlogPostsByNewest = (posts: BlogPost[]): BlogPost[] =>
  [...posts].sort((a, b) => {
    const dateDiff = b.data.publishedDate.getTime() - a.data.publishedDate.getTime();
    if (dateDiff !== 0) {
      return dateDiff;
    }

    const updatedDiff =
      (b.data.updatedDate?.getTime() ?? 0) - (a.data.updatedDate?.getTime() ?? 0);
    if (updatedDiff !== 0) {
      return updatedDiff;
    }

    return b.slug.localeCompare(a.slug);
  });
