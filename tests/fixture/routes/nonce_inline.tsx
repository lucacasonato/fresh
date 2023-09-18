import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { RouteConfig } from "$fresh/server.ts";

export const config: RouteConfig = {
  csp: true,
};

export default function Page() {
  const sig = useSignal(0);
  return (
    <div>
      <script
        id="inline-script"
        dangerouslySetInnerHTML={{ __html: "console.log('hey')" }}
      />
      <Counter id="foo" count={sig} />
    </div>
  );
}
