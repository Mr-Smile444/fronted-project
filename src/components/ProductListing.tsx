import React, { useState, useMemo } from 'react';
import { Filter, Heart, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAppContext } from '../App';

interface Product {
  id: number;
  name: string;
  designer: string;
  price: number;
  image: string;
  hoverImage?: string;
  category: string;
  sizes: string[];
  colors: string[];
  isNew?: boolean;
}

const ProductListing: React.FC = () => {
  const { setCurrentPage, setSelectedProduct, addToWishlist, wishlistItems } = useAppContext();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedDesigners, setSelectedDesigners] = useState<string[]>([]);

  // Sample product data
  const allProducts: Product[] = [
    {
      id: 1,
      name: "Silk Evening Gown",
      designer: "Valentina Rossi",
      price: 2850,
      image: "https://images.unsplash.com/photo-1675294293068-18144bbfd0bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZXZlbmluZyUyMGdvd24lMjBsdXh1cnklMjBmYXNoaW9ufGVufDF8fHx8MTc1ODgxNDMzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      hoverImage: "https://images.unsplash.com/photo-1756483511246-12ae36997a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwbW9kZWwlMjBlbGVnYW50JTIwZHJlc3N8ZW58MXx8fHwxNzU4ODE0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Evening Wear",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Black", "Navy"],
      isNew: true
    },
    {
      id: 2,
      name: "Designer Handbag",
      designer: "Marco Leather",
      price: 1250,
      image: "https://images.unsplash.com/photo-1575201046471-082b5c1a1e79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwaGFuZGJhZyUyMGx1eHVyeSUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc1ODc5Mzc0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Accessories",
      sizes: ["One Size"],
      colors: ["Brown", "Black", "Cognac"]
    },
    {
      id: 3,
      name: "Luxury Timepiece",
      designer: "Geneva Collection",
      price: 3200,
      image: "https://images.unsplash.com/photo-1742631193849-acc045ea5890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMGZhc2hpb258ZW58MXx8fHwxNzU4NzA2MDQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Accessories",
      sizes: ["One Size"],
      colors: ["Gold", "Silver", "Rose Gold"]
    },
    {
      id: 4,
      name: "Designer Heels",
      designer: "Stella Milan",
      price: 850,
      image: "https://images.unsplash.com/photo-1673377441728-23e984e70521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGhlZWxzJTIwbHV4dXJ5JTIwc2hvZXN8ZW58MXx8fHwxNzU4ODE0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Shoes",
      sizes: ["36", "37", "38", "39", "40", "41"],
      colors: ["Black", "Nude", "Red"]
    },
    {
      id: 5,
      name: "Silk Scarf",
      designer: "Parisian Atelier",
      price: 320,
      image: "https://images.unsplash.com/photo-1620740199226-2420c2fcaa18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwc2NhcmYlMjBsdXh1cnklMjBmYXNoaW9ufGVufDF8fHx8MTc1ODgxNDM0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Accessories",
      sizes: ["One Size"],
      colors: ["Floral", "Geometric", "Abstract"],
      isNew: true
    },
    {
      id: 6,
      name: "Men's Tailored Suit",
      designer: "Savile Row Co.",
      price: 2400,
      image: "https://images.unsplash.com/photo-1686628101951-ce2bd65ab579?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwbHV4dXJ5JTIwZmFzaGlvbiUyMHN1aXR8ZW58MXx8fHwxNzU4ODE0MzQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Men",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Navy", "Charcoal", "Black"]
    },
    {
      id: 7,
      name: "Premium Sunglasses",
      designer: "Vista Luxury",
      price: 480,
      image: "https://images.unsplash.com/photo-1636458939465-9209848a5688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBzdW5nbGFzc2VzfGVufDF8fHx8MTc1ODgxNDM0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Accessories",
      sizes: ["One Size"],
      colors: ["Black", "Tortoise", "Gold"]
    },
    {
      id: 8,
      name: "Statement Jewelry",
      designer: "Aurelia Fine",
      price: 1850,
      image: "https://images.unsplash.com/photo-1586878340506-af074f2ee999?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwamV3ZWxyeSUyMGFjY2Vzc29yaWVzJTIwbHV4dXJ5fGVufDF8fHx8MTc1ODgxNDMzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Accessories",
      sizes: ["One Size"],
      colors: ["Gold", "Silver", "Rose Gold"]
    }
  ];

  // Extract unique values for filters
  const categories = [...new Set(allProducts.map(p => p.category))];
  const designers = [...new Set(allProducts.map(p => p.designer))];
  const sizes = [...new Set(allProducts.flatMap(p => p.sizes))];
  const colors = [...new Set(allProducts.flatMap(p => p.colors))];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesDesigner = selectedDesigners.length === 0 || selectedDesigners.includes(product.designer);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesSize = selectedSizes.length === 0 || product.sizes.some(size => selectedSizes.includes(size));
      const matchesColor = selectedColors.length === 0 || product.colors.some(color => selectedColors.includes(color));
      
      return matchesCategory && matchesDesigner && matchesPrice && matchesSize && matchesColor;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return filtered;
  }, [allProducts, selectedCategories, selectedDesigners, selectedSizes, selectedColors, priceRange, sortBy]);

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        designer: product.designer
      });
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleDesignerChange = (designer: string, checked: boolean) => {
    if (checked) {
      setSelectedDesigners([...selectedDesigners, designer]);
    } else {
      setSelectedDesigners(selectedDesigners.filter(d => d !== designer));
    }
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size]);
    } else {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    }
  };

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, color]);
    } else {
      setSelectedColors(selectedColors.filter(c => c !== color));
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedDesigners([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 5000]);
  };

  const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="border-b border-gray-200 pb-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-serif text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Discover our complete collection of luxury fashion</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24 bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium text-gray-900">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Clear All
                </Button>
              </div>

              {/* Category Filter */}
              <FilterSection title="Category">
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                      />
                      <Label htmlFor={`category-${category}`} className="text-sm text-gray-700">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </FilterSection>

              {/* Price Range Filter */}
              <FilterSection title="Price Range">
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={5000}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </FilterSection>

              {/* Designer Filter */}
              <FilterSection title="Designer">
                <div className="space-y-3">
                  {designers.map((designer) => (
                    <div key={designer} className="flex items-center space-x-2">
                      <Checkbox
                        id={`designer-${designer}`}
                        checked={selectedDesigners.includes(designer)}
                        onCheckedChange={(checked) => handleDesignerChange(designer, checked as boolean)}
                      />
                      <Label htmlFor={`designer-${designer}`} className="text-sm text-gray-700">
                        {designer}
                      </Label>
                    </div>
                  ))}
                </div>
              </FilterSection>

              {/* Size Filter */}
              <FilterSection title="Size">
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSizes.includes(size) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSizeChange(size, !selectedSizes.includes(size))}
                      className="text-xs"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </FilterSection>

              {/* Color Filter */}
              <FilterSection title="Color">
                <div className="space-y-3">
                  {colors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox
                        id={`color-${color}`}
                        checked={selectedColors.includes(color)}
                        onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                      />
                      <Label htmlFor={`color-${color}`} className="text-sm text-gray-700">
                        {color}
                      </Label>
                    </div>
                  ))}
                </div>
              </FilterSection>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button & Sort */}
            <div className="flex items-center justify-between mb-8">
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setShowFilters(true)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </span>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id}
                  className="group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300"
                  onClick={() => {
                    setSelectedProduct(product.id);
                    setCurrentPage('product');
                  }}
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

                    {/* New Badge */}
                    {product.isNew && (
                      <div className="absolute top-4 left-4 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                        NEW
                      </div>
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

            {/* No Products Found */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 mb-4">No products found</p>
                <p className="text-gray-500 mb-8">Try adjusting your filters to see more results</p>
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium text-gray-900">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile filters - same as desktop */}
              <FilterSection title="Category">
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                      />
                      <Label htmlFor={`mobile-category-${category}`} className="text-sm text-gray-700">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Price Range">
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={5000}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </FilterSection>

              <div className="pt-6 border-t border-gray-200">
                <Button
                  className="w-full mb-3"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearAllFilters}
                >
                  Clear All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;