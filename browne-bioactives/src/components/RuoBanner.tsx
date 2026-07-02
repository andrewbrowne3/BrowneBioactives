import { AlertTriangle } from 'lucide-react';
import { useDivision } from '../data/divisions';

// Persistent compliance notice - only renders on the research (RUO) site.
const RuoBanner = () => {
  const division = useDivision();
  if (!division.ruo) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-2 text-center">
        <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0" />
        <p className="text-xs sm:text-sm text-amber-800">
          <span className="font-semibold">For Research Use Only (RUO).</span> Not for use in diagnostic
          or therapeutic procedures, or for human or animal consumption.
        </p>
      </div>
    </div>
  );
};

export default RuoBanner;
