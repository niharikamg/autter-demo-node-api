import { describe, expect, test } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Regression guard for GHSA-mrhx-c7xc-m3w5: the zod dependency must be pinned to
// the patched release line (4.6.6). This test fails on the vulnerable 3.x pin
// and passes once package.json moves zod to ^4.6.6.
describe("zod CVE pin", () => {
  test("zod is pinned to the version fixed in GHSA-mrhx-c7xc-m3w5", () => {
    const here = dirname(fileURLToPath(import.meta.url));
    const pkg = JSON.parse(
      readFileSync(resolve(here, "../package.json"), "utf8"),
    ) as { dependencies?: Record<string, string> };

    expect(pkg.dependencies?.zod).toBeDefined();
    // Fixed version for GHSA-mrhx-c7xc-m3w5 is 4.6.6 (zod >= 4.6.6).
    expect(pkg.dependencies!.zod).toMatch(/^\^4\.6\.6$/);
  });
});
