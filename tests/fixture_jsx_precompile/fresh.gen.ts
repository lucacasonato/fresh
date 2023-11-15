// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $asset from "./routes/asset.tsx";
import * as $asset_srcset from "./routes/asset_srcset.tsx";
import * as $fresh_attrs from "./routes/fresh_attrs.tsx";
import * as $head from "./routes/head.tsx";
import * as $index from "./routes/index.tsx";
import * as $sub_dynamic_foo from "./routes/sub-dynamic/foo.tsx";
import * as $sub_dynamic_index from "./routes/sub-dynamic/index.tsx";
import * as $sub_foo from "./routes/sub/foo.tsx";
import * as $sub_index from "./routes/sub/index.tsx";
import * as $twind from "./routes/twind.tsx";
import * as $$Island from "./islands/Island.tsx";
import { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/asset.tsx": $asset,
    "./routes/asset_srcset.tsx": $asset_srcset,
    "./routes/fresh_attrs.tsx": $fresh_attrs,
    "./routes/head.tsx": $head,
    "./routes/index.tsx": $index,
    "./routes/sub-dynamic/foo.tsx": $sub_dynamic_foo,
    "./routes/sub-dynamic/index.tsx": $sub_dynamic_index,
    "./routes/sub/foo.tsx": $sub_foo,
    "./routes/sub/index.tsx": $sub_index,
    "./routes/twind.tsx": $twind,
  },
  islands: {
    "./islands/Island.tsx": $$Island,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
