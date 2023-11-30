import { stringToIdentifier } from "../server/init_safe_deps.ts";
import { extname, join, normalize } from "./deps.ts";

/**
 * Import specifiers must have forward slashes
 */
function toImportSpecifier(file: string) {
  let specifier = normalize(file).replace(/\\/g, "/");
  if (!specifier.startsWith(".")) {
    specifier = "./" + specifier;
  }
  return specifier;
}

// Create a valid JS identifier out of the project relative specifier.
// Note that we only need to deal with strings that _must_ have been
// valid file names in Windows, macOS and Linux and every identifier we
// create here will be prefixed with at least one "$". This greatly
// simplifies the invalid characters we have to account for.
export function specifierToIdentifier(specifier: string, used: Set<string>) {
  specifier = specifier.replace(/^(?:\.\/routes|\.\/islands)\//, "");
  const ext = extname(specifier);
  if (ext) specifier = specifier.slice(0, -ext.length);

  // Turn the specifier into a readable JS identifier
  let ident = stringToIdentifier(specifier);

  if (used.has(ident)) {
    let check = ident;
    let i = 1;
    while (used.has(check)) {
      check = `${ident}_${i++}`;
    }
    ident = check;
  }

  used.add(ident);
  return ident;
}

export interface Manifest {
  routes: string[];
  islands: string[];
}

export async function generate(directory: string, manifest: Manifest) {
  const { routes, islands } = manifest;

  // Keep track of which identifier we've already used
  const used = new Set<string>();

  const normalizedRoutes = new Map<string, string>();
  for (let i = 0; i < routes.length; i++) {
    const file = routes[i];
    const specifier = toImportSpecifier(file);
    const identifier = specifierToIdentifier(specifier, used);
    normalizedRoutes.set(specifier, identifier);
  }

  const normalizedIslands: { specifier: string; identifier: string }[] = [];
  for (let i = 0; i < islands.length; i++) {
    const file = islands[i];
    const specifier = toImportSpecifier(file);
    const identifier = specifierToIdentifier(specifier, used);
    normalizedIslands.push({ specifier, identifier });
  }

  const output = `// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running \`dev.ts\`.

${
    Array.from(normalizedRoutes.entries()).map(([specifier, identifier]) =>
      `import * as $${identifier} from "${specifier}";`
    ).join(
      "\n",
    )
  }
${
    normalizedIslands.map(({ specifier, identifier }) =>
      `import * as $${identifier} from "${specifier}";`
    )
      .join("\n")
  }
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    ${
    Array.from(normalizedRoutes.entries()).map(([specifier, identifier]) =>
      `${JSON.stringify(`${specifier}`)}: $${identifier},`
    )
      .join("\n    ")
  }
  },
  islands: {
    ${
    normalizedIslands.map(({ specifier, identifier }) =>
      `${JSON.stringify(`${specifier}`)}: $${identifier},`
    )
      .join("\n    ")
  }
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
`;

  const proc = new Deno.Command(Deno.execPath(), {
    args: ["fmt", "-"],
    stdin: "piped",
    stdout: "piped",
    stderr: "null",
  }).spawn();

  const raw = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(output));
      controller.close();
    },
  });
  await raw.pipeTo(proc.stdin);
  const { stdout } = await proc.output();

  const manifestStr = new TextDecoder().decode(stdout);
  const manifestPath = join(directory, "./fresh.gen.ts");

  await Deno.writeTextFile(manifestPath, manifestStr);
  console.log(
    `%cThe manifest has been generated for ${routes.length} routes and ${islands.length} islands.`,
    "color: blue; font-weight: bold",
  );
}
