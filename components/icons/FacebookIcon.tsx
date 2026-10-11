type IconProps = {
  className?: string;
};

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth={1.8}
      />
      <path
        fill="currentColor"
        d="M13.4 12.2h1.7l-.3 1.8h-1.4V18h-1.9v-4H9.3v-1.8h1.2v-1.1c0-1.2.6-2.1 2-2.1.5 0 1 .1 1 .1v1.6h-.7c-.6 0-.7.3-.7.8v.7Z"
      />
    </svg>
  );
}
