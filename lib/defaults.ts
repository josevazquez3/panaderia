import type { CarouselImage, SiteContent, SiteSettings } from "@/types";

function paragraphs(blocks: readonly string[]): string {
  return blocks.join("\n\n");
}

export const defaultSettings: SiteSettings = {
  id: 1,
  bakeryName: "Panadería Aurora",
  logoUrl: "/logo.svg",
  email: "hola@panaderiaaurora.com",
  instagramUrl: "https://instagram.com/panaderiaaurora",
  facebookUrl: "https://facebook.com/panaderiaaurora",
};

export const defaultContent: SiteContent = {
  origin: {
    key: "origin",
    title: "Nuestros orígenes",
    body: paragraphs([
      "En 1987, Elena y Ricardo abrieron un horno chico a dos cuadras de la plaza, con una amasadora prestada y la receta del pan de campo que la abuela amasaba los domingos. El barrio se acostumbró al olor del trigo tostado antes del amanecer, y esa costumbre se volvió el pulso de la casa.",
      "Seguimos en el mismo local, con las baldosas gastadas y el mostrador de madera que ya conoce las manos de siempre. El horno de piedra se renovó, pero la masa madre que alimentamos cada noche desciende de aquella primera. El pan pide tiempo, temperatura justa y alguien que lo mire.",
      "Cada pieza que sale de aquí —la hogaza, las medialunas, la torta del sábado— lleva el mismo gesto: harina elegida, manteca de verdad y la paciencia de quien prefiere hacer menos y hacerlo bien.",
    ]),
  },
  mission: {
    key: "mission",
    title: "Nuestra misión",
    body: paragraphs([
      "Queremos que el pan de cada día sea un lujo sencillo, al alcance de quien pasa caminando. Trabajamos con productores cercanos, fermentaciones largas y una carta corta que cambia con la estación, para que lo que ofrecemos esté en su mejor momento.",
      "Nuestra misión es cuidar el oficio y a la gente que lo sostiene: el equipo que entra de madrugada, el vecino que pide la misma flauta desde hace veinte años y quien prueba por primera vez una porción de torta. Buscamos un trato claro, ingredientes que podamos nombrar y un mostrador donde siempre haya lugar para una pregunta.",
      "Si el barrio crece, crecemos con él, sin perder el ritmo del horno. Medimos el trabajo por el sabor, por la corteza y por las ganas de volver mañana.",
    ]),
  },
};

export const defaultCarouselImages: CarouselImage[] = [
  {
    id: 1,
    imageUrl: "/images/hogaza.jpg",
    alt: "Tres hogazas de semillas y harina sobre la mesa, con una espiga de trigo",
    position: 0,
    active: true,
  },
  {
    id: 2,
    imageUrl: "/images/medialunas.jpg",
    alt: "Dos medialunas doradas mientras cae azúcar impalpable",
    position: 1,
    active: true,
  },
  {
    id: 3,
    imageUrl: "/images/horno.jpg",
    alt: "Mostrador de la panadería con flautas, hogazas y panes de semillas",
    position: 2,
    active: true,
  },
  {
    id: 4,
    imageUrl: "/images/torta.jpg",
    alt: "Torta de chocolate con ganache y copetes de crema",
    position: 3,
    active: true,
  },
];
