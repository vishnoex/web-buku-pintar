import { DigitalContent } from './DigitalContent';

export interface Ebook extends DigitalContent {
  pageCount: number;
  format: 'PDF' | 'EPUB' | 'MOBI';
  tableOfContents: {
    title: string;
    pageNumber: number;
  }[];
  previewPages?: number;
  hasAudioVersion?: boolean;
  audioVersionId?: string;
  features: {
    hasBookmarks: boolean;
    hasNotes: boolean;
    hasHighlights: boolean;
    hasSearch: boolean;
  };
}
