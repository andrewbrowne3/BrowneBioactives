import { motion } from 'framer-motion';
import { GraduationCap, Clock, Search, Factory, Flag, FlaskConical, ShieldCheck, Truck } from 'lucide-react';
import { useDivision } from '../data/divisions';

const AboutPage = () => {
  const { base, ruo } = useDivision();

  // One line tuned to whichever division the visitor is browsing
  const divisionLine = ruo
    ? 'For the research side, that means antibodies, recombinant proteins, and assay kits made and validated here, shipped with lot-specific datasheets and a real certificate of analysis. Not drop-shipped from halfway around the planet with a sticker on the box.'
    : 'For the ingredient side, that means peptides and cosmetic actives synthesized here, characterized here, and documented here. Formulators get consistent lots and a straight answer about where their material actually came from.';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Flag className="h-4 w-4" />
              Bringing biochemical manufacturing back to the United States
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              We got tired of waiting on a box from overseas
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              So we started making the stuff here instead.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The origin story */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl p-8 h-96 flex items-center justify-center sticky top-24">
                <div className="text-center">
                  <GraduationCap className="h-24 w-24 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Dr. Andrew Browne</h3>
                  <p className="text-primary-600 font-semibold">PhD, Chemistry</p>
                  <p className="text-gray-600 mt-2">Founder &amp; Chief Science Officer</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How this started</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  Picture a grad student in a lab coat, refreshing a tracking page. That was me
                  during my PhD. Half my experiments lived or died on a single antibody or protein,
                  and half of those seemed to be crossing an ocean on a slow boat.
                </p>
                <p>
                  Weeks of waiting. Freeze-thaw roulette in transit. A vial finally lands, the lot
                  is a little different from last time, and there goes your afternoon (and sometimes
                  your whole month) chasing a result that never should have wobbled in the first place.
                </p>
                <p>
                  Turns out I was not special. I started comparing notes with other chemists and
                  everyone had the same horror story. So I did some digging into where our reagents
                  actually come from, and the answer was almost funny.
                </p>
                <p className="font-semibold text-gray-900">
                  A huge chunk of American biochemical &ldquo;manufacturing&rdquo; is really just
                  glorified middlemen. Product is made abroad, imported, relabeled, marked up, and
                  sold back to us as domestic. You wait longer, pay more, and never quite know what
                  you are holding.
                </p>
                <p>
                  Browne Bioactives is the boring, obvious fix. Make it here. Test it here. Put our
                  name on it and stand behind the lot. No mystery supply chain, no month-long wait,
                  no telephone game between you and the bench that made your material.
                </p>
                <p>{divisionLine}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The problem, in three beats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The old way, in three acts</h2>
            <p className="text-xl text-gray-600">Why so much &ldquo;domestic&rdquo; supply is anything but</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-8 text-center shadow-lg"
            >
              <Clock className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">You wait</h3>
              <p className="text-gray-600">
                A critical reagent ships from another continent, clears customs, and sits in transit
                while your experiment sits idle. Lead times measured in weeks, not days.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-8 text-center shadow-lg"
            >
              <Search className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">You dig</h3>
              <p className="text-gray-600">
                That &ldquo;US supplier&rdquo; on the label often never touched the product. They
                imported it, repackaged it, and marked it up. The real maker stays anonymous.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-8 text-center shadow-lg"
            >
              <Factory className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">We build</h3>
              <p className="text-gray-600">
                We cut out the layers. Made in the States, tested in house, traceable to the lot.
                The maker and the seller are the same people, and you can talk to them.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What that gets you */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What reshoring actually buys you</h2>
            <p className="text-xl text-gray-600">Less romance, more reliability</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6"
            >
              <Truck className="h-10 w-10 text-primary-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Shorter lead times</h3>
              <p className="text-gray-700 text-sm">
                Domestic production and shipping, so your material arrives in days and skips the
                customs lottery.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6"
            >
              <ShieldCheck className="h-10 w-10 text-primary-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Real traceability</h3>
              <p className="text-gray-700 text-sm">
                Lot-specific documentation from the people who actually made it. No relabeled
                mystery box.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6"
            >
              <FlaskConical className="h-10 w-10 text-primary-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Consistent lots</h3>
              <p className="text-gray-700 text-sm">
                Made and tested under one roof, so batch to batch behaves the way your protocol
                expects.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6"
            >
              <Flag className="h-10 w-10 text-primary-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Made in the USA</h3>
              <p className="text-gray-700 text-sm">
                Every order keeps advanced chemistry jobs and know-how on this side of the ocean.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission banner */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Flag className="h-12 w-12 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Our mission is almost embarrassingly simple</h2>
          <p className="text-xl text-primary-50 leading-relaxed">
            Make the biochemicals American labs depend on, right here in America. Ship them fast,
            document them honestly, and put a scientist on the other end of the phone. That is the
            whole pitch.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stop waiting on a boat
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Talk to the chemists who actually make your material, or request a sample and see the
            difference a real supply chain makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href={`${base}/contact`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              Contact Our Team
            </motion.a>
            <motion.a
              href={`${base}/sample-request`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
            >
              Request Samples
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
