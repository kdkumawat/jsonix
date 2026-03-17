"use client";

import { Suspense } from "react";
import { WorkspaceContent } from "@/components/WorkspaceContent";

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-[var(--workspace-background)]">
        <p className="text-sm text-base-content/70">Loading…</p>
      </div>
    }>
      <WorkspaceContent />
    </Suspense>
  );
}
