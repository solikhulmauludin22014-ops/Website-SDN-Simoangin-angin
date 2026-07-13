"use client";

import { Button } from "@/components/ui/button";

type BookActionsProps = {
  bookId: string;
  driveFileId: string;
};

export function BookActions({ bookId, driveFileId }: BookActionsProps) {
  async function trackView() {
    await fetch(`/api/public/books/${bookId}/view`, { method: "POST" });
  }

  async function trackDownload() {
    await fetch(`/api/public/books/${bookId}/download`, { method: "POST" });
    window.open(`https://drive.google.com/uc?export=download&id=${driveFileId}`, "_blank");
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={trackView}>Baca Online</Button>
      <Button variant="secondary" onClick={trackDownload}>
        Download
      </Button>
    </div>
  );
}
