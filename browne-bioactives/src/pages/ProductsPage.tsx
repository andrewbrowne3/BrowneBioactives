import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Beaker, ArrowRight, X } from 'lucide-react';
import { useDivision, productsFor } from '../data/divisions';
import type { Product } from '../types';

const ProductsPage = () => {
  const division = useDivision();
  const base = division.base;
  const divisionProducts = useMemo(() => productsFor(division.id), [division.id]);

  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = division.categories;

  const filteredProducts: Product[] = useMemo(() => {
    let filtered = divisionProducts;
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.chemicalName.toLowerCase().includes(q) ||
          p.formula.toLowerCase().includes(q) ||
          p.applications.some((app) => app.toLowerCase().includes(q))
      );
    }
    return filtered;
  }, [divisionProducts, selectedCategory, searchTerm]);

  // Reset the category filter when switching between divisions.
  useEffect(() => {
    setSelectedCategory(categoryParam || 'all');
  }, [categoryParam, division.id]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {division.id === 'research' ? 'Research Catalog' : 'Our Products'}
          </h1>
          <p className="text-xl text-gray-600">
            {division.id === 'research'
              ? 'Validated antibodies, recombinant proteins, and assay kits - For Research Use Only'
              : 'Premium active ingredients for cosmetic, pharmaceutical, and nutraceutical applications'}
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, target, or application..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Desktop Category Filters */}
            <div className="hidden lg:flex items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === cat.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg font-medium"
            >
              <Filter className="h-5 w-5" />
              Filters
            </button>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="lg:hidden mt-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-900">Categories</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => {
                      setSelectedCategory(cat.value);
                      setShowFilters(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat.value
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Beaker className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-gray-600">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold capitalize">
                          {product.category.replace('-', ' ')}
                        </span>
                        <span className="text-xs text-gray-500">{division.labels.casShort}: {product.casNumber}</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{product.chemicalName}</p>
                      <p className="text-sm font-mono text-primary-600 mb-4">{division.labels.formula}: {product.formula}</p>

                      <p className="text-gray-700 mb-4 line-clamp-2">{product.description}</p>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-900 mb-2">Specifications:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>Purity: {product.specifications.purity}</li>
                          <li>Appearance: {product.specifications.appearance}</li>
                        </ul>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-gray-500">{division.labels.minOrder}: {product.minOrderQuantity}</span>
                          <span className="text-sm font-semibold text-primary-600">
                            {product.bulkPricing[0].priceRange}
                          </span>
                        </div>
                        <Link
                          to={`${base}/products/${product.id}`}
                          className="w-full inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                        >
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-gray-600 mb-6">
            {division.id === 'research'
              ? 'We offer custom antibody production and recombinant protein expression for your targets.'
              : 'We offer custom synthesis and can source specific ingredients for your needs.'}
          </p>
          <Link
            to={`${base}/contact`}
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
          >
            Contact Our Team
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
