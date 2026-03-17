import yaml from "js-yaml";
import type { FormatAdapter } from "./types";
import type { JsonValue } from "@/lib/json/core";

export const yamlAdapter: FormatAdapter = {
  kind: "yaml",
  parse(input: string): JsonValue {
    return yaml.load(input) as JsonValue;
  },
  stringify(data: JsonValue, options?: Parameters<FormatAdapter["stringify"]>[1]): string {
    const minify = options?.minify ?? false;
    const indent = minify ? 0 : Math.max(1, Math.min(10, options?.indentation ?? 2));
    const out = yaml.dump(data, { lineWidth: -1, indent, noRefs: true });
    return minify ? out.replace(/\n{2,}/g, "\n").trim() : out;
  },
};
