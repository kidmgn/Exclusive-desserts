import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { SiteContentProvider } from './context/SiteContentContext';
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
    <AuthProvider>
      <SiteContentProvider>
        <CartProvider>
          <div className="min-h-screen overflow-x-hidden">
            <Toaster
              position="bottom-right"
              toastOptions={{ duration: 3000 }}
            />
            <Navbar />
            <Cart />
            <main>
              <Hero />
              <About />
              <Menu />
              <SeasonalBanner />
              <Gallery />
              <Reviews />
              <Contact />
            </main>
            <Footer />
          </div>
        </CartProvider>
      </SiteContentProvider>
    </AuthProvider>
  );
}
