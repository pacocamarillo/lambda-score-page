"use client";

import { useState } from "react";
import type { FeaturedVideo } from "@/lib/youtube";

export function VideoTabs({ videos }: { videos: FeaturedVideo[] }) {
  const [active, setActive] = useState(0);
  const current = videos[active];

  if (!current) return null;

  return (
    <div>
      <div role="tablist" aria-label="Últimos videos" className="flex flex-wrap gap-2">
        {videos.map((video, index) => (
          <button
            key={`${video.title}-${video.embedUrl}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              active === index
                ? "bg-[color:var(--bg-deep)] text-[color:var(--brand)]"
                : "bg-white/70 text-[color:var(--ink)]"
            }`}
            onClick={() => setActive(index)}
          >
            {video.title}
          </button>
        ))}
      </div>
      <div
        className={`mt-4 overflow-hidden bg-[color:var(--bg-deep)] ${
          current.short
            ? "mx-auto aspect-[9/16] max-h-[70vh] w-full max-w-sm"
            : "aspect-video"
        }`}
      >
        <iframe
          title={current.title}
          src={current.embedUrl}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <p className="muted mt-3 text-sm">
        Si el video no carga, visita nuestro canal de YouTube desde el pie de
        página.
      </p>
    </div>
  );
}
