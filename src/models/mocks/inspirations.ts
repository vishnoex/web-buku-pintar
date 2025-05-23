"use client";

import { Inspiration } from '@/models/Inspiration';
import { faker } from '@faker-js/faker';

export const mockInspirations: Inspiration[] = Array.from({ length: 20 }, () => ({
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
  quote: faker.lorem.sentence(),
  authorQuote: faker.person.fullName(),
  relatedLinks: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => faker.internet.url()),
  mood: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => 
    faker.helpers.arrayElement(['Motivational', 'Inspiring', 'Thought-provoking', 'Uplifting', 'Reflective', 'Creative'])
  ),
  impact: {
    likes: faker.number.int({ min: 10, max: 1000 }),
    shares: faker.number.int({ min: 5, max: 500 }),
    saves: faker.number.int({ min: 2, max: 200 }),
  },
}));

// Example of how to use it:
// import { mockInspirations } from '@/models/mocks/inspirations';
// console.log(mockInspirations[0]); 