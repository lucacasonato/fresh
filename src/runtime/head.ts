import { ComponentChildren, createContext, useContext } from "./deps.ts";

export interface HeadProps {
  children: ComponentChildren;
}

export const HEAD_CONTEXT = createContext<ComponentChildren[]>([]);

export function Head(props: HeadProps) {
  let context: ComponentChildren[];
  try {
    context = useContext(HEAD_CONTEXT);
  } catch (err) {
    console.log("Rendering of Head component failed:\n", err);
    throw new Error(
      "<Head> component is not supported in the browser, or during suspense renders: " + err,
    );
  }
  context.push(props.children);
  return null;
}
