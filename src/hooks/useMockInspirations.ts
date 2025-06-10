"use client";

import { useMemo, useState, useCallback } from 'react';
import { faker } from '@faker-js/faker';

// Seed faker to ensure consistent data generation
faker.seed(123);

const ITEMS_PER_PAGE = 3;

export const useMockInspirations = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const generateInspirations = useCallback((count: number) => {
    const baseDate = new Date();
    return Array.from({ length: count }, (_, i) => ({
      id: `insp-${i + 1}`,
      createdAt: new Date(baseDate.getTime() - i * 86400000), // Decrement date by i days
      updatedAt: new Date(baseDate.getTime() - i * 86400000),
      title: `Kunci Bertahan di Tengah Ketidakpastian ${i + 1}`,
      excerpt: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. ${i + 1}`,
      coverImage: faker.image.urlLoremFlickr({ category: 'nature,abstract', width: 800, height: 600 }),
      source: `Sumber ${i + 1}`,
      publishedAt: new Date(baseDate.getTime() - i * 86400000),
      slug: faker.helpers.slugify(`kunci-bertahan-di-tengah-ketidakpastian-${i + 1}`.toLowerCase()),
      content: `Full content for inspiration ${i + 1}. This would be a longer text.`,
      quote: faker.lorem.sentence(),
      authorQuote: faker.person.fullName(),
      impact: {
        likes: faker.number.int({ min: 100, max: 1000 }),
        shares: faker.number.int({ min: 50, max: 500 }),
        saves: faker.number.int({ min: 20, max: 200 }),
      },
      author: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        avatar: faker.image.avatar(),
      },
      categoryId: faker.string.uuid(),
      tags: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => faker.lorem.word()),
      status: faker.helpers.arrayElement(['published', 'draft']),
      seoMetadata: {
        metaTitle: faker.lorem.sentence(),
        metaDescription: faker.lorem.paragraph(),
        keywords: Array.from({ length: faker.number.int({ min: 3, max: 7 }) }, () => faker.lorem.word()),
      },
      relatedLinks: Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => faker.internet.url()),
      mood: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () =>
        faker.helpers.arrayElement(['Motivational', 'Inspiring', 'Thought-provoking', 'Uplifting', 'Reflective', 'Creative'])
      ),
    }));
  }, []);

  const inspirations = useMemo(() => {
    // Generate a larger pool of inspirations, then slice based on current page
    return generateInspirations(page * ITEMS_PER_PAGE);
  }, [page, generateInspirations]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setPage(prev => {
      const nextPage = prev + 1;
      // Stop loading more after a certain number of pages (e.g., 5 pages, 15 inspirations total)
      if (nextPage * ITEMS_PER_PAGE > 15) { // Adjust total mock items as needed
        setHasMore(false);
      }
      return nextPage;
    });
    
    setLoading(false);
  }, [loading, hasMore]);

  return {
    inspirations,
    loading,
    hasMore,
    loadMore,
  };
}; 