import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAppContext } from '../App';

const Homepage: React.FC = () => {
  const { setCurrentPage, setSelectedProduct, addToWishlist, wishlistItems } = useAppContext();
  const [email, setEmail] = useState('');
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // Sample data for the homepage
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1756483511246-12ae36997a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwbW9kZWwlMjBlbGVnYW50JTIwZHJlc3N8ZW58MXx8fHwxNzU4ODE0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Autumn Elegance",
      subtitle: "Discover our new seasonal collection",
      cta: "Shop Collection"
    },
    {
      image: "https://images.unsplash.com/photo-1675294293068-18144bbfd0bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZXZlbmluZyUyMGdvd24lMjBsdXh1cnklMjBmYXNoaW9ufGVufDF8fHx8MTc1ODgxNDMzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Evening Glamour",
      subtitle: "Exquisite pieces for special occasions",
      cta: "Explore Evening Wear"
    }
  ];

  const featuredCategories = [
    {
      id: 1,
      name: "Evening Wear",
      image: "https://images.unsplash.com/photo-1675294293068-18144bbfd0bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZXZlbmluZyUyMGdvd24lMjBsdXh1cnklMjBmYXNoaW9ufGVufDF8fHx8MTc1ODgxNDMzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Sophisticated designs for memorable evenings"
    },
    {
      id: 2,
      name: "Luxury Accessories",
      image: "https://images.unsplash.com/photo-1586878340506-af074f2ee999?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwamV3ZWxyeSUyMGFjY2Vzc29yaWVzJTIwbHV4dXJ5fGVufDF8fHx8MTc1ODgxNDMzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Curated selection of premium accessories"
    },
    {
      id: 3,
      name: "Men's Collection",
      image: "https://images.unsplash.com/photo-1686628101951-ce2bd65ab579?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwbHV4dXJ5JTIwZmFzaGlvbiUyMHN1aXR8ZW58MXx8fHwxNzU4ODE0MzQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Refined menswear for the modern gentleman"
    },
    {
      id: 4,
      name: "Summer Essentials",
      image: "https://images.unsplash.com/photo-1620740199226-2420c2fcaa18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwc2NhcmYlMjBsdXh1cnklMjBmYXNoaW9ufGVufDF8fHx8MTc1ODgxNDM0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Light and luxurious pieces for warmer days"
    }
  ];

  const bestsellerProducts = [
    {
      id: 1,
      name: "Silk Evening Gown",
      designer: "Valentina Rossi",
      price: 2850,
      image: "https://images.unsplash.com/photo-1675294293068-18144bbfd0bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZXZlbmluZyUyMGdvd24lMjBsdXh1cnklMjBmYXNoaW9ufGVufDF8fHx8MTc1ODgxNDMzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      hoverImage: "https://images.unsplash.com/photo-1756483511246-12ae36997a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwbW9kZWwlMjBlbGVnYW50JTIwZHJlc3N8ZW58MXx8fHwxNzU4ODE0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 2,
      name: "Designer Handbag",
      designer: "Marco Leather",
      price: 1250,
      image: "https://images.unsplash.com/photo-1575201046471-082b5c1a1e79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwaGFuZGJhZyUyMGx1eHVyeSUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc1ODc5Mzc0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
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
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate newsletter signup
    alert('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const toggleWishlist = (product: any) => {
    if (isInWishlist(product.id)) {
      // Remove from wishlist logic would go here
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        designer: product.designer
      });
    }
  };

  const nextHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroSlides[currentHeroSlide].image}
            alt={heroSlides[currentHeroSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        
        {/* Hero Navigation */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 z-10"
          onClick={prevHeroSlide}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 z-10"
          onClick={nextHeroSlide}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-2xl px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-4 tracking-tight">
            {heroSlides[currentHeroSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light tracking-wide">
            {heroSlides[currentHeroSlide].subtitle}
          </p>
          <Button
            size="lg"
            className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-medium tracking-wide"
            onClick={() => setCurrentPage('products')}
          >
            {heroSlides[currentHeroSlide].cta}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Hero Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentHeroSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
              onClick={() => setCurrentHeroSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-4">
              Discover Our Collections
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Curated selections of the finest luxury fashion and accessories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCategories.map((category) => (
              <Card 
                key={category.id}
                className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500"
                onClick={() => setCurrentPage('products')}
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-serif mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Carousel */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-4">
                Bestsellers
              </h2>
              <p className="text-xl text-gray-600">
                Our most coveted pieces this season
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage('products')}
              className="hidden md:flex items-center"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {bestsellerProducts.map((product) => (
              <Card 
                key={product.id}
                className="group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.hoverImage && (
                    <ImageWithFallback
                      src={product.hoverImage}
                      alt={`${product.name} alternate`}
                      className="absolute inset-0 w-full h-80 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  )}
                  
                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white bg-opacity-90 hover:bg-white text-gray-900 w-10 h-10 rounded-full p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                    >
                      <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      className="w-full bg-white text-gray-900 hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product.id);
                        setCurrentPage('product');
                      }}
                    >
                      Quick View
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.designer}</p>
                  <p className="text-lg font-medium text-gray-900">${product.price.toLocaleString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Button
              variant="outline"
              onClick={() => setCurrentPage('products')}
              className="w-full sm:w-auto"
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1755514838747-adfd34197d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwc3RvcmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg3OTAxNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="AURA Atelier"
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-serif">
                Crafted with Passion
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Since 1952, AURA has been at the forefront of luxury fashion, 
                creating timeless pieces that embody elegance and sophistication. 
                Our commitment to exceptional craftsmanship and sustainable practices 
                ensures that every piece tells a story of quality and conscience.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                From our atelier in Milan to boutiques around the world, 
                we continue to inspire confidence and celebrate individuality 
                through fashion that transcends trends.
              </p>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 mt-8"
              >
                Discover Our Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-4">
            Stay in Touch
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Be the first to know about new collections, exclusive events, 
            and special offers from AURA.
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 px-4 border-2 border-gray-200 focus:border-gray-800"
              />
              <Button 
                type="submit"
                className="h-12 px-8 bg-gray-900 hover:bg-gray-800 text-white"
              >
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Homepage;