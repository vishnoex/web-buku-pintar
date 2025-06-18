"use client";

import { Ebook } from '@/models/Ebook';
import { faker } from '@faker-js/faker';

// Seed faker to ensure consistent data generation
faker.seed(123);

export const generateMockEbooks = (count: number): Ebook[] => {
  return Array.from({ length: count }, (_, i) => {
    const hasDiscount = faker.datatype.boolean({ probability: 0.3 });
    const isFree = faker.datatype.boolean({ probability: 0.2 });
    const hasAudioVersion = faker.datatype.boolean({ probability: 0.5 });
    
    return {
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
      tags: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => faker.lorem.word()),
      price: parseFloat(faker.commerce.price({ min: 5, max: 50 })),
      discountPrice: hasDiscount ? parseFloat(faker.commerce.price({ min: 1, max: 4.99 })) : undefined,
      isFree,
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
      duration: faker.number.int({ min: 60, max: 300 }),
      fileSize: faker.number.int({ min: 1000000, max: 50000000 }),
      format: faker.helpers.arrayElement(['PDF', 'EPUB', 'MOBI']),
      pageCount: faker.number.int({ min: 100, max: 800 }),
      tableOfContents: Array.from({ length: faker.number.int({ min: 5, max: 15 }) }, (_, k) => ({
        title: `Chapter ${k + 1}: ${faker.lorem.sentence(3)}`,
        pageNumber: faker.number.int({ min: (k * 20) + 1, max: (k * 20) + 20 }),
      })),
      previewPages: faker.number.int({ min: 10, max: 50 }),
      hasAudioVersion,
      audioVersionId: hasAudioVersion ? faker.string.uuid() : undefined,
      features: {
        hasBookmarks: faker.datatype.boolean({ probability: 0.7 }),
        hasNotes: faker.datatype.boolean({ probability: 0.6 }),
        hasHighlights: faker.datatype.boolean({ probability: 0.5 }),
        hasSearch: faker.datatype.boolean({ probability: 0.8 }),
      },
    };
  });
};

// Example of how to use it:
// import { mockEbooks } from '@/models/mocks/books';
// console.log(mockEbooks[0]); 