import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Award, Microscope, Users, ChevronRight, Beaker, CheckCircle } from 'lucide-react';
import { useDivision, productsFor } from '../data/divisions';
import QuickInquiry from '../components/QuickInquiry';
import MoleculeAnimation from '../components/MoleculeAnimation';

const statIcons = [Shield, Award, Microscope, Users];

const HomePage = () => {
  const division = useDivision();
  const base = division.base;
  const featuredProducts = productsFor(division.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-white py-20 lg:py-32">
        {division.id === 'cosmetics' && (
          <MoleculeAnimation className="pointer-events-none absolute inset-y-0 right-0 h-full w-[110%] sm:w-3/4 lg:w-1/2 opacity-[0.18] lg:opacity-25" />
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                {division.hero.lead}
                {division.hero.highlight && (
                  <span className="text-primary-600"> {division.hero.highlight}</span>
                )}
              </h1>
              <p className="text-xl text-gray-600 mb-8">{division.hero.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={`${base}/products`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg"
                >
                  {division.id === 'research' ? 'Browse Catalog' : 'Browse Products'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to={`${base}/sample-request`}
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-semibold text-lg"
                >
                  Request Samples
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Browne Bioactives?</h3>
                <ul className="space-y-4">
                  {division.why.map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      {division.stats.length > 0 && (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {division.stats.map((stat, index) => {
              const Icon = statIcons[index % statIcons.length];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <Icon className="h-12 w-12 text-primary-600 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {division.id === 'research' ? 'Featured Reagents' : 'Featured Products'}
            </h2>
            <p className="text-xl text-gray-600">
              {division.id === 'research'
                ? 'Validated antibodies and proteins for your next experiment'
                : 'Made-in-the-USA active ingredients for your formulations'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold capitalize">
                      {product.category.replace('-', ' ')}
                    </span>
                    <Beaker className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  {division.id === 'cosmetics' && product.inci ? (
                    <p className="text-gray-600 mb-4 text-sm">INCI: {product.inci}</p>
                  ) : (
                    <p className="text-gray-600 mb-4 text-sm">{division.labels.formula}: {product.formula}</p>
                  )}
                  <p className="text-gray-700 mb-4 line-clamp-3">{product.description}</p>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Key Applications:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {product.applications.slice(0, 3).map((app, i) => (
                        <li key={i} className="flex items-start">
                          <ChevronRight className="h-4 w-4 text-primary-500 mt-0.5 mr-1 flex-shrink-0" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-end items-center">
                    <Link
                      to={`${base}/products/${product.id}`}
                      className="text-primary-600 hover:text-primary-700 font-semibold text-sm inline-flex items-center"
                    >
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to={`${base}/products`}
              className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              {division.id === 'research' ? 'View Full Catalog' : 'View All Products'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick inquiry - easy lead capture (cosmetics) */}
      {division.id === 'cosmetics' && <QuickInquiry />}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            {division.id === 'research' ? 'Ready to Accelerate Your Research?' : 'Ready to Elevate Your Formulations?'}
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Request a free sample, or set up a quick call with our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={`${base}/sample-request`}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              Request Samples
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to={`${base}/meeting-request`}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-600 transition-colors font-semibold text-lg"
            >
              Request a Meeting
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
