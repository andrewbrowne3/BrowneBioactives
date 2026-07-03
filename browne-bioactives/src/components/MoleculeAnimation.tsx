import { motion, useReducedMotion } from 'framer-motion';

// Ambient hero decoration: the actual GHK-Cu (Copper Tripeptide) skeletal
// structure -- Glycine-Histidine-Lysine with copper coordination. On a loop it
// splits at the two peptide bonds into its three amino acids plus copper, then
// reassembles. Pure SVG + framer-motion, no new deps. Decorative (aria-hidden).

const BOND = '#0369a1';   // primary-700, skeletal bonds
const N_COL = '#0284c7';  // primary-600, nitrogen
const O_COL = '#0ea5e9';  // primary-500, oxygen
const CU_COL = '#c77b30'; // warm copper accent

const LOOP = { duration: 6, repeat: Infinity, ease: 'easeInOut' as const, times: [0, 0.5, 1] };

interface LineProps {
  x1: number; y1: number; x2: number; y2: number; double?: boolean;
}

// A skeletal bond; `double` draws a parallel second stroke (C=O, aromatic).
function Bond({ x1, y1, x2, y2, double }: LineProps) {
  if (!double) {
    return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={BOND} strokeWidth={2.4} strokeLinecap="round" />;
  }
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
  const ox = (-dy / L) * 3.2, oy = (dx / L) * 3.2;
  // shorten the inner line slightly, as skeletal drawings do
  const sx1 = x1 + dx * 0.14, sy1 = y1 + dy * 0.14;
  const sx2 = x2 - dx * 0.14, sy2 = y2 - dy * 0.14;
  return (
    <g stroke={BOND} strokeWidth={2.4} strokeLinecap="round">
      <line x1={x1 + ox} y1={y1 + oy} x2={x2 + ox} y2={y2 + oy} />
      <line x1={sx1 - ox} y1={sy1 - oy} x2={sx2 - ox} y2={sy2 - oy} />
    </g>
  );
}

function Atom({ x, y, label, fill }: { x: number; y: number; label: string; fill: string }) {
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      fontSize={15}
      fontWeight={700}
      textAnchor="middle"
      dominantBaseline="central"
    >
      {label}
    </text>
  );
}

interface Props {
  className?: string;
}

export default function MoleculeAnimation({ className }: Props) {
  const reduce = useReducedMotion();

  // Break-apart drift per fragment (translate at the loop's midpoint).
  const drift = (dx: number, dy: number, delay = 0) =>
    reduce
      ? undefined
      : { animate: { x: [0, dx, 0], y: [0, dy, 0] }, transition: { ...LOOP, delay } };

  const fade = reduce
    ? { opacity: 0.9 }
    : { animate: { opacity: [0.9, 0, 0.9] }, transition: LOOP };

  return (
    <svg
      className={className}
      viewBox="0 0 400 360"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      {/* ---- Bonds broken during the split (peptide + copper coordination) ---- */}
      {/* Peptide bond Gly C=O -> His N */}
      <motion.line
        x1={130} y1={175} x2={160} y2={205} stroke={BOND} strokeWidth={2.4} strokeLinecap="round"
        initial={false} {...fade}
      />
      {/* Peptide bond His C=O -> Lys N */}
      <motion.line
        x1={220} y1={205} x2={250} y2={175} stroke={BOND} strokeWidth={2.4} strokeLinecap="round"
        initial={false} {...fade}
      />
      {/* Copper coordination (dashed): Cu to N-term amine, amide N, imidazole N */}
      <motion.g
        stroke={CU_COL} strokeWidth={1.8} strokeDasharray="4 4" initial={false} {...fade}
      >
        <line x1={135} y1={150} x2={70} y2={175} />
        <line x1={135} y1={150} x2={160} y2={205} />
        <line x1={135} y1={150} x2={168} y2={112} />
      </motion.g>

      {/* ---- Glycine fragment (drifts up-left) ---- */}
      <motion.g initial={false} {...drift(-52, -26, 0)}>
        <Bond x1={70} y1={175} x2={100} y2={205} />
        <Bond x1={100} y1={205} x2={130} y2={175} />
        <Bond x1={130} y1={175} x2={130} y2={145} double />
        <Atom x={62} y={170} label="H₂N" fill={N_COL} />
        <Atom x={130} y={139} label="O" fill={O_COL} />
      </motion.g>

      {/* ---- Copper (drifts down-left) ---- */}
      <motion.g initial={false} {...drift(-44, 34, 0.15)}>
        <circle cx={135} cy={150} r={13} fill={CU_COL} opacity={0.22} />
        <Atom x={135} y={150} label="Cu" fill={CU_COL} />
      </motion.g>

      {/* ---- Histidine fragment (stays ~center) ---- */}
      <motion.g initial={false} {...drift(4, -6, 0.1)}>
        <Bond x1={160} y1={205} x2={190} y2={175} />
        <Bond x1={190} y1={175} x2={220} y2={205} />
        <Bond x1={220} y1={205} x2={220} y2={237} double />
        {/* side chain up to imidazole ring */}
        <Bond x1={190} y1={175} x2={190} y2={148} />
        <Bond x1={190} y1={148} x2={190} y2={124} />
        {/* imidazole ring (Cγ, Nδ1, Cε1, Nε2, Cδ2) */}
        <Bond x1={190} y1={124} x2={168} y2={112} />
        <Bond x1={168} y1={112} x2={176} y2={86} double />
        <Bond x1={176} y1={86} x2={204} y2={86} />
        <Bond x1={204} y1={86} x2={213} y2={112} double />
        <Bond x1={213} y1={112} x2={190} y2={124} />
        <Atom x={152} y={208} label="N" fill={N_COL} />
        <Atom x={220} y={243} label="O" fill={O_COL} />
        <Atom x={162} y={112} label="N" fill={N_COL} />
        <Atom x={210} y={86} label="N" fill={N_COL} />
      </motion.g>

      {/* ---- Lysine fragment (drifts down-right) ---- */}
      <motion.g initial={false} {...drift(56, 28, 0.05)}>
        <Bond x1={250} y1={175} x2={280} y2={205} />
        <Bond x1={280} y1={205} x2={310} y2={175} />
        <Bond x1={310} y1={175} x2={310} y2={145} double />
        <Bond x1={310} y1={175} x2={340} y2={205} />
        {/* lysine side chain: (CH2)4 - NH2 */}
        <Bond x1={280} y1={205} x2={280} y2={237} />
        <Bond x1={280} y1={237} x2={306} y2={252} />
        <Bond x1={306} y1={252} x2={306} y2={282} />
        <Bond x1={306} y1={282} x2={332} y2={297} />
        <Bond x1={332} y1={297} x2={332} y2={327} />
        <Atom x={242} y={172} label="N" fill={N_COL} />
        <Atom x={310} y={139} label="O" fill={O_COL} />
        <Atom x={350} y={208} label="OH" fill={O_COL} />
        <Atom x={340} y={332} label="NH₂" fill={N_COL} />
      </motion.g>
    </svg>
  );
}
