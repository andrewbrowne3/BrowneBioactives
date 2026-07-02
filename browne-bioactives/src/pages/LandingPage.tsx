import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FlaskConical, ArrowRight, Beaker, Dna, ShieldCheck } from 'lucide-react';

const divisions = [
  {
    to: '/cosmetics',
    icon: Beaker,
    eyebrow: 'For Formulators & Manufacturers',
    title: 'Cosmetic & Pharmaceutical Ingredients',
    description:
      'Bulk high-purity active ingredients - UV filters, peptides, hyaluronic acid and more - with volume pricing, samples, and PhD formulation support.',
    cta: 'Enter Ingredients Store'
  },
  {
    to: '/research',
    icon: Dna,
    eyebrow: 'For Research Use Only (RUO)',
    title: 'Research Reagents',
    description:
      'Validated antibodies, recombinant proteins and assay kits for life-science research, including anti-p24 and recombinant HIV-1 p24. Lot-traceable with datasheets and COA.',
    cta: 'Enter Research Catalog'
  }
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex flex-col">
      <header className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-3">
          <FlaskConical className="h-10 w-10 text-primary-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">Browne Bioactives</h1>
            <p className="text-xs text-gray-600">Science-led active ingredients & research reagents</p>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Two divisions. <span className="text-primary-600">One standard of purity.</span>
            </h2>
            <p className="text-xl text-gray-600">
              Choose the catalog that fits your work - bulk ingredients for formulation, or research-grade
              reagents for the lab.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {divisions.map((d, i) => (
              <motion.div
                key={d.to}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              >
                <Link
                  to={d.to}
                  className="group block h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border border-gray-100 hover:border-primary-200"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-14 w-14 rounded-xl bg-primary-100 flex items-center justify-center">
                      <d.icon className="h-8 w-8 text-primary-600" />
                    </div>
                    <ArrowRight className="h-6 w-6 text-gray-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">
                    {d.eyebrow}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{d.title}</h3>
                  <p className="text-gray-600 mb-6">{d.description}</p>
                  <span className="inline-flex items-center font-semibold text-primary-600">
                    {d.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-12">
            <ShieldCheck className="h-4 w-4 text-primary-500" />
            Founded by Dr. Andrew Browne, PhD - 99%+ purity across every product line.
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Browne Bioactives. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
