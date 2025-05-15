import { useState } from 'react';

interface HomeState {
  title: string;
  description: string;
}

const initialState: HomeState = {
  title: 'Welcome to Buku Pintar',
  description: 'Your Smart Learning Platform - Start your learning journey today!',
};

export const useHomeViewModel = () => {
  const [state] = useState<HomeState>(initialState);

  return {
    title: state.title,
    description: state.description,
  };
}; 