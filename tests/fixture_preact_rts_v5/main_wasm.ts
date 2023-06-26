// Simulate Deno Deploy environment

/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "./polyfill_deno_deploy.ts";
import { start } from "$fresh/server.ts";
import routes from "./fresh.gen.ts";
import options from "./options.ts";
import { parseDenoFlags } from "../deps.ts";

const flags = parseDenoFlags(Deno.args, {
  boolean: ["experimental-deno-serve"],
  string: ["certFile", "keyFile", "cert", "key"]
})

await start(routes, { ...options, experimentalDenoServe: flags["experimental-deno-serve"], keyFile: flags.keyFile, certFile: flags.certFile,  key: flags.key, cert: flags.cert });

