"use client";

import * as React from "react";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Theme appearance={resolvedTheme as "light" | "dark"}>
      {children}
    </Theme>
  );
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemeProvider {...props}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </NextThemeProvider>
  );
}
