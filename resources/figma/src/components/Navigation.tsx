import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import awwLogo from 'figma:asset/82ca8155b3fa21379e7aaa03596e0c5c6a9a7948.png';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'stories', label: 'Stories' },
    { id: 'events', label: 'Events' },
    { id: 'store', label: 'Store' },
    { id: 'partnerships', label: 'Partnerships' },
    { id: 'donate', label: 'Donate' },
    { id: 'contact', label: 'Contact' },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => onPageChange('home')}>
            <img 
              src={awwLogo} 
              alt="A Woman's Worth"
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`relative px-3 py-2 font-medium transition-all duration-300 ${
                  currentPage === item.id
                    ? 'text-[#f7941D]'
                    : 'text-gray-600 hover:text-[#f7941D]'
                }`}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f7941D]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
            <Button 
              onClick={() => onPageChange('donate')}
              className="bg-[#004080] hover:bg-[#003066] text-white px-6 py-2 rounded-full transition-all duration-200 hover:scale-105"
            >
              Donate Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-[#f7941D] transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                    currentPage === item.id
                      ? 'text-[#f7941D] bg-orange-50'
                      : 'text-gray-600 hover:text-[#f7941D] hover:bg-gray-50'
                  }`}
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <Button 
                onClick={() => {
                  onPageChange('donate');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full mt-2 bg-[#004080] hover:bg-[#003066] text-white"
              >
                Donate Now
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}