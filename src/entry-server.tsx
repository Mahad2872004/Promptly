import React from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router";
import { Root } from "./Root";

/**
 * Build-time pre-render of one route to HTML (used by scripts/build-pages.ts).
 * `prerenderToNodeStream` waits for every Suspense boundary — including the
 * lazy route chunks — so the output is the complete page, not a skeleton.
 */
export async function render(url: string): Promise<string> {
  const Router = ({ children }: { children: React.ReactNode }) => (
    <StaticRouter location={url}>{children}</StaticRouter>
  );
  const { prelude } = await prerenderToNodeStream(<Root router={Router} />);
  const chunks: Buffer[] = [];
  for await (const chunk of prelude) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString("utf8");
}
