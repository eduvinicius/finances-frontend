import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "@/features/auth/context/authContext";
import { PrivacyProvider } from "@/shared/contexts/privacy/privacyContext";
import { ENV } from "@/shared/constants/env";
import { queryClient } from "@/lib/queryClient";

export function AppProviders({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <PrivacyProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </PrivacyProvider>
      {ENV.isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
