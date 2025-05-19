"use client";

import { Ebook } from '@/models/Ebook';
import { faker } from '@faker-js/faker';

export const mockEbooks: Ebook[] = Array.from({ length: 20 }, (_, i) => ({
  id: faker.string.uuid(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  title: faker.commerce.productName() + ' Book ' + (i + 1),
  slug: faker.helpers.slugify((faker.commerce.productName() + ' Book ' + (i + 1)).toLowerCase()),
  description: faker.lorem.paragraph(),
  coverImage: faker.image.urlLoremFlickr({ category: 'book,cover', width: 400, height: 600 }),
  author: {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
  },
  categoryId: faker.string.uuid(),
  // category will be populated if needed by specific tests or use cases
  tags: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => faker.lorem.word()),
  price: parseFloat(faker.commerce.price({ min: 5, max: 50 })),
  discountPrice: Math.random() > 0.7 ? parseFloat(faker.commerce.price({ min: 1, max: 4.99 })) : undefined,
  isFree: Math.random() > 0.8,
  status: faker.helpers.arrayElement(['published', 'draft']),
  publishedAt: faker.date.past(),
  seoMetadata: {
    metaTitle: faker.lorem.sentence(),
    metaDescription: faker.lorem.paragraph(),
    keywords: Array.from({ length: faker.number.int({ min: 3, max: 7 }) }, () => faker.lorem.word()),
  },
  rating: {
    average: parseFloat(faker.number.float({ min: 3, max: 5, fractionDigits: 1 }).toFixed(1)),
    count: faker.number.int({ min: 10, max: 500 }),
  },
  language: faker.helpers.arrayElement(['English', 'Spanish', 'French', 'German']),
  duration: faker.number.int({ min: 60, max: 300 }), // minutes for reading
  fileSize: faker.number.int({ min: 1000000, max: 50000000 }), // bytes
  format: faker.helpers.arrayElement(['PDF', 'EPUB', 'MOBI']),
  pageCount: faker.number.int({ min: 100, max: 800 }),
  tableOfContents: Array.from({ length: faker.number.int({ min: 5, max: 15 }) }, (_, k) => ({
    title: `Chapter ${k + 1}: ${faker.lorem.sentence(3)}`,
    pageNumber: faker.number.int({ min: (k * 20) + 1, max: (k * 20) + 20 }),
  })),
  previewPages: faker.number.int({ min: 10, max: 50 }),
  hasAudioVersion: Math.random() > 0.5,
  audioVersionId: Math.random() > 0.5 ? faker.string.uuid() : undefined,
  features: {
    hasBookmarks: Math.random() > 0.3,
    hasNotes: Math.random() > 0.4,
    hasHighlights: Math.random() > 0.5,
    hasSearch: Math.random() > 0.2,
  },
}));

// Example of how to use it:
// import { mockEbooks } from '@/models/mocks/books';
// console.log(mockEbooks[0]); 