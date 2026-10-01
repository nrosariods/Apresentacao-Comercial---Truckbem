export function BorderBeam({ active = true }: { active?: boolean }) {
  if (!active) return null;
  return (
    <span
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <span className="border-beam" />
    </span>
  );
}
