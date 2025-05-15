import { DigitalContent } from './DigitalContent';

export interface Audiobook extends DigitalContent {
  narrator: {
    id: string;
    name: string;
    avatar?: string;
  };
  format: 'MP3' | 'M4A' | 'WAV';
  chapters: {
    title: string;
    duration: number; // in seconds
    startTime: number; // in seconds
    endTime: number; // in seconds
  }[];
  hasEbookVersion?: boolean;
  ebookVersionId?: string;
  features: {
    hasBookmarks: boolean;
    hasNotes: boolean;
    hasSpeedControl: boolean;
    hasSleepTimer: boolean;
  };
}
