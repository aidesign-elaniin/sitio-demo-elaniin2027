/** Smooth path through points: cubic segments whose control points sit at the midpoint on x (no overshoot). */
export function smoothPath(points: ReadonlyArray<readonly [number, number]>) {
  return points
    .map(([x, y], i) => {
      if (i === 0) return `M ${x} ${y}`;
      const [px, py] = points[i - 1];
      const mx = (px + x) / 2;
      return `C ${mx} ${py} ${mx} ${y} ${x} ${y}`;
    })
    .join(" ");
}

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/** Point at fraction t (0..1) of the length of a polyline. */
export function pointAt(points: ReadonlyArray<readonly [number, number]>, t: number): readonly [number, number] {
  const lens: number[] = [];
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const d = Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
    lens.push(d);
    total += d;
  }
  let remaining = clamp(t) * total;
  for (let i = 0; i < lens.length; i++) {
    if (remaining <= lens[i] || i === lens.length - 1) {
      const k = lens[i] === 0 ? 0 : remaining / lens[i];
      return [lerp(points[i][0], points[i + 1][0], k), lerp(points[i][1], points[i + 1][1], k)];
    }
    remaining -= lens[i];
  }
  return points[0];
}
