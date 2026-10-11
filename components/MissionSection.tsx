import { Container } from "@/components/Container";
import { Prose } from "@/components/Prose";

type MissionSectionProps = {
  title: string;
  body: string;
};

export function MissionSection({ title, body }: MissionSectionProps) {
  return (
    <section
      aria-labelledby="mision-titulo"
      className="bg-brand-cream py-20 sm:py-28"
    >
      <Container>
        <div className="max-w-3xl overflow-hidden rounded-3xl bg-white shadow-soft">
          <div className="h-1.5 bg-brand-yellow" aria-hidden="true" />
          <div className="p-8 sm:p-12 lg:p-14">
            <h2
              id="mision-titulo"
              className="font-display text-4xl font-medium tracking-tight text-brand-ink sm:text-5xl"
            >
              {title}
            </h2>
            <Prose body={body} className="mt-8" />
          </div>
        </div>
      </Container>
    </section>
  );
}
