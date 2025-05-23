"use client";

import { useMemo } from 'react';
import { Inspiration } from '@/models/Inspiration';
import { faker } from '@faker-js/faker';

// Seed faker to ensure consistent data generation
faker.seed(123);

export const useMockInspirations = (count: number = 10) => {
  return useMemo(() => {
    const inspirations: Inspiration[] = Array.from({ length: 20 }, () => {
      const hasQuote = faker.datatype.boolean({ probability: 0.7 });
      const hasRelatedLinks = faker.datatype.boolean({ probability: 0.5 });
      
      return {
        id: faker.string.uuid(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        title: faker.lorem.sentence(),
        slug: faker.helpers.slugify(faker.lorem.sentence().toLowerCase()),
        content: faker.lorem.paragraphs(3),
        excerpt: faker.lorem.paragraph(),
        coverImage: faker.image.urlLoremFlickr({ category: 'nature,abstract', width: 800, height: 600 }),
        author: {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          avatar: faker.image.avatar(),
        },
        categoryId: faker.string.uuid(),
        tags: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => faker.lorem.word()),
        status: faker.helpers.arrayElement(['draft', 'published', 'archived']),
        publishedAt: faker.date.past(),
        seoMetadata: {
          metaTitle: faker.lorem.sentence(),
          metaDescription: faker.lorem.paragraph(),
          keywords: Array.from({ length: faker.number.int({ min: 3, max: 7 }) }, () => faker.lorem.word()),
        },
        // Inspiration specific fields
        source: faker.helpers.arrayElement(['Book', 'Article', 'Speech', 'Interview', 'Social Media']),
        quote: hasQuote ? faker.lorem.sentence() : undefined,
        authorQuote: hasQuote ? faker.person.fullName() : undefined,
        relatedLinks: hasRelatedLinks 
          ? Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => faker.internet.url())
          : undefined,
        mood: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => 
          faker.helpers.arrayElement(['Motivational', 'Inspiring', 'Thought-provoking', 'Uplifting', 'Reflective', 'Creative'])
        ),
        impact: {
          likes: faker.number.int({ min: 10, max: 1000 }),
          shares: faker.number.int({ min: 5, max: 500 }),
          saves: faker.number.int({ min: 2, max: 200 }),
        },
      };
    });

    return inspirations.slice(0, count);
  }, [count]);
}; 