/*
  Soft blue glow behind a section (DESIGN.md motifs.section-glow): three radial blobs in the Elaniin ramp that drift slowly,
  so the glass panel in front of them shows a small movement. Decorative; put it inside a `relative isolate overflow-hidden`
  section, behind the content.
*/
const BLOBS = [
  { left: "-8%", bottom: "-18%", width: "58%", height: "98%", color: "var(--color-blue-300)", alpha: 45, s: "17s" },
  { right: "-8%", bottom: "-10%", width: "54%", height: "90%", color: "var(--color-blue-200)", alpha: 75, s: "21s" },
  { left: "22%", bottom: "-24%", width: "56%", height: "78%", color: "var(--color-blue-300)", alpha: 32, s: "25s" },
] as const;

export function SectionGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {BLOBS.map((b, i) => (
        <div
          key={i}
          className="glow-drift absolute"
          style={
            {
              left: "left" in b ? b.left : undefined,
              right: "right" in b ? b.right : undefined,
              bottom: b.bottom,
              width: b.width,
              height: b.height,
              background: `radial-gradient(closest-side, color-mix(in srgb, ${b.color} ${b.alpha}%, transparent), transparent)`,
              "--glow-s": b.s,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
