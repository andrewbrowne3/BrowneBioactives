import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Package, Building, User, CheckCircle } from 'lucide-react';
import { useDivision, productsFor } from '../data/divisions';
import type { SampleRequest } from '../types';
import { postLead } from '../api/client';

const SampleRequestPage = () => {
  const location = useLocation();
  const division = useDivision();
  const divisionProducts = productsFor(division.id);
  const preSelectedProductId = location.state?.productId;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SampleRequest>({
    defaultValues: {
      productIds: preSelectedProductId ? [preSelectedProductId] : []
    }
  });


  const onSubmit = async (data: SampleRequest) => {
    try {
      await postLead('sample', data as unknown as Record<string, unknown>);
      setIsSubmitted(true);
    } catch {
      alert('Sorry, something went wrong. Please email info@brownebioactives.com.');
    }
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Request Submitted Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your sample request. Our team will review your information and contact you within 24 hours.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            You should receive a confirmation email shortly with tracking information.
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
            <Package className="h-16 w-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Request Free Samples</h1>
            <p className="text-xl text-gray-600">
              Get samples of our premium active ingredients to test in your formulations
            </p>
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

            {/* Product Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <Package className="h-6 w-6 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Product Selection</h2>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">Select the products you'd like to receive samples of:</p>
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
                      <div className="ml-3">
                        <h4 className="font-semibold text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.chemicalName}</p>
                        <p className="text-xs text-primary-600 font-mono">{product.formula}</p>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.productIds && (
                  <p className="text-red-600 text-sm mt-1">{errors.productIds.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sample Quantity Needed
                  </label>
                  <select
                    {...register('quantity')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="1-10g">1-10g</option>
                    <option value="10-50g">10-50g</option>
                    <option value="50-100g">50-100g</option>
                    <option value="100g+">100g+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Annual Volume
                  </label>
                  <select
                    {...register('estimatedAnnualVolume')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select Volume</option>
                    <option value="<100kg">Less than 100kg</option>
                    <option value="100kg-1t">100kg - 1 tonne</option>
                    <option value="1-10t">1 - 10 tonnes</option>
                    <option value="10t+">10+ tonnes</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
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

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Message
                </label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Any specific requirements, questions, or additional information..."
                />
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
                {isSubmitting ? 'Submitting Request...' : 'Submit Sample Request'}
              </button>
              <p className="text-sm text-gray-600 mt-4">
                We'll process your request within 24 hours and contact you with sample availability.
              </p>
            </motion.div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SampleRequestPage;