type ProseProps = {
  body: string;
  className?: string;
};

export function Prose({ body, className }: ProseProps) {
  const paragraphs = body
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);

  if (paragraphs.length === 0) return null;

  return (
    <div
      className={[
        "space-y-5 text-base leading-relaxed text-gray-500 sm:text-lg sm:leading-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
