"use client";

import { useMemo, useRef, useState, type ComponentType, type RefAttributes } from "react";
import dynamic from "next/dynamic";
import {
  ArrowsPointingOutIcon,
  Bars3Icon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import "jsoncrack-react/style.css";
import type { JSONCrackProps, JSONCrackRef, LayoutDirection } from "jsoncrack-react";
import type { JsonValue } from "@/lib/json/core";

const JSONCrackDynamic = dynamic(
  () => import("jsoncrack-react").then((module) => module.JSONCrack),
  { ssr: false },
) as ComponentType<JSONCrackProps & RefAttributes<JSONCrackRef>>;

interface GraphViewProps {
  data: JsonValue;
  className?: string;
  isDark?: boolean;
}

const LAYOUTS: LayoutDirection[] = ["DOWN", "RIGHT", "LEFT", "UP"];

export function GraphView({ data, className, isDark = false }: GraphViewProps) {
  const graphRef = useRef<JSONCrackRef | null>(null);
  const [layoutDirection, setLayoutDirection] = useState<LayoutDirection>("DOWN");
  const [showGrid, setShowGrid] = useState(true);
  const [trackpadZoom, setTrackpadZoom] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const normalizedData = useMemo(() => {
    if (Array.isArray(data)) return data;
    if (data && typeof data === "object") return data;
    return { value: data };
  }, [data]);

  const searchMatches = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return 0;
    const source = JSON.stringify(normalizedData).toLowerCase();
    return source.split(term).length - 1;
  }, [normalizedData, search]);

  const rotateLayout = () => {
    setLayoutDirection((prev) => {
      const current = LAYOUTS.indexOf(prev);
      return LAYOUTS[(current + 1) % LAYOUTS.length];
    });
  };

  return (
    <div className={`relative h-full overflow-hidden rounded-xl border ${className ?? ""}`}>
      <JSONCrackDynamic
        ref={graphRef}
        json={normalizedData}
        theme={isDark ? "dark" : "light"}
        layoutDirection={layoutDirection}
        showControls={false}
        showGrid={showGrid}
        trackpadZoom={trackpadZoom}
        centerOnLayout
        maxRenderableNodes={1200}
      />

      <div className="absolute left-2 top-2 z-10">
        <button
          type="button"
          className="btn btn-xs btn-square border-white/20 bg-black/55 text-zinc-100 hover:bg-black/70"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Graph options"
        >
          <Bars3Icon className="h-3.5 w-3.5" />
        </button>
        {menuOpen ? (
          <div className="mt-2 w-44 overflow-hidden rounded-md border border-white/20 bg-zinc-900/95 text-xs text-zinc-200 shadow-2xl">
            <button
              type="button"
              className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-white/10"
              onClick={() => {
                rotateLayout();
                setMenuOpen(false);
              }}
            >
              <span>Rotate Layout</span>
              <span className="text-zinc-400">{layoutDirection}</span>
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-white/10"
              onClick={() => setShowGrid((prev) => !prev)}
            >
              <span>Rulers</span>
              <span className="text-zinc-400">{showGrid ? "On" : "Off"}</span>
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-white/10"
              onClick={() => setTrackpadZoom((prev) => !prev)}
            >
              <span>Zoom on Scroll</span>
              <span className="text-zinc-400">{trackpadZoom ? "On" : "Off"}</span>
            </button>
          </div>
        ) : null}
      </div>

      <div className="absolute bottom-2 left-2 z-10 flex items-center gap-2">
        <div className="join overflow-hidden rounded-md border border-white/20 bg-black/55">
          <button
            type="button"
            className="btn btn-xs join-item btn-square border-0 bg-transparent text-zinc-100 hover:bg-white/10"
            onClick={() => graphRef.current?.focusFirstNode()}
            aria-label="Focus root"
            title="Focus root"
          >
            <HomeIcon className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            className="btn btn-xs join-item btn-square border-0 bg-transparent text-zinc-100 hover:bg-white/10"
            onClick={() => graphRef.current?.centerView()}
            aria-label="Fit graph"
            title="Fit graph"
          >
            <ArrowsPointingOutIcon className="h-3.5 w-3.5" />
          </button>
        </div>

        <label className="input input-xs flex h-7 w-44 items-center gap-1 border-white/20 bg-black/55 text-zinc-100">
          <MagnifyingGlassIcon className="h-3.5 w-3.5 text-zinc-300" />
          <input
            type="text"
            placeholder="Search node"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-transparent text-xs"
            aria-label="Search graph"
          />
        </label>
        {search.trim() ? <span className="text-[10px] text-zinc-300">{searchMatches} matches</span> : null}
      </div>
    </div>
  );
}
