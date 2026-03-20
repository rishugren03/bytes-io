import { CSPostHogProvider } from "./posthog-provider";

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <CSPostHogProvider>
      {children}
    </CSPostHogProvider>
  );
}
