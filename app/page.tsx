import { AboutSection } from "@/components/AboutSection";
import { Carousel } from "@/components/Carousel";
import { MissionSection } from "@/components/MissionSection";
import {
  getCarouselImages,
  getSiteContent,
  getSiteSettings,
} from "@/lib/queries";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, images, content] = await Promise.all([
    getSiteSettings(),
    getCarouselImages(),
    getSiteContent(),
  ]);

  return (
    <main>
      <h1 className="sr-only">{settings.bakeryName}</h1>
      <Carousel images={images} />
      <AboutSection title={content.origin.title} body={content.origin.body} />
      <MissionSection
        title={content.mission.title}
        body={content.mission.body}
      />
    </main>
  );
}
