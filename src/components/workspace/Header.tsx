"use client";

import { SunIcon, MoonIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";

type ThemeMode = "system" | "dark" | "light";

interface HeaderProps {
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
}

const themeOptions: { mode: ThemeMode; label: string; Icon: typeof SunIcon }[] = [
  { mode: "system", label: "System", Icon: ComputerDesktopIcon },
  { mode: "light", label: "Light", Icon: SunIcon },
  { mode: "dark", label: "Dark", Icon: MoonIcon },
];

export function Header({ themeMode, onThemeChange }: HeaderProps) {
  return (
    <header
      className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--workspace-border)] bg-[var(--workspace-background)] px-6"
      style={{ height: "56px", padding: "0 24px" }}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl font-semibold text-[var(--workspace-text)]">
          JSONix
        </span>
        <span className="text-sm text-[var(--workspace-text-muted)]">
          JSON transform & validation
        </span>
      </div>
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/kdkumawat/jsonix"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg px-3 py-2 text-[13px] text-[var(--workspace-text-muted)] transition-colors hover:bg-[var(--workspace-panel)] hover:text-[var(--workspace-text)] focus:outline-none focus:ring-2 focus:ring-[var(--workspace-border)]"
          aria-label="GitHub repository"
        >
          GitHub
        </a>
        <div className="flex rounded-lg border border-[var(--workspace-border)] p-0.5">
          {themeOptions.map(({ mode, label, Icon }) => (
            <button
              key={mode}
              type="button"
              aria-label={`${label} theme`}
              title={label}
              onClick={() => onThemeChange(mode)}
              className={`rounded-md p-1.5 transition-colors ${
                themeMode === mode
                  ? "bg-primary text-primary-content"
                  : "text-[var(--workspace-text-muted)] hover:bg-[var(--workspace-panel)] hover:text-[var(--workspace-text)]"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden />
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
