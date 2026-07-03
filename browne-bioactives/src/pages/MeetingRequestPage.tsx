import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Calendar, CheckCircle, Video, Send } from 'lucide-react';
import { postLead } from '../api/client';

interface MeetingForm {
  contactName: string;
  email: string;
  company?: string;
  preferredTime?: string;
  message?: string;
}

const MeetingRequestPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<MeetingForm>();

  const onSubmit = async (data: MeetingForm) => {
    setError('');
    try {
      await postLead('meeting', data as unknown as Record<string, unknown>);
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please email abrowne@brownebioactives.com and we’ll set it up.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-lg text-center"
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Thanks, we’ll be in touch!</h1>
          <p className="text-gray-600">
            We’ll email you shortly to lock in a time and send a Teams meeting invite.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Video className="h-4 w-4" /> Set up a quick Teams call
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Request a Meeting</h1>
            <p className="text-xl text-gray-600">
              Tell us a bit about what you’re working on and we’ll set up a short call, or just leave
              your email and we’ll reach out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  {...register('contactName', { required: 'Name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Your name"
                />
                {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Invalid email' },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="you@company.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  {...register('company')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Company (optional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred day/time</label>
                <input
                  {...register('preferredTime')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="e.g. Tue or Wed afternoon EST"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">What would you like to discuss?</label>
              <textarea
                {...register('message')}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="Which ingredient, your application, volumes, timeline… (optional)"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg disabled:opacity-60"
            >
              {isSubmitting ? 'Sending…' : (<><Calendar className="h-5 w-5" /> Request Meeting <Send className="h-4 w-4" /></>)}
            </motion.button>

            <p className="text-center text-sm text-gray-500">
              Prefer email? Reach us at{' '}
              <a href="mailto:abrowne@brownebioactives.com" className="text-primary-600">abrowne@brownebioactives.com</a>.
            </p>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default MeetingRequestPage;
