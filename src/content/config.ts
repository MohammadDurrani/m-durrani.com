// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Schema for Dev Projects
const devCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    imageUrl: z.string().optional(),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
    publishDate: z.date(),
  }),
});

// Schema for Essays
const essaysCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.date(),
    imageUrl: z.string().optional(),
  }),
});

// Schema for TV Screenplays
const tvScreenplaysCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    logline: z.string(),
    pdfUrl: z.string().url(),
    publishDate: z.date(),
    imageUrl: z.string().optional(),
  }),
});

// Schema for Film Screenplays
const filmScreenplaysCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    logline: z.string(),
    pdfUrl: z.string().url(),
    publishDate: z.date(),
    imageUrl: z.string().optional(),
  }),
});

// Schema for Short Stories
const storiesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.date(),
    imageUrl: z.string().optional(),
  }),
});

// Schema for Blog Posts
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
  }),
});

// Export all collections with flat structure
export const collections = {
  'dev': devCollection,
  'essays': essaysCollection,
  'tv-screenplays': tvScreenplaysCollection,
  'film-screenplays': filmScreenplaysCollection,
  'short-stories': storiesCollection,
  'blog': blogCollection,
};