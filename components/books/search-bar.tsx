"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  defaultValue?: string;
  onChange: (value: string) => void;
};

export function SearchBar({ defaultValue = "", onChange }: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const timer = setTimeout(() => onChange(value), 400);
    return () => clearTimeout(timer);
  }, [value, onChange]);

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Cari judul atau penulis..."
        className="pl-9"
        aria-label="Cari buku"
      />
    </div>
  );
}
