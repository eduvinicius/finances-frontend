export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL as string,
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

const validateEnv = () => {
  if (!ENV.API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL is required');
  }
  if (!ENV.GOOGLE_CLIENT_ID) {
    throw new Error('VITE_GOOGLE_CLIENT_ID is required');
  }
};

validateEnv();
