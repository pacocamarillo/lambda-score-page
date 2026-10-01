"use client";

import { useState } from "react";

const videos = [
  {
    title: "Zoker 2500 MTB Amozoc",
    embed:
      "https://www.youtube.com/embed/videoseries?list=PLplaceholder_zoker",
  },
  {
    title: "Mejor carrera de MTB de Puebla",
    embed:
      "https://www.youtube.com/embed/videoseries?list=PLplaceholder_mtb",
  },
  {
    title: "Mayáhuel Trail",
    embed:
      "https://www.youtube.com/embed/videoseries?list=PLplaceholder_mayahuel",
  },
];

export function VideoTabs() {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div role="tablist" aria-label="Últimos videos" className="flex flex-wrap gap-2">
        {videos.map((video, index) => (
          <button
            key={video.title}
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
      <div className="mt-4 aspect-video overflow-hidden bg-[color:var(--bg-deep)]">
        <iframe
          title={videos[active].title}
          src={videos[active].embed}
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
