import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Heart, Star, Plus, Minus, X, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  sizes?: string[];
  colors: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
}

interface CartItem extends Product {
  cartId: string;
  quantity: number;
  selectedSize?: string;
  selectedColor: string;
}

export function StorePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const products: Product[] = [
    {
      id: 1,
      name: "AWW Empowerment T-Shirt",
      price: 25,
      originalPrice: 30,
      description: "Comfortable cotton t-shirt with inspirational quote 'Refuse to Miss Your Blessings' - perfect for everyday wear and spreading positivity.",
      image: "https://images.unsplash.com/photo-1743594789334-967d1049e743?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXBvd2VybWVudCUyMHRzaGlydCUyMHdvbWVufGVufDF8fHx8MTc1OTc4Nzc3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Apparel",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Orange", "Navy", "White"],
      rating: 4.8,
      reviews: 42,
      inStock: true,
      featured: true
    },
    {
      id: 2,
      name: "Inspirational Coffee Mug",
      price: 15,
      description: "Start your morning with motivation. This ceramic mug features the AWW logo and empowering quotes to inspire your day.",
      image: "https://images.unsplash.com/photo-1747494750414-69c45f530374?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnNwaXJhdGlvbmFsJTIwY29mZmVlJTIwbXVnfGVufDF8fHx8MTc1OTc4Nzc3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Accessories",
      colors: ["Orange", "White"],
      rating: 4.6,
      reviews: 28,
      inStock: true,
      featured: false
    },
    {
      id: 3,
      name: "Women's Worth Tote Bag",
      price: 20,
      description: "Eco-friendly canvas tote bag perfect for shopping, work, or everyday use. Features AWW branding and sustainable materials.",
      image: "https://images.unsplash.com/photo-1758708536099-9f46dc81fffc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW52YXMlMjB0b3RlJTIwYmFnJTIwZWNvfGVufDF8fHx8MTc1OTc4Nzc3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Accessories",
      colors: ["Natural", "Orange"],
      rating: 4.7,
      reviews: 35,
      inStock: true,
      featured: true
    },
    {
      id: 4,
      name: "Empowerment Journal",
      price: 18,
      description: "Beautiful hardcover journal with guided prompts for self-reflection, goal setting, and personal growth. Perfect for your empowerment journey.",
      image: "https://images.unsplash.com/photo-1599081595921-238c45c87bda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb3VybmFsJTIwbm90ZWJvb2slMjBlbXBvd2VybWVudHxlbnwxfHx8fDE3NTk3ODc3Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Stationery",
      colors: ["Orange", "Navy"],
      rating: 4.9,
      reviews: 15,
      inStock: true,
      featured: false
    },
    {
      id: 5,
      name: "AWW Water Bottle",
      price: 22,
      description: "Stainless steel water bottle to keep you hydrated while pursuing your goals. Features motivational text and AWW branding.",
      image: "https://images.unsplash.com/photo-1597722357072-aaa91dcb83fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGJvdHRsZSUyMG1vdGl2YXRpb25hbHxlbnwxfHx8fDE3NTk3ODc3ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Accessories",
      colors: ["Orange", "Silver"],
      rating: 4.5,
      reviews: 22,
      inStock: false,
      featured: false
    },
    {
      id: 6,
      name: "Empowerment Hoodie",
      price: 35,
      originalPrice: 45,
      description: "Cozy hoodie with empowering message. Perfect for casual wear and showing your support for women empowerment.",
      image: "https://images.unsplash.com/photo-1721746713750-36af79feb4cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob29kaWUlMjBzd2VhdHNoaXJ0JTIwd29tZW58ZW58MXx8fHwxNzU5Nzg3NzgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Apparel",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Orange", "Navy", "Gray"],
      rating: 4.8,
      reviews: 31,
      inStock: true,
      featured: true
    }
  ];

  const categories = ["All", "Apparel", "Accessories", "Stationery"];

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const featuredProducts = products.filter(product => product.featured);

  const addToCart = (product: Product, options: { size?: string; color?: string } = {}) => {
    const cartItem: CartItem = {
      ...product,
      cartId: `${product.id}-${Date.now()}`,
      quantity: 1,
      selectedSize: options.size || (product.sizes ? product.sizes[0] : undefined),
      selectedColor: options.color || product.colors[0]
    };
    setCart(prev => [...prev, cartItem]);
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (cartId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(cartId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.cartId === cartId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#f7941D] to-[#F79520] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-white mb-6"
          >
            AWW Store
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white text-opacity-90 mb-8 max-w-3xl mx-auto"
          >
            Shop our collection of empowering merchandise. Every purchase supports our mission to uplift women.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button 
              onClick={() => setShowCart(true)}
              className="bg-white text-[#f7941D] hover:bg-gray-100 px-6 py-3 rounded-full transition-all duration-200 hover:scale-105"
            >
              <ShoppingCart className="mr-2" size={20} />
              Cart ({getTotalItems()})
            </Button>
          </motion.div>
        </div>
      </section>



      {/* Category Filter */}
      <section className="py-8 bg-gray-100 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-[#004080] text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Products</h2>
            <p className="text-lg text-gray-600">
              {selectedCategory === "All" ? "Browse our complete collection" : `${selectedCategory} products`}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                  <div className="aspect-square overflow-hidden relative">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {product.originalPrice && (
                      <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
                        Sale
                      </Badge>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-[#f7941D] text-white text-xs">
                        {product.category}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star size={12} className="text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-500">{product.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-sm line-clamp-2">{product.name}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        <span className="font-bold text-gray-900">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedProduct(product)}
                        className="w-full text-xs"
                      >
                        Quick View
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className="w-full bg-[#004080] hover:bg-[#003066] text-white text-xs"
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && <ProductDetailModal product={selectedProduct} onAddToCart={addToCart} />}
        </DialogContent>
      </Dialog>

      {/* Cart Modal */}
      <Dialog open={showCart} onOpenChange={setShowCart}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <CartModal 
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            totalPrice={getTotalPrice()}
            onClose={() => setShowCart(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Product Detail Modal Component
function ProductDetailModal({ 
  product, 
  onAddToCart 
}: { 
  product: Product; 
  onAddToCart: (product: Product, options: { size?: string; color?: string }) => void;
}) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const handleAddToCart = () => {
    onAddToCart(product, { size: selectedSize, color: selectedColor });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <div className="aspect-square overflow-hidden rounded-lg">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div>
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="bg-[#f7941D] text-white">
              {product.category}
            </Badge>
            <div className="flex items-center space-x-1">
              {renderStars(product.rating)}
              <span className="text-sm text-gray-500 ml-1">({product.reviews} reviews)</span>
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {product.name}
          </DialogTitle>
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
            )}
            {product.originalPrice && (
              <Badge className="bg-red-100 text-red-800">
                Save ${product.originalPrice - product.price}
              </Badge>
            )}
          </div>
        </DialogHeader>
        
        <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
        
        {product.sizes && (
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Size</h4>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Color</h4>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 rounded-md border transition-all ${
                  selectedColor === color
                    ? 'border-[#f7941D] bg-[#f7941D] text-white'
                    : 'border-gray-300 hover:border-[#f7941D] text-gray-700'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-3">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-[#f7941D] hover:bg-[#F79520] text-white py-3 text-lg"
          >
            {product.inStock ? (
              <>
                <Check className="mr-2" size={18} />
                Add to Cart - ${product.price}
              </>
            ) : (
              'Out of Stock'
            )}
          </Button>
          <Button
            variant="outline"
            className="w-full border-[#004080] text-[#004080] hover:bg-[#004080] hover:text-white py-3"
          >
            <Heart className="mr-2" size={18} />
            Add to Wishlist
          </Button>
        </div>

        <div className="mt-6 text-sm text-gray-500 space-y-1">
          <p>• Free shipping on orders over $50</p>
          <p>• 30-day return policy</p>
          <p>• 100% of proceeds support women empowerment</p>
        </div>
      </div>
    </div>
  );
}

// Cart Modal Component
function CartModal({ 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  totalPrice, 
  onClose 
}: {
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  totalPrice: string;
  onClose: () => void;
}) {
  const handleCheckout = () => {
    toast.success("Proceeding to checkout...");
    // Mock checkout process
    setTimeout(() => {
      toast.success("Thank you for your purchase! Your order is being processed.");
      onClose();
    }, 1000);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center justify-between">
          Shopping Cart ({cart.length} items)
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </DialogTitle>
      </DialogHeader>
      
      <div className="space-y-4">
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
            <Button onClick={onClose} className="bg-[#f7941D] hover:bg-[#F79520] text-white">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="max-h-96 overflow-y-auto space-y-4">
              {cart.map((item) => (
                <div key={item.cartId} className="flex items-center space-x-4 p-4 border rounded-lg bg-white">
                  <div className="w-16 h-16 overflow-hidden rounded-md flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      {item.selectedColor}{item.selectedSize && ` • ${item.selectedSize}`}
                    </p>
                    <p className="font-bold text-[#f7941D]">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.cartId)}
                    className="text-red-500 hover:text-red-700 p-1 transition-colors"
                    title="Remove item"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-medium">Subtotal:</span>
                <span className="font-bold text-gray-900">${totalPrice}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-xl">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-[#f7941D]">${totalPrice}</span>
              </div>
              
              <div className="space-y-2">
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-[#f7941D] hover:bg-[#F79520] text-white py-3 text-lg"
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Continue Shopping
                </Button>
              </div>
              
              <div className="text-center text-sm text-gray-500 mt-4">
                <p>100% of proceeds support women empowerment initiatives</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}