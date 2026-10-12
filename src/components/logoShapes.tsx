import type { ReactNode } from 'react'

export const LOGO_SHAPES = [
  'oval',
  'pill',
  'triangle',
  'arrow',
  'fan',
  'diamond',
  'clamshell',
  'pentagon',
  'gem',
  'very-sunny',
  'sunny',
  'cookie-4',
  'cookie-6',
  'cookie-7',
  'cookie-9',
  'cookie-11',
  'clover',
  'flower-8',
  'burst',
  'star',
] as const

export type LogoShape = (typeof LOGO_SHAPES)[number]

function polar(cx: number, cy: number, r: number, angle: number) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  }
}

/** Soft n-gon with rounded corners via quadratic midpoints. */
function roundedPolygon(sides: number, radius = 16.5, cx = 20, cy = 20, rotation = -Math.PI / 2, corner = 0.28) {
  const points = Array.from({ length: sides }, (_, i) => {
    const a = rotation + (i / sides) * Math.PI * 2
    return polar(cx, cy, radius, a)
  })
  const parts: string[] = []
  for (let i = 0; i < sides; i++) {
    const prev = points[(i - 1 + sides) % sides]
    const curr = points[i]
    const next = points[(i + 1) % sides]
    const start = {
      x: curr.x + (prev.x - curr.x) * corner,
      y: curr.y + (prev.y - curr.y) * corner,
    }
    const end = {
      x: curr.x + (next.x - curr.x) * corner,
      y: curr.y + (next.y - curr.y) * corner,
    }
    if (i === 0) parts.push(`M ${start.x.toFixed(2)} ${start.y.toFixed(2)}`)
    else parts.push(`L ${start.x.toFixed(2)} ${start.y.toFixed(2)}`)
    parts.push(`Q ${curr.x.toFixed(2)} ${curr.y.toFixed(2)} ${end.x.toFixed(2)} ${end.y.toFixed(2)}`)
  }
  parts.push('Z')
  return parts.join(' ')
}

/** Scalloped “cookie” — radius oscillates with lobe count. */
function scallopPath(lobes: number, baseR = 15.2, amp = 2.4, cx = 20, cy = 20) {
  const steps = Math.max(lobes * 24, 48)
  const parts: string[] = []
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2 - Math.PI / 2
    const r = baseR + amp * Math.cos(t * lobes)
    const { x, y } = polar(cx, cy, r, t)
    parts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  parts.push('Z')
  return parts.join(' ')
}

/** Soft star / sunny with alternating outer & inner radii. */
function softStarPath(points: number, outer = 17.5, inner = 13.2, cx = 20, cy = 20) {
  const total = points * 2
  const parts: string[] = []
  for (let i = 0; i <= total; i++) {
    const t = (i / total) * Math.PI * 2 - Math.PI / 2
    const r = i % 2 === 0 ? outer : inner
    const { x, y } = polar(cx, cy, r, t)
    parts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  parts.push('Z')
  return parts.join(' ')
}

/** Sharp burst star. */
function burstPath(points = 12, outer = 18, inner = 10.5, cx = 20, cy = 20) {
  const total = points * 2
  const parts: string[] = []
  for (let i = 0; i < total; i++) {
    const t = (i / total) * Math.PI * 2 - Math.PI / 2
    const r = i % 2 === 0 ? outer : inner
    const { x, y } = polar(cx, cy, r, t)
    parts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  parts.push('Z')
  return parts.join(' ')
}

/** Flower / multi-petal via overlapping circles. */
function petalCircles(count: number, orbit = 7.2, r = 8.2, cx = 20, cy = 20) {
  return Array.from({ length: count }, (_, i) => {
    const a = -Math.PI / 2 + (i / count) * Math.PI * 2
    const { x, y } = polar(cx, cy, orbit, a)
    return <circle key={i} cx={x} cy={y} r={r} />
  })
}

const PATHS: Partial<Record<LogoShape, string>> = {
  oval: 'M20 6.5 C28.5 6.5 34.5 12.2 34.5 20 C34.5 27.8 28.5 33.5 20 33.5 C11.5 33.5 5.5 27.8 5.5 20 C5.5 12.2 11.5 6.5 20 6.5 Z',
  pill: 'M12 11 H28 A9 9 0 0 1 28 29 H12 A9 9 0 0 1 12 11 Z',
  triangle: roundedPolygon(3, 17.2, 20, 21.5, -Math.PI / 2, 0.34),
  arrow:
    'M20 5.5 C22.2 5.5 30.5 16.8 32.2 20.2 C33.2 22.2 32.4 24.8 30.5 25.6 L23.2 28.6 C21.5 29.3 18.5 29.3 16.8 28.6 L9.5 25.6 C7.6 24.8 6.8 22.2 7.8 20.2 C9.5 16.8 17.8 5.5 20 5.5 Z',
  fan: 'M8 30.5 C8 14.5 18.5 7.5 31.5 9.5 C32.8 9.8 33.5 11.2 33 12.4 C28.5 22.5 24.5 27.8 12.8 32.2 C11.4 32.7 9.8 32 9.2 30.7 C8.5 29.5 8 30.5 8 30.5 Z',
  diamond: roundedPolygon(4, 16.8, 20, 20, 0, 0.3),
  clamshell:
    'M6.5 20 C6.5 14.2 10.2 10.5 15 9.2 L25 9.2 C29.8 10.5 33.5 14.2 33.5 20 C33.5 25.8 29.8 29.5 25 30.8 L15 30.8 C10.2 29.5 6.5 25.8 6.5 20 Z',
  pentagon: roundedPolygon(5, 16.8, 20, 20.4, -Math.PI / 2, 0.28),
  gem: roundedPolygon(6, 16.5, 20, 20, -Math.PI / 2, 0.26),
  'very-sunny': softStarPath(12, 17.8, 14.4),
  sunny: softStarPath(8, 17.8, 12.8),
  'cookie-4': scallopPath(4, 14.6, 3.6),
  'cookie-6': scallopPath(6, 15, 2.6),
  'cookie-7': scallopPath(7, 15, 2.4),
  'cookie-9': scallopPath(9, 15.1, 2.1),
  'cookie-11': scallopPath(11, 15.2, 1.85),
  'flower-8': '', // rendered via circles
  burst: burstPath(12, 18, 10.2),
  star: softStarPath(12, 17.8, 12.5),
}

export function LogoShapeGraphic({ shape }: { shape: LogoShape }): ReactNode {
  if (shape === 'clover') {
    return (
      <g fill="currentColor">
        <circle cx="20" cy="12.5" r="10.5" />
        <circle cx="27.5" cy="20" r="10.5" />
        <circle cx="20" cy="27.5" r="10.5" />
        <circle cx="12.5" cy="20" r="10.5" />
      </g>
    )
  }

  if (shape === 'flower-8') {
    return <g fill="currentColor">{petalCircles(8, 7.4, 8)}</g>
  }

  const transform =
    shape === 'oval' || shape === 'pill'
      ? 'rotate(-32 20 20)'
      : shape === 'fan'
        ? 'rotate(-8 20 20)'
        : undefined

  const d = PATHS[shape]
  if (!d) return null

  return (
    <g fill="currentColor" transform={transform}>
      <path d={d} />
    </g>
  )
}
