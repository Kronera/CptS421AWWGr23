import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { StoriesPage } from './components/StoriesPage';
import { EventsPage } from './components/EventsPage';
import { EventGalleryPage } from './components/EventGalleryPage';
import { StorePage } from './components/StorePage';
import { DonationPage } from './components/DonationPage';
import { ProfilePage } from './components/ProfilePage';
import { ContactPage } from './components/ContactPage';
import { PartnershipsPage } from './components/PartnershipsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={handlePageChange} />;
      case 'stories':
        return <StoriesPage />;
      case 'events':
        return <EventsPage onPageChange={handlePageChange} />;
      case 'event-gallery':
        return <EventGalleryPage />;
      case 'store':
        return <StorePage />;
      case 'donate':
        return <DonationPage />;
      case 'partnerships':
        return <PartnershipsPage />;
      case 'profile':
        return <ProfilePage onPageChange={handlePageChange} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      {/* Floating Profile Button - Completely Remade */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 0.8 
        }}
      >
        <motion.button
          onClick={() => handlePageChange('profile')}
          className="relative w-14 h-14 bg-gradient-to-br from-[#f7941D] to-[#F79520] text-white rounded-full shadow-lg flex items-center justify-center group overflow-hidden"
          title="Sarah Martinez - My Profile"
          whileHover={{ 
            scale: 1.15,
            rotate: [0, -10, 10, 0],
            boxShadow: "0 25px 50px -12px rgba(247, 148, 29, 0.4)"
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 15 
          }}
        >
          {/* Background gradient animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#F79520] to-[#f7941D] rounded-full"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* User initials */}
          <motion.div 
            className="relative z-10 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/40 shadow-inner"
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "rgba(255, 255, 255, 0.3)"
            }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <span className="text-sm font-bold tracking-wide">SM</span>
          </motion.div>
          
          {/* Animated ring effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/30"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ 
              scale: [1, 1.3, 1.5],
              opacity: [0.6, 0.3, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          
          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/20"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.button>
        
        {/* Profile tooltip */}
        <motion.div
          className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          initial={{ y: 10, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
        >
          Sarah Martinez
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
        </motion.div>
      </motion.div>
    </div>
  );
}