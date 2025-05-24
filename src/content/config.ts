// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Schema for Dev Projects
const devCollection = defineCollection({
  type: 'content', // Use 'content' for Markdown/MDX files
  schema: z.object({
    title: z.string(),
    description: z.string(),
    imageUrl: z.string().optional(),      // Path to a cover image
    liveUrl: z.string().url().optional(), // URL to live demo
    repoUrl: z.string().url().optional(), // URL to GitHub/GitLab repo
    tags: z.array(z.string()).optional(),
    publishDate: z.date(),
    // You don't need an 'author' field since it's always you!
  }),
});

// Schema for Essays
const essaysCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(), // A short summary/subtitle
    publishDate: z.date(),
  }),
});

// Schema for Screenplays
const screenplaysCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    logline: z.string(),
    //PDF link to the screenplay
    pdfUrl: z.string().url(), 
    publishDate: z.date(),
  }),
});

// Schema for Short Stories
const storiesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.date(),
  }),
});

// Schema for Blog Posts (Optional)
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    description: z.string().optional(),
  }),
});


// Export all collections
export const collections = {
  'dev': devCollection,
  'essays': essaysCollection,
  'screenplays': screenplaysCollection,
  'short-stories': storiesCollection, // <<< MUST BE EXACTLY THIS KEY
  'blog': blogCollection, // Include if you create this collection
};