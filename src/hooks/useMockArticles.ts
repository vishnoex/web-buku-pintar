"use client";

import { useMemo } from 'react';
import { Article } from '@/models/Article';
import { faker } from '@faker-js/faker';

// Seed faker to ensure consistent data generation
faker.seed(123);

export const useMockArticles = (count: number = 10) => {
  return useMemo(() => {
    const articles: Article[] = Array.from({ length: 20 }, (_, i) => ({
      id: faker.string.uuid(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      title: faker.lorem.sentence({ min: 5, max: 10 }),
      slug: faker.helpers.slugify(faker.lorem.sentence({ min: 5, max: 10 }).toLowerCase()),
      content: faker.lorem.paragraphs(5),
      excerpt: faker.lorem.paragraph({ min: 2, max: 5 }),
      coverImage: faker.image.urlLoremFlickr({ category: 'technology,writing', width: 800, height: 450 }),
      author: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        avatar: faker.image.avatar(),
      },
      categoryId: faker.string.uuid(), // Assuming categories are needed, use a placeholder UUID
      tags: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => faker.lorem.word()),
      readingTime: faker.number.int({ min: 3, max: 15 }), // in minutes
      status: faker.helpers.arrayElement(['draft', 'published', 'archived']),
      publishedAt: faker.date.past(),
      seoMetadata: {
        metaTitle: faker.lorem.sentence(),
        metaDescription: faker.lorem.paragraph(),
        keywords: Array.from({ length: faker.number.int({ min: 3, max: 7 }) }, () => faker.lorem.word()),
      },
    }));

    return articles.slice(0, count);
  }, [count]);
}; 