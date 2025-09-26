import React from 'react';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAppContext } from '../App';

const Cart: React.FC = () => {
  const { 
    cartItems, 
    updateCartQuantity, 
    removeFromCart, 
    setCurrentPage 
  } = useAppContext();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25; // Free shipping over $500
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (id: number, size: string, newQuantity: number) => {
    updateCartQuantity(id, size, newQuantity);
  };

  const handleRemoveItem = (id: number, size: string) => {
    removeFromCart(id, size);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-8" />
            <h1 className="text-3xl font-serif text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover our collections and find something you love
            </p>
            <Button
              size="lg"
              onClick={() => setCurrentPage('products')}
              className="px-8"
            >
              Continue Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-serif text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <Card key={`${item.id}-${item.size}`} className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.designer}</p>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                          <span>Size: {item.size}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id, item.size)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Qty:</span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-lg font-medium text-gray-900">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-600">
                            ${item.price.toLocaleString()} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Continue Shopping */}
            <div className="pt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentPage('products')}
                className="flex items-center"
              >
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Continue Shopping
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? 'Free' : `$${shipping}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-medium">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">${total.toFixed(2)}</span>
                </div>

                {subtotal < 500 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <p className="text-sm text-blue-800">
                      Add ${(500 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  </div>
                )}

                <Button
                  className="w-full h-12 text-lg mt-6"
                  onClick={() => setCurrentPage('checkout')}
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                {/* Promo Code */}
                <div className="mt-6">
                  <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      id="promo"
                      placeholder="Enter code"
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Free shipping on orders over $500</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Secure checkout</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recently Viewed or Recommendations */}
            <Card className="p-6 mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">You might also like</h3>
              <div className="space-y-4">
                {[
                  {
                    id: 999,
                    name: "Silk Scarf",
                    designer: "Parisian Atelier",
                    price: 320,
                    image: "https://images.unsplash.com/photo-1620740199226-2420c2fcaa18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwc2NhcmYlMjBsdXh1cnklMjBmYXNoaW9ufGVufDF8fHx8MTc1ODgxNDM0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  },
                  {
                    id: 998,
                    name: "Designer Heels",
                    designer: "Stella Milan",
                    price: 850,
                    image: "https://images.unsplash.com/photo-1673377441728-23e984e70521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGhlZWxzJTIwbHV4dXJ5JTIwc2hvZXN8ZW58MXx8fHwxNzU4ODE0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  }
                ].map((product) => (
                  <div key={product.id} className="flex space-x-3">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                      <p className="text-xs text-gray-600">{product.designer}</p>
                      <p className="text-sm font-medium text-gray-900">${product.price}</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;