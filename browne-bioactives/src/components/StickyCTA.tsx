import { Link } from 'react-router-dom';
import { Beaker } from 'lucide-react';
import { useDivision } from '../data/divisions';

// Fixed "Request a Sample" button (bottom-left; chat widget sits bottom-right).
export default function StickyCTA() {
  const { base } = useDivision();
  return (
    <Link
      to={`${base}/sample-request`}
      className="fixed left-5 bottom-5 z-[999] bg-primary-600 hover:bg-primary-700 text-white font-semibold px-5 py-3 rounded-full shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
    >
      <Beaker size={18} /> Request a Sample
    </Link>
  );
}
