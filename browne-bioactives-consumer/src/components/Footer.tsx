import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, FlaskConical } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <FlaskConical className="h-10 w-10 text-primary-400" />
              <div>
                <h3 className="text-xl font-bold">Browne Bioactives</h3>
                <p className="text-sm text-gray-400">Premium Supplements</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Premium supplements backed by science and formulated by experts.
              Founded by Dr. Andrew Browne and Derek Browne, committed to helping you achieve optimal health and wellness.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">info@brownebioactives.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-1" />
                <span className="text-gray-300">
                  Research Park<br />
                  Innovation District<br />
                  Boston, MA 02134
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm mb-2">
            © {new Date().getFullYear()} Browne Bioactives. All rights reserved. |
            <Link to="/privacy" className="ml-2 hover:text-primary-400 transition-colors">
              Privacy Policy
            </Link> |
            <Link to="/terms" className="ml-2 hover:text-primary-400 transition-colors">
              Terms of Service
            </Link>
          </p>
          <p className="text-xs text-gray-500 mt-4">
            These statements have not been evaluated by the FDA. These products are not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
