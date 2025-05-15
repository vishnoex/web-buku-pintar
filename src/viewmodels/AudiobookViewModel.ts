import { useState, useCallback } from 'react';
import { Audiobook } from '@/models/Audiobook';
import { AudiobookService } from '@/services/AudiobookService';
import { PaginationParams } from '@/types';

interface AudiobookState {
  audiobooks: Audiobook[];
  currentAudiobook: Audiobook | null;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  currentChapter: number;
  isPlaying: boolean;
  currentTime: number;
}

const initialState: AudiobookState = {
  audiobooks: [],
  currentAudiobook: null,
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
  currentChapter: 0,
  isPlaying: false,
  currentTime: 0,
};

const audiobookService = new AudiobookService();

export const useAudiobookViewModel = () => {
  const [state, setState] = useState<AudiobookState>(initialState);

  const fetchAudiobooks = useCallback(async (params: PaginationParams) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await audiobookService.getAudiobooks(params);
      setState(prev => ({
        ...prev,
        audiobooks: response.data,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch audiobooks',
        loading: false,
      }));
    }
  }, []);

  const fetchAudiobookBySlug = useCallback(async (slug: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await audiobookService.getAudiobookBySlug(slug);
      setState(prev => ({
        ...prev,
        currentAudiobook: response.data,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch audiobook',
        loading: false,
      }));
    }
  }, []);

  const searchAudiobooks = useCallback(async (query: string, params: PaginationParams) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await audiobookService.searchAudiobooks(query, params);
      setState(prev => ({
        ...prev,
        audiobooks: response.data,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to search audiobooks',
        loading: false,
      }));
    }
  }, []);

  const setCurrentChapter = useCallback((chapterIndex: number) => {
    setState(prev => ({ ...prev, currentChapter: chapterIndex }));
  }, []);

  const setPlaybackState = useCallback((isPlaying: boolean) => {
    setState(prev => ({ ...prev, isPlaying }));
  }, []);

  const setCurrentTime = useCallback((time: number) => {
    setState(prev => ({ ...prev, currentTime: time }));
  }, []);

  const resetState = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    fetchAudiobooks,
    fetchAudiobookBySlug,
    searchAudiobooks,
    setCurrentChapter,
    setPlaybackState,
    setCurrentTime,
    resetState,
  };
}; 