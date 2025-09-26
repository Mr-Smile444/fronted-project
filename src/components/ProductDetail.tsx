import React, { useState, useMemo } from 'react';
import { Heart, Minus, Plus, ChevronLeft, ChevronRight, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAppContext } from '../App';

interface ProductDetailProps {
  productId?: number;
}

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { selectedProduct, addToCart, addToWishlist, wishlistItems, setCurrentPage } = useAppContext();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample product data - in a real app this would come from an API
  const productData = useMemo(() => {
    const products = [
      {
        id: 1,
        name: "Silk Evening Gown",
        designer: "Valentina Rossi",
        price: 2850,
        images: [
          "https://images.unsplash.com/photo-1675294293068-18144bbfd0bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZXZlbmluZyUyMGdvd24lMjBsdXh1cnklMjBmYXNoaW9ufGVufDF8fHx8MTc1ODgxNDMzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1756483511246-12ae36997a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwbW9kZWwlMjBlbGVnYW50JTIwZHJlc3N8ZW58MXx8fHwxNzU4ODE0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: [
          { name: "Black", value: "#000000" },
          { name: "Navy", value: "#1a237e" }
        ],
        description: "An exquisite silk evening gown that embodies timeless elegance and sophistication. Crafted from the finest Italian silk, this piece features a flattering silhouette that gracefully drapes the body. Perfect for special occasions and formal events.",
        details: [
          "100% Italian silk",
          "Dry clean only",
          "Made in Italy",
          "Invisible zipper closure",
          "Lined bodice"
        ],
        fit: "This gown runs true to size with a tailored fit through the bodice and a flowing A-line skirt. For a more relaxed fit, consider sizing up.",
        care: "Professional dry cleaning recommended. Store on padded hangers to maintain shape. Avoid direct sunlight when storing.",
        delivery: "Standard delivery 3-5 business days. Express delivery available.",
        rating: 4.8,
        reviews: 24,
        inStock: true,
        isNew: true
      },
      {
        id: 2,
        name: "Designer Handbag",
        designer: "Marco Leather",
        price: 1250,
        images: [
          "https://images.unsplash.com/photo-1575201046471-082b5c1a1e79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwaGFuZGJhZyUyMGx1eHVyeSUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc1ODc5Mzc0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        ],
        sizes: ["One Size"],
        colors: [
          { name: "Brown", value: "#8B4513" },
          { name: "Black", value: "#000000" },
          { name: "Cognac", value: "#A0522D" }
        ],
        description: "A meticulously crafted leather handbag that combines functionality with sophisticated design. Made from premium Italian leather with hand-stitched details.",
        details: [
          "Premium Italian leather",
          "Hand-stitched details",
          "Golden hardware",
          "Multiple compartments",
          "Dust bag included"
        ],
        fit: "Spacious interior with multiple compartments for organization.",
        care: "Wipe with a soft, dry cloth. Use leather conditioner monthly.",
        delivery: "Standard delivery 3-5 business days. Express delivery available.",
        rating: 4.9,
        reviews: 18,
        inStock: true
      }
    ];

    return products.find(p => p.id === selectedProduct) || products[0];
  }, [selectedProduct]);

  const isInWishlist = wishlistItems.some(item => item.id === productData.id);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    addToCart({
      id: productData.id,
      name: productData.name,
      price: productData.price,
      image: productData.images[0],
      size: selectedSize,
      designer: productData.designer
    });

    alert('Added to cart!');
  };

  const handleAddToWishlist = () => {
    if (!isInWishlist) {
      addToWishlist({
        id: productData.id,
        name: productData.name,
        price: productData.price,
        image: productData.images[0],
        designer: productData.designer
      });
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productData.images.length) % productData.images.length);
  };

  // Sample related products
  const relatedProducts = [
    {
      id: 3,
      name: "Luxury Timepiece",
      designer: "Geneva Collection",
      price: 3200,
      image: "https://images.unsplash.com/photo-1742631193849-acc045ea5890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMGZhc2hpb258ZW58MXx8fHwxNzU4NzA2MDQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 4,
      name: "Designer Heels",
      designer: "Stella Milan",
      price: 850,
      image: "https://images.unsplash.com/photo-1673377441728-23e984e70521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGhlZWxzJTIwbHV4dXJ5JTIwc2hvZXN8ZW58MXx8fHwxNzU4ODE0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 5,
      name: "Silk Scarf",
      designer: "Parisian Atelier",
      price: 320,
      image: "https://images.unsplash.com/photo-1620740199226-2420c2fcaa18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwc2NhcmYlMjBsdXh1cnklMjBmYXNoaW9ufGVufDF8fHx8MTc1ODgxNDM0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 6,
      name: "Statement Jewelry",
      designer: "Aurelia Fine",
      price: 1850,
      image: "https://images.unsplash.com/photo-1586878340506-af074f2ee999?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwamV3ZWxyeSUyMGFjY2Vzc29yaWVzJTIwbHV4dXJ5fGVufDF8fHx8MTc1ODgxNDMzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-gray-500 hover:text-gray-700"
            >
              Home
            </button>
            <span className="text-gray-400">/</span>
            <button 
              onClick={() => setCurrentPage('products')}
              className="text-gray-500 hover:text-gray-700"
            >
              Products
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{productData.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <ImageWithFallback
                src={productData.images[currentImageIndex]}
                alt={productData.name}
                className="w-full h-full object-cover"
              />
              
              {productData.isNew && (
                <Badge className="absolute top-4 left-4 bg-gray-900 text-white">
                  NEW
                </Badge>
              )}

              {productData.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-white w-10 h-10 rounded-full p-0"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-white w-10 h-10 rounded-full p-0"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {productData.images.length > 1 && (
              <div className="flex space-x-4">
                {productData.images.map((image, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${productData.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-2">
                {productData.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4">{productData.designer}</p>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(productData.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {productData.rating} ({productData.reviews} reviews)
                  </span>
                </div>
              </div>
              <p className="text-3xl font-medium text-gray-900">
                ${productData.price.toLocaleString()}
              </p>
            </div>

            <Separator />

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Color</h3>
              <div className="flex space-x-3">
                {productData.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? 'border-gray-900 scale-110'
                        : 'border-gray-300 hover:border-gray-500'
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                  />
                ))}
              </div>
              {selectedColor && (
                <p className="text-sm text-gray-600 mt-2">Selected: {selectedColor}</p>
              )}
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900">Size</h3>
                <button className="text-sm text-gray-600 hover:text-gray-900 underline">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {productData.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className="h-12"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                className="w-full h-12 text-lg"
                onClick={handleAddToCart}
                disabled={!productData.inStock || !selectedSize || !selectedColor}
              >
                {productData.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              
              <Button
                variant="outline"
                className="w-full h-12"
                onClick={handleAddToWishlist}
              >
                <Heart className={`h-4 w-4 mr-2 ${isInWishlist ? 'fill-current text-red-500' : ''}`} />
                {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                <p className="text-sm text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                <p className="text-sm text-gray-600">Free Returns</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                <p className="text-sm text-gray-600">Authenticity</p>
              </div>
            </div>

            {/* Product Details Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 leading-relaxed">{productData.description}</p>
                  <ul className="mt-4 space-y-1">
                    {productData.details.map((detail, index) => (
                      <li key={index} className="text-sm text-gray-600">• {detail}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="fit">
                <AccordionTrigger>Fit & Sizing</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 leading-relaxed">{productData.fit}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="care">
                <AccordionTrigger>Care Instructions</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 leading-relaxed">{productData.care}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="delivery">
                <AccordionTrigger>Delivery & Returns</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 leading-relaxed">{productData.delivery}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif text-gray-900">You May Also Like</h2>
            <Button
              variant="outline"
              onClick={() => setCurrentPage('products')}
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <Card 
                key={product.id}
                className="group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  // In a real app, this would update the current product
                  window.scrollTo(0, 0);
                }}
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.designer}</p>
                  <p className="text-lg font-medium text-gray-900">${product.price.toLocaleString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;