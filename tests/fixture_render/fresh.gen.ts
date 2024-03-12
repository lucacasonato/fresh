// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $cookiePasser from "./routes/cookiePasser.tsx";
import * as $head_style from "./routes/head_style.tsx";
import * as $header_arr from "./routes/header_arr.tsx";
import * as $header_instance from "./routes/header_instance.tsx";
import * as $header_obj from "./routes/header_obj.tsx";
import * as $index from "./routes/index.tsx";

import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/cookiePasser.tsx": $cookiePasser,
    "./routes/head_style.tsx": $head_style,
    "./routes/header_arr.tsx": $header_arr,
    "./routes/header_instance.tsx": $header_instance,
    "./routes/header_obj.tsx": $header_obj,
    "./routes/index.tsx": $index,
  },
  islands: {},
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
