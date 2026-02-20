export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7146/api',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

const validateEnv = () => {
  if (!ENV.API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL is required');
  }
};

validateEnv();
