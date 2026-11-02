import React, { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { Badge, Button, DeviceFrame } from "../../components/ui";
import type { ProductDefinition } from "../../data/products";

/**
 * The product's real public demo inside a browser frame. The iframe only
 * loads when the visitor asks for it, so it costs nothing until then.
 */
export function LiveDemo({ product }: { product: ProductDefinition }) {
  const [loaded, setLoaded] = useState(false);
  const host = new URL(product.url).host;
  return (
    <div className="relative">
      <DeviceFrame url={host} className="rounded-frame" screenClassName="relative aspect-[4/5] sm:aspect-[16/10]">
        {loaded ? (
          <iframe
            src={product.url}
            title={`${product.name} live demo`}
            className="absolute inset-0 h-full w-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="absolute inset-0">
            <img
              src={product.preview.src}
                    srcSet={product.preview.srcSet}
                    sizes="(min-width: 1024px) 1320px, 100vw"
              alt={product.preview.alt}
              width={product.preview.width}
              height={product.preview.height}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink-950/45 backdrop-blur-[2px]">
              <Button size="lg" iconLeft={<Play size={17} />} onClick={() => setLoaded(true)}>
                Launch the live demo
              </Button>
              <span className="rounded-full bg-ink-950/60 px-3 py-1 text-xs text-white/85">
                Loads {host} · {product.preview.caption}
              </span>
            </div>
          </div>
        )}
      </DeviceFrame>
      <div className="absolute -top-3 left-6 sm:left-10">
        <Badge variant="live">Live</Badge>
      </div>
      <div className="mt-5 flex justify-end">
        <Button href={product.url} variant="link" iconRight={<ArrowUpRight size={15} />} className="text-sm">
          Open in a new tab
        </Button>
      </div>
    </div>
  );
}
