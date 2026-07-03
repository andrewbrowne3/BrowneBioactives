import { motion, useReducedMotion } from 'framer-motion';

// Ambient hero decoration: a stylized GHK-Cu (Copper Tripeptide) ball-and-stick
// that gently breaks apart and reforms on a loop. Pure SVG + framer-motion, no
// new dependencies. Decorative only (aria-hidden, pointer-events-none).

const CENTER = { x: 240, y: 200 };

// Assembled atom positions. One warm copper "Cu" center coordinated by a
// peptide-ish cage of blue atoms drawn from the site's primary sky palette.
const ATOMS = [
  { x: 240, y: 200, r: 17, color: '#c77b30', glow: true }, // 0  Cu (copper accent)
  { x: 176, y: 150, r: 12, color: '#0284c7' },             // 1  N
  { x: 146, y: 212, r: 10, color: '#38bdf8' },             // 2  C
  { x: 184, y: 268, r: 9,  color: '#7dd3fc' },             // 3  O
  { x: 304, y: 152, r: 12, color: '#0369a1' },             // 4  N
  { x: 336, y: 214, r: 10, color: '#38bdf8' },             // 5  C
  { x: 298, y: 270, r: 9,  color: '#7dd3fc' },             // 6  O
  { x: 240, y: 116, r: 11, color: '#0ea5e9' },             // 7  C
  { x: 240, y: 286, r: 12, color: '#0c4a6e' },             // 8  N
];

const BONDS: [number, number][] = [
  [0, 1], [0, 4], [0, 7], [0, 8], // copper coordination
  [1, 2], [2, 3],                 // left residue chain
  [4, 5], [5, 6],                 // right residue chain
  [7, 1], [7, 4],                 // top carbon bridges
  [8, 3], [8, 6],                 // bottom nitrogen bridges
];

// How far each atom drifts outward from the center at the "broken apart" peak.
const DRIFT = 0.55;
const drifted = (x: number, y: number) => ({
  x: x + (x - CENTER.x) * DRIFT,
  y: y + (y - CENTER.y) * DRIFT,
});

interface Props {
  className?: string;
}

export default function MoleculeAnimation({ className }: Props) {
  const reduce = useReducedMotion();

  return (
    <svg
      className={className}
      viewBox="0 0 480 400"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id="mol-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Subtle whole-molecule breathing/drift for a touch of life */}
      <motion.g
        animate={reduce ? undefined : { rotate: [0, 4, 0, -4, 0] }}
        transition={reduce ? undefined : { duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: '240px', originY: '200px' }}
      >
        {/* Bonds fade out as the atoms separate, back in as they reform */}
        {BONDS.map(([a, b], i) => {
          const A = ATOMS[a];
          const B = ATOMS[b];
          return (
            <motion.line
              key={`bond-${i}`}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke="#38bdf8"
              strokeWidth={2.5}
              strokeLinecap="round"
              initial={false}
              animate={reduce ? { opacity: 0.55 } : { opacity: [0.55, 0, 0.55] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 5.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.5, 1] }
              }
            />
          );
        })}

        {/* Atoms drift outward and back on a staggered loop */}
        {ATOMS.map((atom, i) => {
          const d = drifted(atom.x, atom.y);
          return (
            <motion.circle
              key={`atom-${i}`}
              r={atom.r}
              fill={atom.color}
              filter={atom.glow ? 'url(#mol-glow)' : undefined}
              initial={false}
              animate={
                reduce
                  ? { cx: atom.x, cy: atom.y }
                  : { cx: [atom.x, d.x, atom.x], cy: [atom.y, d.y, atom.y] }
              }
              transition={
                reduce
                  ? undefined
                  : {
                      duration: 5.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.12,
                      times: [0, 0.5, 1],
                    }
              }
            />
          );
        })}
      </motion.g>
    </svg>
  );
}
