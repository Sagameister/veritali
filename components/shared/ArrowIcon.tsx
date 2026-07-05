// Thick, crisp arrow for CTA rows. The text glyph "→" renders hairline-thin
// in our fonts — this SVG has a real stroke weight instead. It inherits its
// color from the parent (currentColor), so all existing hover-color and
// translate-on-hover classes keep working.

export default function ArrowIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 12h16" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}
