'use client';

import { Product } from '@/app/types';
import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || '';

  const handleAddToCart = () => {
    addToCart(product);
  };

  // Get the first image from the images array
  const firstImage = product.images?.data?.[0];
  const imageUrl = firstImage?.attributes?.url;
  const imageAlt = firstImage?.attributes?.alternativeText || product.name;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-w-1 aspect-h-1 w-full h-64 relative bg-gray-200">
        {imageUrl ? (
          <Image
            src={`${CMS_URL}${imageUrl}`}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <svg
              className="h-12 w-12"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        {product.category && (
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        )}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={product.inventory === 0}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              product.inventory === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
        
        {product.inventory > 0 && product.inventory <= 5 && (
          <p className="text-red-600 text-sm mt-2">Only {product.inventory} left in stock!</p>
        )}
        
        {/* Show image count if multiple images */}
        {product.images?.data && product.images.data.length > 1 && (
          <p className="text-gray-500 text-xs mt-2">
            {product.images.data.length} images available
          </p>
        )}
      </div>
    </div>
  );
}