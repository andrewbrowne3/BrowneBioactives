import { motion } from 'framer-motion';
import { Heart, Award, Beaker, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Two brothers united by a passion for health, science, and helping people live their best lives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brothers Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl shadow-lg">
                <Beaker className="h-12 w-12 text-primary-600 mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Dr. Andrew Browne</h2>
                <h3 className="text-xl text-primary-600 font-semibold mb-4">PhD in Biochemistry</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Andrew's journey into the world of bioactive compounds began in the laboratory, where his doctorate
                  research focused on molecular mechanisms of health and disease. His passion for biochemistry isn't
                  just academic - it's deeply personal.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  "I fell in love with the idea that we could extract and synthesize nature's most powerful compounds
                  to help people improve their quality of life," Andrew explains. "Every synthesis, every extraction
                  is an opportunity to create something that can make a real difference in someone's health journey."
                </p>
                <p className="text-gray-700 leading-relaxed">
                  With years of experience in pharmaceutical-grade synthesis and extraction, Andrew ensures that
                  every Browne Bioactives product meets the highest standards of purity and potency. His expertise
                  in quality control and molecular analysis means customers can trust they're getting exactly what's
                  on the label - nothing more, nothing less.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-lg">
                <Heart className="h-12 w-12 text-green-600 mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Derek Browne</h2>
                <h3 className="text-xl text-green-600 font-semibold mb-4">Fitness Expert & Financial Strategist</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Derek's passion for health and fitness has been a lifelong calling. As a certified fitness professional
                  and nutrition enthusiast, he's spent years helping people transform their bodies and minds through
                  proper training, nutrition, and supplementation.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  "I've seen firsthand how the right supplements can amplify someone's results and help them break
                  through plateaus," Derek says. "But I was frustrated by the lack of transparency in the industry - 
                  underdosed products, proprietary blends, and misleading marketing. I knew we could do better."
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Beyond his fitness expertise, Derek brings sharp financial acumen to Browne Bioactives. His
                  understanding of business and economics ensures the company operates efficiently, keeping costs
                  down without compromising quality. This means premium supplements at fair prices - no inflated
                  markups, no unnecessary middlemen.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Vision Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary-600 to-green-600 text-white p-12 rounded-2xl shadow-xl"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Our Shared Vision</h2>
            <p className="text-lg text-white/90 leading-relaxed mb-6 max-w-4xl mx-auto">
              Browne Bioactives was born from late-night conversations between two brothers who saw a gap in the
              supplement industry. Andrew's scientific expertise and Derek's fitness knowledge combined to create
              something special: a company that prioritizes quality, transparency, and real results over marketing hype.
            </p>
            <p className="text-lg text-white/90 leading-relaxed max-w-4xl mx-auto">
              "We're not just selling supplements," the brothers explain. "We're on a mission to help people optimize
              their health with products we'd give to our own families. Every ingredient is carefully sourced, every
              batch is third-party tested, and every claim is backed by science. That's the Browne Bioactives promise."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <Beaker className="h-10 w-10 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Science-First</h3>
              <p className="text-gray-600">
                Every ingredient and dosage is backed by peer-reviewed research. We formulate based on science,
                not trends.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <Award className="h-10 w-10 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Obsessed</h3>
              <p className="text-gray-600">
                Third-party testing, pharmaceutical-grade ingredients, and GMP-certified manufacturing. No shortcuts.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <Users className="h-10 w-10 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Radically Transparent</h3>
              <p className="text-gray-600">
                Full disclosure of all ingredients, dosages, and sourcing. No proprietary blends, no hidden fillers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <Heart className="h-10 w-10 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer-Centric</h3>
              <p className="text-gray-600">
                We're here to support your health journey with education, guidance, and supplements that actually work.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Join the Browne Bioactives Family
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Experience the difference that science, quality, and genuine care can make in your health journey.
            </p>
            <a
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg shadow-lg"
            >
              Shop Our Products
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
