import TOML from "@iarna/toml";
import type { FormatAdapter } from "./types";
import type { JsonValue } from "@/lib/json/core";

const tomlValueToJson = (obj: unknown): JsonValue => {
  if (obj === null || obj === undefined) return null;
  if (typeof obj !== "object") return obj as JsonValue;
  if (obj instanceof Date) return obj.toISOString() as unknown as JsonValue;
  if (Array.isArray(obj)) return obj.map(tomlValueToJson) as JsonValue;
  const result: Record<string, JsonValue> = {};
  for (const [k, v] of Object.entries(obj)) {
    result[k] = tomlValueToJson(v);
  }
  return result;
};

export const tomlAdapter: FormatAdapter = {
  kind: "toml",
  parse(input: string): JsonValue {
    const parsed = TOML.parse(input);
    return tomlValueToJson(parsed);
  },
  stringify(data: JsonValue, options?: Parameters<FormatAdapter["stringify"]>[1]): string {
    const obj = Array.isArray(data) ? { data } : (data as Record<string, unknown>);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let out = TOML.stringify(obj as any);
    if (options?.minify) {
      out = out.replace(/\n{2,}/g, "\n").trim();
    }
    return out;
  },
};
