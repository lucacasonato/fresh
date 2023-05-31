// -- $std --
export {
  fromFileUrl,
  toFileUrl,
} from "https://deno.land/std@0.189.0/path/mod.ts";

// -- esbuild --
// @deno-types="https://deno.land/x/esbuild@v0.17.11/mod.d.ts"
import * as esbuildWasm from "https://deno.land/x/esbuild@v0.17.11/wasm.js";
import * as esbuildNative from "https://deno.land/x/esbuild@v0.17.11/mod.js";
// @ts-ignore trust me
// deno-lint-ignore no-deprecated-deno-api
const esbuild: typeof esbuildWasm = Deno.run === undefined
  ? esbuildWasm
  : esbuildNative;
const esbuildWasmURL = new URL("./esbuild_v0.17.11.wasm", import.meta.url).href;
export { esbuild, esbuildWasm as esbuildTypes, esbuildWasmURL };

export { denoPlugins } from "https://deno.land/x/esbuild_deno_loader@0.7.0/mod.ts";
