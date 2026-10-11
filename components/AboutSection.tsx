import { Container } from "@/components/Container";
import { Prose } from "@/components/Prose";

type AboutSectionProps = {
  title: string;
  body: string;
};

export function AboutSection({ title, body }: AboutSectionProps) {
  return (
    <section
      aria-labelledby="origen-titulo"
      className="bg-white py-20 sm:py-28"
    >
      <Container>
        <div className="max-w-3xl">
          <h2
            id="origen-titulo"
            className="font-display text-4xl font-medium tracking-tight text-brand-ink sm:text-5xl"
          >
            {title}
          </h2>
          <span
            className="mt-5 block h-1 w-16 rounded-full bg-brand-yellow"
            aria-hidden="true"
          />
          <Prose body={body} className="mt-8" />
        </div>
      </Container>
    </section>
  );
}
