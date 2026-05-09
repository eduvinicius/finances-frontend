import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/features/auth/context/authContext";
import { PrivacyProvider } from "@/shared/contexts/privacy/privacyContext";
import { ENV } from "@/shared/constants/env";
import { queryClient } from "@/lib/queryClient";
import { STORAGE_KEYS } from "@/shared/utils/storage";

export function AppProviders({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" storageKey={STORAGE_KEYS.THEME}>
      <QueryClientProvider client={queryClient}>
        <PrivacyProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </PrivacyProvider>
        {ENV.isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
