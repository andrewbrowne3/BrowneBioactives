import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ShoppingCart, Building, User, Package, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { useDivision, productsFor } from '../data/divisions';
import type { BulkQuoteRequest } from '../types';

const BulkQuotePage = () => {
  const location = useLocation();
  const division = useDivision();
  const divisionProducts = productsFor(division.id);
  const preSelectedProductId = location.state?.productId;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<BulkQuoteRequest>({
    defaultValues: {
      productIds: preSelectedProductId ? [preSelectedProductId] : []
    }
  });


  const onSubmit = async (data: BulkQuoteRequest) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Bulk quote request submitted:', data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-lg mx-4 text-center"
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Quote Request Submitted!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your bulk quote request. Our sales team will prepare a detailed quote and contact you within 48 hours.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Reference ID: BQ{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Submit Another Request
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingCart className="h-16 w-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Request Bulk Quote</h1>
            <p className="text-xl text-gray-600">
              Get competitive pricing for large volume orders with custom terms
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center">
              <DollarSign className="h-8 w-8 text-green-500 mr-3" />
              <span className="text-gray-700">Volume Discounts Available</span>
            </div>
            <div className="flex items-center justify-center">
              <Clock className="h-8 w-8 text-blue-500 mr-3" />
              <span className="text-gray-700">Custom Delivery Schedules</span>
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-primary-500 mr-3" />
              <span className="text-gray-700">Quality Guarantees</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Company Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <Building className="h-6 w-6 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Company Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    {...register('companyName', { required: 'Company name is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your Company Ltd."
                  />
                  {errors.companyName && (
                    <p className="text-red-600 text-sm mt-1">{errors.companyName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Website
                  </label>
                  <input
                    type="url"
                    {...register('companyWebsite')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://www.company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry *
                  </label>
                  <select
                    {...register('industry', { required: 'Industry is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select Industry</option>
                    <option value="cosmetics">Cosmetics & Personal Care</option>
                    <option value="pharmaceutical">Pharmaceutical</option>
                    <option value="nutraceutical">Nutraceutical</option>
                    <option value="industrial">Industrial</option>
                    <option value="research">Research & Development</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.industry && (
                    <p className="text-red-600 text-sm mt-1">{errors.industry.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    {...register('country', { required: 'Country is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="United States"
                  />
                  {errors.country && (
                    <p className="text-red-600 text-sm mt-1">{errors.country.message}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <User className="h-6 w-6 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    {...register('contactName', { required: 'Contact name is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="John Smith"
                  />
                  {errors.contactName && (
                    <p className="text-red-600 text-sm mt-1">{errors.contactName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="john@company.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Product & Order Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <Package className="h-6 w-6 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-gray-600 mb-4">Select the products for your bulk order:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {divisionProducts.map((product) => (
                      <label
                        key={product.id}
                        className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={product.id}
                          {...register('productIds', { required: 'Please select at least one product' })}
                          className="mt-1 text-primary-600 focus:ring-primary-500"
                        />
                        <div className="ml-3 flex-1">
                          <h4 className="font-semibold text-gray-900">{product.name}</h4>
                          <p className="text-sm text-gray-600">{product.chemicalName}</p>
                          <p className="text-xs text-primary-600 font-mono">{product.formula}</p>
                          <p className="text-xs text-gray-500 mt-1">Min order: {product.minOrderQuantity}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.productIds && (
                    <p className="text-red-600 text-sm mt-1">{errors.productIds.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Order Quantity *
                    </label>
                    <select
                      {...register('quantity', { required: 'Quantity is required' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select Quantity</option>
                      <option value="25-100kg">25-100 kg</option>
                      <option value="100kg-1t">100kg - 1 tonne</option>
                      <option value="1-5t">1 - 5 tonnes</option>
                      <option value="5-10t">5 - 10 tonnes</option>
                      <option value="10t+">10+ tonnes</option>
                    </select>
                    {errors.quantity && (
                      <p className="text-red-600 text-sm mt-1">{errors.quantity.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Timeline *
                    </label>
                    <select
                      {...register('deliveryTimeline', { required: 'Delivery timeline is required' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select Timeline</option>
                      <option value="immediate">Immediate (1-2 weeks)</option>
                      <option value="1month">1 month</option>
                      <option value="3months">3 months</option>
                      <option value="6months">6 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                    {errors.deliveryTimeline && (
                      <p className="text-red-600 text-sm mt-1">{errors.deliveryTimeline.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Price Range (Optional)
                  </label>
                  <input
                    type="text"
                    {...register('targetPrice')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., $40-50/kg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Intended Application *
                  </label>
                  <textarea
                    {...register('application', { required: 'Application information is required' })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Describe how you plan to use these ingredients in your formulations..."
                  />
                  {errors.application && (
                    <p className="text-red-600 text-sm mt-1">{errors.application.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quality Requirements *
                  </label>
                  <textarea
                    {...register('qualityRequirements', { required: 'Quality requirements are required' })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Specify purity requirements, certifications needed, testing requirements, etc."
                  />
                  {errors.qualityRequirements && (
                    <p className="text-red-600 text-sm mt-1">{errors.qualityRequirements.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Requirements
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Any specific packaging, shipping, documentation, or payment terms..."
                  />
                </div>
              </div>
            </motion.div>

            {/* Submit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-lg"
              >
                {isSubmitting ? 'Submitting Request...' : 'Request Bulk Quote'}
              </button>
              <p className="text-sm text-gray-600 mt-4">
                Our sales team will prepare a detailed quote within 48 hours and contact you to discuss terms.
              </p>
            </motion.div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BulkQuotePage;