import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle } from 'lucide-react';
import { postLead } from '../api/client';

interface QuickForm {
  name: string;
  email: string;
  interest: string;
}

// Compact, dead-simple "reach out" form for the cosmetics home/products pages.
export default function QuickInquiry() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<QuickForm>();

  const onSubmit = async (data: QuickForm) => {
    setError('');
    try {
      await postLead('quick', { ...data, inquiryType: 'quick' });
      setSent(true);
      reset();
    } catch {
      setError('Something went wrong. Please email abrowne@brownebioactives.com.');
    }
  };

  return (
    <section className="bg-primary-600 py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Want samples or a quote?</h2>
        <p className="text-primary-100 mb-6">Tell us what you're formulating and we'll reach out fast.</p>

        {sent ? (
          <div className="bg-white rounded-xl p-6 inline-flex items-center gap-3 text-left">
            <CheckCircle className="text-green-600 h-8 w-8 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">Got it — thank you!</p>
              <p className="text-gray-600 text-sm">Our team will be in touch shortly.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 text-left">
              <input
                {...register('name', { required: 'Name required' })}
                placeholder="Your name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div className="flex-1 text-left">
              <input
                {...register('email', { required: 'Email required', pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Invalid email' } })}
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div className="flex-[1.5] text-left">
              <input
                {...register('interest')}
                placeholder="What are you looking for? (optional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-5 py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Send size={16} /> {isSubmitting ? 'Sending…' : 'Send'}
            </button>
          </form>
        )}
        {error && <p className="text-white text-sm mt-3">{error}</p>}
      </div>
    </section>
  );
}
