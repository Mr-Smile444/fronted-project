import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CreditCard, Truck, MapPin, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAppContext } from '../App';

const Checkout: React.FC = () => {
  const { cartItems, setCurrentPage, setCartItems } = useAppContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    
    // Billing
    sameAsShipping: true,
    billingFirstName: '',
    billingLastName: '',
    billingAddress: '',
    billingApartment: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    billingCountry: 'US',
    
    // Shipping Method
    shippingMethod: 'standard',
    
    // Payment
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    savePayment: false
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = formData.shippingMethod === 'express' ? 25 : (subtotal > 500 ? 0 : 15);
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && 
               formData.address && formData.city && formData.state && formData.zipCode;
      case 2:
        return formData.shippingMethod;
      case 3:
        return formData.cardNumber && formData.expiryDate && formData.cvv && formData.cardName;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      // Simulate order placement
      alert('Order placed successfully! You will receive a confirmation email shortly.');
      setCartItems([]);
      setCurrentPage('home');
    }
  };

  const steps = [
    { number: 1, title: 'Shipping', icon: MapPin },
    { number: 2, title: 'Delivery', icon: Truck },
    { number: 3, title: 'Payment', icon: CreditCard },
    { number: 4, title: 'Review', icon: Check }
  ];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-gray-900 mb-4">No items to checkout</h1>
          <Button onClick={() => setCurrentPage('products')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-serif text-gray-900">Checkout</h1>
            <Button
              variant="ghost"
              onClick={() => setCurrentPage('cart')}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isCompleted = currentStep > step.number;
                  const isCurrent = currentStep === step.number;
                  
                  return (
                    <div key={step.number} className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        isCompleted ? 'bg-green-500 border-green-500 text-white' :
                        isCurrent ? 'border-gray-900 text-gray-900' :
                        'border-gray-300 text-gray-300'
                      }`}>
                        {isCompleted ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <StepIcon className="h-5 w-5" />
                        )}
                      </div>
                      <span className={`ml-3 text-sm font-medium ${
                        isCurrent ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </span>
                      {index < steps.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-6 ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address">Address *</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                        <Input
                          id="apartment"
                          value={formData.apartment}
                          onChange={(e) => handleInputChange('apartment', e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CA">California</SelectItem>
                              <SelectItem value="NY">New York</SelectItem>
                              <SelectItem value="TX">Texas</SelectItem>
                              <SelectItem value="FL">Florida</SelectItem>
                              {/* Add more states as needed */}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="zipCode">ZIP Code *</Label>
                          <Input
                            id="zipCode"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Shipping Method */}
              {currentStep === 2 && (
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="flex items-center">
                      <Truck className="h-5 w-5 mr-2" />
                      Delivery Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <RadioGroup
                      value={formData.shippingMethod}
                      onValueChange={(value) => handleInputChange('shippingMethod', value)}
                    >
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Standard Delivery</p>
                              <p className="text-sm text-gray-600">5-7 business days</p>
                            </div>
                            <span className="text-lg font-medium">
                              {subtotal > 500 ? 'Free' : '$15'}
                            </span>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Express Delivery</p>
                              <p className="text-sm text-gray-600">2-3 business days</p>
                            </div>
                            <span className="text-lg font-medium">$25</span>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="overnight" id="overnight" />
                        <Label htmlFor="overnight" className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Overnight Delivery</p>
                              <p className="text-sm text-gray-600">Next business day</p>
                            </div>
                            <span className="text-lg font-medium">$45</span>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date *</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="cardName">Name on Card *</Label>
                        <Input
                          id="cardName"
                          value={formData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          required
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="savePayment"
                          checked={formData.savePayment}
                          onCheckedChange={(checked) => handleInputChange('savePayment', checked as boolean)}
                        />
                        <Label htmlFor="savePayment" className="text-sm">
                          Save payment information for future purchases
                        </Label>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-2">
                        <Lock className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">
                          Your payment information is encrypted and secure
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="flex items-center">
                      <Check className="h-5 w-5 mr-2" />
                      Review Your Order
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <div className="space-y-6">
                      {/* Shipping Address */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                        <div className="text-sm text-gray-600">
                          <p>{formData.firstName} {formData.lastName}</p>
                          <p>{formData.address}</p>
                          {formData.apartment && <p>{formData.apartment}</p>}
                          <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                          <p>{formData.email}</p>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Payment Method</h4>
                        <div className="text-sm text-gray-600">
                          <p>Credit Card ending in {formData.cardNumber.slice(-4)}</p>
                          <p>{formData.cardName}</p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Order Items</h4>
                        <div className="space-y-4">
                          {cartItems.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="flex space-x-4">
                              <ImageWithFallback
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900">{item.name}</h5>
                                <p className="text-sm text-gray-600">{item.designer}</p>
                                <p className="text-sm text-gray-600">Size: {item.size}</p>
                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-gray-900">
                                  ${(item.price * item.quantity).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!validateStep(currentStep)}
                    className="flex items-center"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex items-center bg-green-600 hover:bg-green-700"
                  >
                    Place Order
                    <Check className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex space-x-3">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="text-xs text-gray-600">{item.designer}</p>
                      <p className="text-xs text-gray-600">Size: {item.size} • Qty: {item.quantity}</p>
                      <p className="text-sm font-medium text-gray-900">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-medium">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;