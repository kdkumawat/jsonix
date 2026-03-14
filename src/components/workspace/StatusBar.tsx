"use client";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface StatusBarProps {
  valid: boolean | null;
  errorMessage: string | null;
  lineCount: number;
  sizeFormatted: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function StatusBar({
  valid,
  errorMessage,
  lineCount,
  sizeFormatted,
}: StatusBarProps) {
  return (
    <div
      className="flex h-7 shrink-0 items-center gap-4 border-t border-[var(--workspace-border)] bg-[var(--workspace-background)] px-3 text-xs text-[var(--workspace-text-muted)]"
      style={{ height: "28px", padding: "0 12px" }}
    >
      {errorMessage ? (
        <span className="flex items-center gap-1.5 text-error">
          <XCircleIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {errorMessage}
        </span>
      ) : valid === true ? (
        <span className="flex items-center gap-1.5">
          <CheckCircleIcon className="h-3.5 w-3.5 shrink-0 text-success" aria-hidden />
          Valid JSON
        </span>
      ) : valid === false ? (
        <span className="flex items-center gap-1.5 text-error">
          <XCircleIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
          Invalid JSON
        </span>
      ) : (
        <span>—</span>
      )}
      <span className="tabular-nums">{lineCount} lines</span>
      <span>{sizeFormatted}</span>
    </div>
  );
}

export function getSizeFormatted(text: string): string {
  if (!text.trim()) return "0 B";
  return formatSize(new Blob([text]).size);
}
