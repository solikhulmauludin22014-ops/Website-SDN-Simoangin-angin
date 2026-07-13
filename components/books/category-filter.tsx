"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type CategoryFilterProps = {
  categories: { id: string; name: string; slug: string }[];
  value: string;
  onChange: (value: string) => void;
};

export function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Semua kategori" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Semua kategori</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.slug}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
