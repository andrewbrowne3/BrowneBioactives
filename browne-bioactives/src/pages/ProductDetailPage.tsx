import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Beaker, CheckCircle, ShoppingCart, Package } from 'lucide-react';
import { products } from '../data/products';
import { useDivision } from '../data/divisions';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const division = useDivision();
  const base = division.base;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link to={`${base}/products`} className="text-primary-600 hover:text-primary-700">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <section className="bg-white py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-gray-600">
            <Link to={base} className="hover:text-primary-600">Home</Link>
            <span className="mx-2">›</span>
            <Link to={`${base}/products`} className="hover:text-primary-600">
              {division.id === 'research' ? 'Catalog' : 'Products'}
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to={`${base}/products`}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {division.id === 'research' ? 'Catalog' : 'Products'}
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold capitalize">
                      {product.category.replace('-', ' ')}
                    </span>
                    <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">{product.name}</h1>
                    <p className="text-lg text-gray-600">{product.chemicalName}</p>
                  </div>
                  <Beaker className="h-16 w-16 text-primary-600" />
                </div>

                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {division.id === 'research' ? 'Product Information' : 'Chemical Information'}
                    </h3>
                    <ul className="space-y-2">
                      <li><span className="font-medium">{division.labels.formula}:</span> <span className="font-mono text-primary-600">{product.formula}</span></li>
                      <li><span className="font-medium">{division.labels.cas}:</span> {product.casNumber}</li>
                      <li><span className="font-medium">Molecular Weight:</span> {product.specifications.molecularWeight}</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {division.id === 'research' ? 'Format & Storage' : 'Physical Properties'}
                    </h3>
                    <ul className="space-y-2">
                      <li><span className="font-medium">Purity:</span> {product.specifications.purity}</li>
                      <li><span className="font-medium">Appearance:</span> {product.specifications.appearance}</li>
                      <li><span className="font-medium">Solubility:</span> {product.specifications.solubility}</li>
                    </ul>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                {/* Applications */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Applications</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {product.applications.map((app, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-700">{app}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h3>
                  <div className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{division.labels.pricing}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Quantity</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Price Range</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {product.bulkPricing.map((tier, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-sm text-gray-700">{tier.quantity}</td>
                            <td className="px-4 py-3 text-sm text-primary-600 font-semibold">{tier.priceRange}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {division.labels.minOrder}: <span className="font-semibold">{product.minOrderQuantity}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Action Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Get Started</h3>
                <div className="space-y-4">
                  <Link
                    to={`${base}/sample-request`}
                    state={{ productId: product.id }}
                    className="w-full inline-flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                  >
                    <Package className="h-5 w-5 mr-2" />
                    Request Sample
                  </Link>
                  <Link
                    to={`${base}/bulk-quote`}
                    state={{ productId: product.id }}
                    className="w-full inline-flex items-center justify-center px-4 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Get Bulk Quote
                  </Link>
                </div>
              </div>

              {/* Documentation */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Documentation</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-gray-700">{division.id === 'research' ? 'Datasheet' : 'Technical Data Sheet'}</span>
                    <Download className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-gray-700">Safety Data Sheet</span>
                    <Download className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-gray-700">Certificate of Analysis</span>
                    <Download className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Technical Support?</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Our team of PhD {division.id === 'research' ? 'scientists' : 'chemists'} is here to help with
                  {division.id === 'research' ? ' assay design and validation questions.' : ' formulation questions and technical guidance.'}
                </p>
                <Link
                  to={`${base}/contact`}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold text-sm"
                >
                  Contact Technical Team
                  <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
