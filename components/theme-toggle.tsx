"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 opacity-0">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-9 w-9 rounded-full bg-[var(--color-surface)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 scale-100 transition-transform dark:scale-0" />
      <Moon className="absolute h-4 w-4 scale-0 transition-transform dark:scale-100" />
    </Button>
  );
}
