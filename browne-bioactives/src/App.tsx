import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RuoBanner from './components/RuoBanner';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SampleRequestPage from './pages/SampleRequestPage';
import BulkQuotePage from './pages/BulkQuotePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Shared chrome for both division "sites" (cosmetics + research).
function DivisionLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <RuoBanner />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// The pages each division exposes - identical structure, division-aware content.
const divisionPages = (
  <>
    <Route index element={<HomePage />} />
    <Route path="products" element={<ProductsPage />} />
    <Route path="products/:id" element={<ProductDetailPage />} />
    <Route path="sample-request" element={<SampleRequestPage />} />
    <Route path="bulk-quote" element={<BulkQuotePage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="contact" element={<ContactPage />} />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Chooser landing - sends visitors into one of the two sites */}
        <Route path="/" element={<LandingPage />} />

        {/* Cosmetic & pharmaceutical ingredients site */}
        <Route path="/cosmetics" element={<DivisionLayout />}>
          {divisionPages}
        </Route>

        {/* Research reagents (RUO) site */}
        <Route path="/research" element={<DivisionLayout />}>
          {divisionPages}
        </Route>

        {/* Legacy/top-level links fall back into the cosmetics site */}
        <Route path="/products" element={<Navigate to="/cosmetics/products" replace />} />
        <Route path="/products/:id" element={<Navigate to="/cosmetics/products" replace />} />
        <Route path="/about" element={<Navigate to="/cosmetics/about" replace />} />
        <Route path="/contact" element={<Navigate to="/cosmetics/contact" replace />} />
        <Route path="/sample-request" element={<Navigate to="/cosmetics/sample-request" replace />} />
        <Route path="/bulk-quote" element={<Navigate to="/cosmetics/bulk-quote" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
