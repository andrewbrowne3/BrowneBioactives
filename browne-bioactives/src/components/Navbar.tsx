import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowLeftRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDivision, DIVISIONS } from '../data/divisions';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const division = useDivision();
  const base = division.base;
  const other = division.id === 'cosmetics' ? DIVISIONS.research : DIVISIONS.cosmetics;

  const isActive = (path: string) => location.pathname === path;

  // Category quick-links for the current division's product page.
  const productCategories = division.categories
    .filter((c) => c.value !== 'all')
    .map((c) => ({ name: c.label, path: `${base}/products?category=${c.value}` }));

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to={base} className="flex items-center space-x-3">
              <img src="/logo.jpg" alt="Browne Bioactives logo" className="h-12 w-12 object-contain" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Browne Bioactives</h1>
                <p className="text-xs text-gray-600">{division.unit}</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to={base}
              className={`${
                isActive(base) ? 'text-primary-600' : 'text-gray-700'
              } hover:text-primary-600 font-medium transition-colors`}
            >
              Home
            </Link>

            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                <span>{division.id === 'research' ? 'Catalog' : 'Products'}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2"
                  >
                    <Link
                      to={`${base}/products`}
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {division.id === 'research' ? 'All Reagents' : 'All Products'}
                    </Link>
                    {productCategories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to={`${base}/about`}
              className={`${
                isActive(`${base}/about`) ? 'text-primary-600' : 'text-gray-700'
              } hover:text-primary-600 font-medium transition-colors`}
            >
              About
            </Link>

            <Link
              to={`${base}/contact`}
              className={`${
                isActive(`${base}/contact`) ? 'text-primary-600' : 'text-gray-700'
              } hover:text-primary-600 font-medium transition-colors`}
            >
              Contact
            </Link>

            {/* Cross-link to the other division's site */}
            <Link
              to={other.base}
              className="flex items-center gap-1 text-gray-500 hover:text-primary-600 text-sm font-medium transition-colors"
              title={`Switch to ${other.otherName === 'Research Reagents' ? 'Research' : 'Ingredients'}`}
            >
              <ArrowLeftRight className="h-4 w-4" />
              {division.otherName}
            </Link>

            <Link
              to={`${base}/sample-request`}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Request Sample
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="md:hidden overflow-hidden bg-white border-t"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link
                to={base}
                className="block px-3 py-2 text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to={`${base}/products`}
                className="block px-3 py-2 text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {division.id === 'research' ? 'All Reagents' : 'All Products'}
              </Link>
              {productCategories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="block px-6 py-2 text-gray-600 hover:text-primary-600 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <Link
                to={`${base}/about`}
                className="block px-3 py-2 text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to={`${base}/contact`}
                className="block px-3 py-2 text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                to={other.base}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-primary-600 font-medium border-t mt-1 pt-3"
                onClick={() => setIsOpen(false)}
              >
                <ArrowLeftRight className="h-4 w-4" />
                Go to {division.otherName}
              </Link>
              <Link
                to={`${base}/sample-request`}
                className="block px-3 py-2 bg-primary-600 text-white rounded-lg text-center font-medium"
                onClick={() => setIsOpen(false)}
              >
                Request Sample
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
