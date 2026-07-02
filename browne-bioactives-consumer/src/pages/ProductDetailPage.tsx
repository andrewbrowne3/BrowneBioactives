import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, CheckCircle, ArrowLeft, Package, Shield, Award } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link to="/shop" className="text-primary-600 hover:text-primary-700 font-semibold">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-primary-50 to-green-50 rounded-2xl p-12 flex items-center justify-center aspect-square">
                <div className="text-center">
                  <span className="text-9xl">💊</span>
                  <p className="text-sm text-gray-500 mt-4">Product image coming soon</p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                  <Shield className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-gray-900">Third-Party Tested</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                  <Award className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-gray-900">Premium Quality</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                  <Package className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-gray-900">Fast Shipping</p>
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold capitalize mb-4">
                  {product.category}
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <p className="text-xl text-gray-700 mb-6">{product.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                  {product.compareAtPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through ml-3">
                        ${product.compareAtPrice}
                      </span>
                      <span className="ml-3 text-green-600 font-semibold">
                        Save ${(product.compareAtPrice - product.price).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Quantity</label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center ${
                    product.inStock
                      ? addedToCart
                        ? 'bg-green-600 text-white'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <CheckCircle className="h-6 w-6 mr-2" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-6 w-6 mr-2" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </>
                  )}
                </button>

                {addedToCart && (
                  <Link
                    to="/cart"
                    className="block w-full mt-3 py-3 text-center border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
                  >
                    View Cart
                  </Link>
                )}

                {/* Serving Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Serving Size</p>
                      <p className="font-semibold text-gray-900">{product.servingSize}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Servings Per Container</p>
                      <p className="font-semibold text-gray-900">{product.servingsPerContainer}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Detailed Information */}
          <div className="grid lg:grid-cols-3 gap-8 mt-12">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Benefits</h3>
              <ul className="space-y-3">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Ingredients */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h3>
              <ul className="space-y-2">
                {product.ingredients.map((ingredient, i) => (
                  <li key={i} className="text-gray-700 text-sm">
                    • {ingredient}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Usage & Warnings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Usage & Safety</h3>
              <div className="mb-4">
                <p className="font-semibold text-gray-900 text-sm mb-1">Suggested Use:</p>
                <p className="text-gray-700 text-sm">{product.usage}</p>
              </div>
              {product.warnings && (
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">Warnings:</p>
                  <p className="text-gray-700 text-sm">{product.warnings}</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Long Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 bg-white rounded-xl p-8 shadow-md"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Product</h3>
            <p className="text-gray-700 leading-relaxed">{product.longDescription}</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
