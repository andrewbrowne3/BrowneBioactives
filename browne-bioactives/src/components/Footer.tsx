import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { useDivision } from '../data/divisions';

const Footer = () => {
  const division = useDivision();
  const base = division.base;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/logo.jpg" alt="Browne Bioactives logo" className="h-12 w-12 object-contain rounded bg-white p-1" />
              <div>
                <h3 className="text-xl font-bold">Browne Bioactives</h3>
                <p className="text-sm text-gray-400">{division.unit}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              {division.id === 'research'
                ? 'Research-grade antibodies, recombinant proteins, and assay kits for life-science laboratories. Founded by Dr. Andrew Browne, supplied with lot-specific datasheets and certificates of analysis.'
                : 'Leading supplier of high-quality active ingredients for cosmetic, pharmaceutical, and nutraceutical applications. Founded by Dr. Andrew Browne, we specialize in innovative bioactive compounds.'}
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
                <Link to={`${base}/products`} className="text-gray-300 hover:text-primary-400 transition-colors">
                  {division.id === 'research' ? 'Catalog' : 'Products'}
                </Link>
              </li>
              <li>
                <Link to={`${base}/sample-request`} className="text-gray-300 hover:text-primary-400 transition-colors">
                  Request Sample
                </Link>
              </li>
              <li>
                <Link to={`${base}/bulk-quote`} className="text-gray-300 hover:text-primary-400 transition-colors">
                  {division.id === 'research' ? 'Bulk Quote' : 'Bulk Orders'}
                </Link>
              </li>
              <li>
                <Link to={`${base}/about`} className="text-gray-300 hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Other Divisions
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

        {division.ruo && (
          <div className="border-t border-gray-800 mt-8 pt-6">
            <p className="text-gray-400 text-xs">
              All products in the Research division are sold <span className="font-semibold">For Research Use Only (RUO)</span>.
              They are not drugs, medical devices, cosmetics, or food, and are not intended for diagnostic,
              therapeutic, or any in-vivo human or animal use.
            </p>
          </div>
        )}

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Browne Bioactives. All rights reserved. |
            <Link to={`${base}/about`} className="ml-2 hover:text-primary-400 transition-colors">
              Privacy Policy
            </Link> |
            <Link to={`${base}/about`} className="ml-2 hover:text-primary-400 transition-colors">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
