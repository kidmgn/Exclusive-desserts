import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import SeasonalBanner from './components/SeasonalBanner';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen overflow-x-hidden">
        {/* Toast notifications */}
        <Toaster
          position="bottom-right"
          toastOptions={{ duration: 3000 }}
        />

        {/* Navigation */}
        <Navbar />

        {/* Cart Drawer */}
        <Cart />

        {/* Page sections */}
        <main>
          <Hero />
          <About />
          <Menu />
          <SeasonalBanner />
          <Gallery />
          <Reviews />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </CartProvider>
  );
}
