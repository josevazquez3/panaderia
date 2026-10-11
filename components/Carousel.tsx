"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { CarouselImage } from "@/types";

const AUTOPLAY_MS = 5000;

type CarouselProps = {
  images: CarouselImage[];
};

const iconButtonClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-brand-ink shadow-soft transition duration-200 hover:bg-brand-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function Carousel({ images }: CarouselProps) {
  const count = images.length;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (count <= 0) return;
      setIndex(((nextIndex % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const sync = () => setTabHidden(document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  // `index` está en las dependencias para reiniciar los 5 segundos tras cada cambio,
  // también cuando la persona usa las flechas o los puntos.
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const paused = hovered || tabHidden || document.hidden;

    if (reduceMotion || reducedMotion || paused || count <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [hovered, tabHidden, reducedMotion, count, index]);

  if (count === 0) {
    return (
      <section aria-label="Galería de la panadería" className="bg-brand-cream">
        <div className="mx-auto flex h-[60vh] min-h-[360px] max-w-3xl flex-col items-center justify-center px-4 text-center">
          <p className="font-display text-3xl font-medium tracking-tight text-brand-ink sm:text-4xl">
            El mostrador se está preparando
          </p>
          <span
            className="mt-5 block h-1 w-16 rounded-full bg-brand-yellow"
            aria-hidden="true"
          />
          <p className="mt-5 max-w-md text-base leading-relaxed text-gray-500 sm:text-lg">
            Pronto vas a ver aquí el pan, las medialunas y las tortas del día.
          </p>
        </div>
      </section>
    );
  }

  const active = images[index] ?? images[0];

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Fotos de la panadería"
      className="relative h-[60vh] min-h-[360px] overflow-hidden bg-brand-cream"
      onMouseEnter={() => {
        if (window.matchMedia("(hover: hover)").matches) setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(index - 1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          goTo(index + 1);
        }
      }}
    >
      {images.map((image, imageIndex) => {
        const isActive = imageIndex === index;

        return (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
              isActive ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
            aria-hidden={!isActive}
          >
            <Image
              src={image.imageUrl}
              alt={isActive ? image.alt : ""}
              fill
              priority={imageIndex === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        );
      })}

      <div
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-brand-ink/45 via-transparent to-brand-ink/10"
        aria-hidden="true"
      />

      {active ? (
        <p className="sr-only" aria-live="polite">
          {`Imagen ${index + 1} de ${count}: ${active.alt}`}
        </p>
      ) : null}

      {count > 1 ? (
        <>
          <button
            type="button"
            className={`${iconButtonClass} absolute left-3 top-1/2 z-30 -translate-y-1/2 sm:left-6`}
            aria-label="Imagen anterior"
            onClick={() => goTo(index - 1)}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${iconButtonClass} absolute right-3 top-1/2 z-30 -translate-y-1/2 sm:right-6`}
            aria-label="Imagen siguiente"
            onClick={() => goTo(index + 1)}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="absolute inset-x-0 bottom-4 z-30 flex justify-center sm:bottom-6">
            <div
              className="flex items-center rounded-full bg-brand-ink/40 p-1 backdrop-blur-sm"
              role="group"
              aria-label="Elegir foto"
            >
              {images.map((image, imageIndex) => {
                const isActive = imageIndex === index;

                return (
                  <button
                    key={image.id}
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    aria-label={`Ir a la imagen ${imageIndex + 1}: ${image.alt}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => goTo(imageIndex)}
                  >
                    <span
                      aria-hidden="true"
                      className={`block rounded-full transition-all duration-300 ${
                        isActive ? "h-2.5 w-6 bg-brand-yellow" : "h-2.5 w-2.5 bg-white"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}
