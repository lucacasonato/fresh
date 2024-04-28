// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $index from "./routes/index.tsx";
import * as $island from "./routes/island.tsx";
import * as $no_island from "./routes/no_island.tsx";
import * as $Counter from "./islands/Counter.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/index.tsx": $index,
    "./routes/island.tsx": $island,
    "./routes/no_island.tsx": $no_island,
  },
  islands: {
    "./islands/Counter.tsx": $Counter,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;