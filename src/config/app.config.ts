interface AppConfig {
  useMockData: boolean;
  apiBaseUrl: string;
  mockDelay: number;
}

const config: AppConfig = {
  useMockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  mockDelay: 1000, // 1 second delay for mock data
};

export default config; 