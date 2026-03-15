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
  modifiedEditable?: boolean;
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
  modifiedEditable = false,
  onModifiedChange,
  outputPanelClass = "border-base-300 bg-base-100",
}: JsonDiffEditorProps) {
  const handleMount = useCallback(
    (editor: editor.IStandaloneDiffEditor) => {
      if (!modifiedEditable || !onModifiedChange) return;
      const modifiedModel = editor.getModel()?.modified;
      if (!modifiedModel) return;
      const disposable = modifiedModel.onDidChangeContent(() => {
        onModifiedChange(modifiedModel.getValue());
      });
      return () => disposable.dispose();
    },
    [modifiedEditable, onModifiedChange],
  );

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
          readOnly: !modifiedEditable,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          renderSideBySide: true,
          minimap: { enabled: false },
          wordWrap: "on",
          fontSize,
          originalEditable: false,
          diffWordWrap: "on",
          ignoreTrimWhitespace: false,
        }}
      />
    </div>
  );
}
