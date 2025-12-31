import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishedDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string().default('Streaming Guide Lab'),
  image: z.string().optional(),
  tags: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
  howTo: z
    .object({
      name: z.string(),
      steps: z.array(
        z.object({
          name: z.string(),
          text: z.string(),
        })
      ),
    })
    .optional(),
  faq: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .optional(),
  draft: z.boolean().default(false),
});

const blog = defineCollection({
  type: 'content',
  schema: baseSchema,
});

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().default(0),
    section: z.string(),
    draft: z.boolean().default(false),
  }),
});

const changelog = defineCollection({
  type: 'content',
  schema: z.object({
    version: z.string(),
    date: z.coerce.date(),
    title: z.string(),
    type: z.enum(['major', 'minor', 'patch']),
    draft: z.boolean().default(false),
  }),
});

const testimonials = defineCollection({
  type: 'content',
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string(),
    company: z.string(),
    avatar: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

const apps = defineCollection({
  type: 'content',
  schema: baseSchema,
});

const devices = defineCollection({
  type: 'content',
  schema: baseSchema,
});

const guides = defineCollection({
  type: 'content',
  schema: baseSchema,
});

const troubleshooting = defineCollection({
  type: 'content',
  schema: baseSchema,
});

export const collections = { blog, docs, changelog, testimonials, apps, devices, guides, troubleshooting };
