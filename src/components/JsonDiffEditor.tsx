"use client";

import { useCallback } from "react";
import { DiffEditor } from "@monaco-editor/react";
import type { editor } from "monaco-editor";

interface JsonDiffEditorProps {
  original: string;
  modified: string;
  language?: string;
  monacoTheme?: string;
  className?: string;
  fontSize?: number;
  originalEditable?: boolean;
  modifiedEditable?: boolean;
  onOriginalChange?: (value: string) => void;
  onModifiedChange?: (value: string) => void;
  outputPanelClass?: string;
}

export function JsonDiffEditor({
  original,
  modified,
  language = "json",
  monacoTheme = "vs-dark",
  className,
  fontSize = 13,
  originalEditable = false,
  modifiedEditable = false,
  onOriginalChange,
  onModifiedChange,
  outputPanelClass = "border-base-300 bg-base-100",
}: JsonDiffEditorProps) {
  const handleMount = useCallback(
    (ed: editor.IStandaloneDiffEditor) => {
      const model = ed.getModel();
      if (!model) return;
      const disposables: { dispose: () => void }[] = [];
      if (originalEditable && onOriginalChange) {
        const orig = model.original;
        if (orig) {
          disposables.push(orig.onDidChangeContent(() => onOriginalChange(orig.getValue())));
        }
      }
      if (modifiedEditable && onModifiedChange) {
        const mod = model.modified;
        if (mod) {
          disposables.push(mod.onDidChangeContent(() => onModifiedChange(mod.getValue())));
        }
      }
      return () => disposables.forEach((d) => d.dispose());
    },
    [originalEditable, modifiedEditable, onOriginalChange, onModifiedChange],
  );

  const bothEditable = originalEditable || modifiedEditable;

  return (
    <div
      className={`relative h-full min-h-0 overflow-hidden border ${outputPanelClass} ${className ?? ""}`}
    >
      <DiffEditor
        height="100%"
        original={original}
        modified={modified}
        language={language}
        theme={monacoTheme}
        onMount={handleMount}
        options={{
          readOnly: !bothEditable,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          renderSideBySide: true,
          minimap: { enabled: false },
          wordWrap: "on",
          fontSize,
          originalEditable,
          diffWordWrap: "on",
          ignoreTrimWhitespace: false,
        }}
      />
    </div>
  );
}
