import rss from '@astrojs/rss';
import { getCollection, type CollectionEntry } from 'astro:content';
import { siteConfig } from '@/config';
import { sortBlogPostsByNewest } from '@/lib/blog';
import type { APIContext } from 'astro';

type BlogPost = CollectionEntry<'blog'>;

export async function GET(context: APIContext) {
  // Return empty feed if blog feature is disabled
  if (!siteConfig.features.blog) {
    return new Response('<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"></rss>', {
      headers: { 'Content-Type': 'application/xml' },
    });
  }

  const blogPosts = await getCollection('blog', ({ data }: BlogPost) => !data.draft);
  const sortedPosts = sortBlogPostsByNewest(blogPosts);

  return rss({
    title: `${siteConfig.name} Blog`,
    description: siteConfig.description,
    site: context.site ?? siteConfig.url,
    items: sortedPosts.map((post: BlogPost) => ({
      title: post.data.title,
      pubDate: post.data.publishedDate,
      description: post.data.description,
      author: post.data.author,
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
