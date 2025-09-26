import React, { useState, createContext, useContext } from 'react';
import { ShoppingBag, Heart, Search, User, Menu, X } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import Homepage from './components/Homepage';
import ProductListing from './components/ProductListing';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

// Context for global state management
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  designer: string;
}

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  designer: string;
}

interface AppContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  wishlistItems: WishlistItem[];
  setWishlistItems: (items: WishlistItem[]) => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number, size: string) => void;
  updateCartQuantity: (id: number, size: string, quantity: number) => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  selectedProduct: number | null;
  setSelectedProduct: (id: number | null) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// Header Component
const Header: React.FC = () => {
  const { currentPage, setCurrentPage, cartItems, wishlistItems } = useAppContext();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navigation = [
    { name: 'Home', page: 'home' },
    { name: 'New Arrivals', page: 'new-arrivals' },
    { name: 'Women', page: 'women' },
    { name: 'Men', page: 'men' },
    { name: 'Accessories', page: 'accessories' },
    { name: 'Designers', page: 'designers' }
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Search Overlay */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-4 shadow-lg">
          <div className="max-w-2xl mx-auto relative">
            <Input
              placeholder="Search for products, designers..."
              className="w-full text-lg py-3 px-4 border-2 border-gray-200 focus:border-gray-800"
              autoFocus
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setSearchOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <h1 className="text-2xl tracking-wide text-gray-900 font-serif">AURA</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setCurrentPage('products');
                  // This would set the category filter
                }}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm tracking-wide"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="relative"
            >
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-red-600 text-white">
                  {wishlistItems.length}
                </Badge>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => setCurrentPage('cart')}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-gray-900 text-white">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setCurrentPage('products');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-600 hover:text-gray-900 transition-colors duration-200 py-2"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Footer Component
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-serif text-gray-900 mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Women</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Men</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Sale</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif text-gray-900 mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif text-gray-900 mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624.001 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
            <p className="text-sm text-gray-600">Follow us for the latest updates and style inspiration.</p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">© 2024 AURA. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="text-xs text-gray-500">We accept:</span>
            <div className="flex space-x-2">
              <div className="text-xs text-gray-600 bg-white border border-gray-200 px-2 py-1 rounded">VISA</div>
              <div className="text-xs text-gray-600 bg-white border border-gray-200 px-2 py-1 rounded">MC</div>
              <div className="text-xs text-gray-600 bg-white border border-gray-200 px-2 py-1 rounded">AMEX</div>
              <div className="text-xs text-gray-600 bg-white border border-gray-200 px-2 py-1 rounded">PAYPAL</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => 
        cartItem.id === item.id && cartItem.size === item.size
      );
      
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id && cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number, size: string) => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.id === id && item.size === size))
    );
  };

  const updateCartQuantity = (id: number, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prevItems => {
      const exists = prevItems.find(wishlistItem => wishlistItem.id === item.id);
      if (!exists) {
        return [...prevItems, item];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems(prevItems => 
      prevItems.filter(item => item.id !== id)
    );
  };

  const contextValue: AppContextType = {
    currentPage,
    setCurrentPage,
    cartItems,
    setCartItems,
    wishlistItems,
    setWishlistItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    addToWishlist,
    removeFromWishlist,
    selectedProduct,
    setSelectedProduct,
    selectedCategory,
    setSelectedCategory
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage />;
      case 'products':
        return <ProductListing />;
      case 'product':
        return <ProductDetail />;
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      default:
        return <Homepage />;
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}