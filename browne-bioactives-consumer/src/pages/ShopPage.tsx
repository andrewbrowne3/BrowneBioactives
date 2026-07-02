import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { Filter, CheckCircle } from 'lucide-react';

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'longevity', name: 'Longevity' },
    { id: 'cognitive', name: 'Cognitive' },
    { id: 'performance', name: 'Performance' },
    { id: 'immune', name: 'Immune' },
    { id: 'energy', name: 'Energy' },
    { id: 'recovery', name: 'Recovery' },
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Shop Premium Supplements</h1>
            <p className="text-xl text-white/90">
              Science-backed formulations for optimal health and performance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white py-6 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mb-3">
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="font-semibold text-gray-700">Filter by Category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="bg-gradient-to-br from-primary-50 to-green-50 p-6 text-center">
                  <div className="bg-white rounded-lg p-4 inline-block mb-3">
                    <span className="text-4xl">💊</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold capitalize">
                    {product.category}
                  </span>
                </div>

                <div className="p-6">
                  <p className="text-gray-700 mb-4 line-clamp-2">{product.description}</p>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-900 mb-2">Key Benefits:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {product.benefits.slice(0, 3).map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-3 w-3 text-primary-500 mt-0.5 mr-1 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${product.compareAtPrice}
                        </span>
                      )}
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
