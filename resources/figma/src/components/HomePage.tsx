import React, { useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Calendar, MapPin, ArrowRight, Quote, ChevronLeft, ChevronRight, Heart, Users, Star, Phone, Mail, MapPin as LocationIcon, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomePageProps {
  onPageChange: (page: string) => void;
}

// Animation variants for reusable animations
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// ScrollReveal component for intersection observer
function ScrollReveal({ children, variants = fadeInUp, className = "" }: {
  children: React.ReactNode;
  variants?: any;
  className?: string;
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HomePage({ onPageChange }: HomePageProps) {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1544155893-127ecf7c18a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwd29tZW4lMjBjZWxlYnJhdGluZyUyMGFjaGlldmVtZW50fGVufDF8fHx8MTc1OTc4NzczNXww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Diverse women celebrating achievement"
    },
    {
      url: "https://images.unsplash.com/photo-1759658249417-b0b0447f53be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGVtcG93ZXJtZW50JTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc1OTc4NzczNnww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Women empowerment community gathering"
    },
    {
      url: "https://images.unsplash.com/photo-1650784853603-bd1ee8fb6712?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21lbiUyMG5ldHdvcmtpbmclMjBldmVudHxlbnwxfHx8fDE3NTk3ODc3MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Professional women networking event"
    },
    {
      url: "https://images.unsplash.com/photo-1650784855038-9f4d5ed154a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHN1cHBvcnRpbmclMjB3b21lbiUyMHRlYW13b3JrfGVufDF8fHx8MTc1OTc4NzczN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Women supporting women teamwork"
    }
  ];

  const featuredStories = [
    {
      image: "https://images.unsplash.com/photo-1507005941618-1ca013b9a018?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwaW5zcGlyYXRpb258ZW58MXx8fHwxNzU5Nzg3MDc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Sarah's Journey to Success",
      excerpt: "From single mother to business owner, Sarah's story shows how community support can transform lives.",
      readTime: "5 min read",
      category: "Entrepreneurship"
    },
    {
      image: "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwd29tZW4lMjBncm91cHxlbnwxfHx8fDE3NTkwOTE0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Breaking Barriers Together",
      excerpt: "How our mentorship program helped Maria overcome obstacles and pursue her dreams in technology.",
      readTime: "7 min read",
      category: "Technology"
    },
    {
      image: "https://images.unsplash.com/photo-1555725305-0406b7607be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGxlYWRlcnNoaXAlMjBjb25mZXJlbmNlJTIwaW5zcGlyaW5nfGVufDF8fHx8MTc1OTc4NzczN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Finding Your Voice",
      excerpt: "Jennifer's powerful story of self-advocacy and how she found her strength through our community.",
      readTime: "6 min read",
      category: "Leadership"
    }
  ];

  const testimonials = [
    {
      quote: "AWW gave me the confidence to start my own business. The support and mentorship I received was life-changing.",
      author: "Maria Rodriguez",
      role: "Entrepreneur & Mother",
      image: "https://images.unsplash.com/photo-1507005941618-1ca013b9a018?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwaW5zcGlyYXRpb258ZW58MXx8fHwxNzU5Nzg3MDc0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      quote: "I found my voice through this incredible community. Every woman should know her worth and potential.",
      author: "Sarah Johnson",
      role: "Community Leader",
      image: "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwd29tZW4lMjBncm91cHxlbnwxfHx8fDE3NTkwOTE0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      quote: "The workshops and events transformed how I see myself. I'm now mentoring other women in my field.",
      author: "Jennifer Chen",
      role: "Tech Professional",
      image: "https://images.unsplash.com/photo-1555725305-0406b7607be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGxlYWRlcnNoaXAlMjBjb25mZXJlbmNlJTIwaW5zcGlyaW5nfGVufDF8fHx8MTc1OTc4NzczN3ww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const upcomingEvents = [
    {
      date: { month: "JAN", day: "15" },
      title: "Women's Leadership Workshop",
      time: "6:00 PM - 8:00 PM",
      location: "Community Center, Downtown",
      attendees: 45,
      spots: 20
    },
    {
      date: { month: "FEB", day: "20" },
      title: "New Year, New Opportunities",
      time: "10:00 AM - 2:00 PM",
      location: "Virtual Event",
      attendees: 120,
      spots: 30
    }
  ];



  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextHeroImage = () => {
    setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevHeroImage = () => {
    setCurrentHeroImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Smaller Size */}
      <section className="relative h-[70vh] min-h-[500px] max-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Images */}
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: index === currentHeroImage ? 1 : 0,
              scale: index === currentHeroImage ? 1 : 1.1
            }}
            transition={{ 
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 8, ease: "linear" }
            }}
          >
            <ImageWithFallback
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover object-center"
            />
            {/* Refined AWW Brand Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f7941D]/80 via-[#F79520]/70 to-[#004080]/50" />
          </motion.div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">


          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight font-bold"
          >
            Refuse to Miss <br />
            <span className="text-yellow-100">
              Your Blessings
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            Empowering women to recognize their worth, embrace their potential, and create lasting change through community support and shared stories.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => onPageChange("donate")}
              size="lg"
              className="bg-[#004080] hover:bg-[#003066] text-white px-8 py-4 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Heart className="mr-2" size={18} />
              Make a Donation
            </Button>
            <Button
              onClick={() => onPageChange("stories")}
              variant="outline"
              size="lg"
              className="border-2 border-white/80 text-white hover:bg-white hover:text-[#f7941D] px-8 py-4 font-semibold rounded-full backdrop-blur-sm bg-white/10 transition-all duration-300 hover:scale-105"
            >
              Read Our Stories
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </motion.div>
        </div>

        {/* Improved Hero Navigation */}
        <motion.button
          onClick={prevHeroImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="text-white" size={20} />
        </motion.button>
        <motion.button
          onClick={nextHeroImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="text-white" size={20} />
        </motion.button>

        {/* Enhanced Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentHeroImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentHeroImage 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </section>



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* About AWW Section */}
        <ScrollReveal>
          <section className="text-center">
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-5xl text-gray-900 mb-6 font-bold"
            >
              About <span className="text-[#f7941D]">A Woman's Worth</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
            >
              We believe every woman has inherent worth and unlimited potential. Through mentorship, community support, 
              and empowerment programs, we help women discover their strength, pursue their dreams, and create positive 
              change in their lives and communities.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button
                onClick={() => onPageChange("stories")}
                size="lg"
                className="bg-gradient-to-r from-[#f7941D] to-[#F79520] hover:from-[#e8830a] hover:to-[#e8830a] text-white px-8 py-3 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Learn More About Our Impact
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </section>
        </ScrollReveal>

        {/* Featured Stories Section */}
        <ScrollReveal variants={staggerContainer}>
          <section>
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl text-gray-900 mb-4 font-bold">
                Featured Stories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real women, real transformations. Discover the inspiring journeys of our community members.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredStories.map((story, index) => (
                <motion.div
                  key={index}
                  variants={index % 2 === 0 ? slideInLeft : slideInRight}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 h-full bg-white">
                    <div className="aspect-video overflow-hidden relative">
                      <ImageWithFallback
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-block px-2 py-1 bg-[#f7941D] text-white text-xs font-medium rounded-full">
                          {story.category}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="inline-block px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full">
                          {story.readTime}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl text-gray-900 mb-3 font-bold group-hover:text-[#f7941D] transition-colors">
                        {story.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {story.excerpt}
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => onPageChange("stories")}
                        className="text-[#f7941D] border-[#f7941D] hover:bg-[#f7941D] hover:text-white transition-all duration-300 w-full group"
                      >
                        Read Full Story
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Upcoming Events Section */}
        <ScrollReveal>
          <section className="bg-gradient-to-br from-gray-50 to-orange-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 rounded-2xl">
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl text-gray-900 mb-4 font-bold">
                Upcoming Events
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join us for inspiring events that bring our community together.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto"
            >
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-6 shadow-lg border-0 hover:shadow-xl transition-all duration-300 bg-white h-full">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-br from-[#f7941D] to-[#F79520] text-white p-3 rounded-xl flex-shrink-0 shadow-md">
                        <div className="text-center">
                          <div className="text-xs font-bold opacity-90">{event.date.month}</div>
                          <div className="text-2xl font-bold">{event.date.day}</div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg text-gray-900 mb-2 font-bold">
                          {event.title}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-1">
                          <Calendar className="h-4 w-4 mr-2 text-[#f7941D]" />
                          <span className="text-sm">{event.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-2 text-[#f7941D]" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                          <Users className="h-4 w-4 mr-2 text-[#f7941D]" />
                          <span className="text-sm">{event.attendees} registered • {event.spots} spots left</span>
                        </div>
                        <Button
                          onClick={() => onPageChange("events")}
                          className="bg-gradient-to-r from-[#f7941D] to-[#F79520] hover:from-[#e8830a] hover:to-[#e8830a] text-white transition-all duration-300 hover:scale-105 w-full font-semibold"
                        >
                          Register Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </ScrollReveal>

        {/* Testimonials Section */}
        <ScrollReveal>
          <section>
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl text-gray-900 mb-4 font-bold">
                What Our Community Says
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hear from the women whose lives have been transformed.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div variants={fadeInUp}>
                <Card className="p-8 shadow-xl border-0 bg-gradient-to-br from-orange-50 via-white to-blue-50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#f7941D]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                  
                  <div className="text-center relative">
                    <Quote className="h-12 w-12 text-[#f7941D] mx-auto mb-6" />
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <p className="text-xl md:text-2xl text-gray-800 leading-relaxed italic font-medium">
                        "{testimonials[currentTestimonial].quote}"
                      </p>
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <ImageWithFallback
                            src={testimonials[currentTestimonial].image}
                            alt={testimonials[currentTestimonial].author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <p className="text-lg text-gray-900 font-bold">
                            {testimonials[currentTestimonial].author}
                          </p>
                          <p className="text-gray-600">
                            {testimonials[currentTestimonial].role}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </Card>

                {/* Testimonial Navigation Dots */}
                <div className="flex justify-center space-x-2 mt-6">
                  {testimonials.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonial 
                          ? 'bg-[#f7941D] scale-125' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal>
          <motion.section 
            variants={fadeInUp}
            className="bg-gradient-to-br from-[#004080] via-[#0056b3] to-[#003066] text-white rounded-2xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-16 translate-y-16"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl mb-6 font-bold">
                Get Involved Today
              </h2>
              <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
                Every woman deserves to know her worth. Join our community and help us create lasting change.
              </p>
              <motion.div 
                variants={staggerContainer}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.div variants={fadeInUp}>
                  <Button
                    onClick={() => onPageChange("donate")}
                    size="lg"
                    className="bg-gradient-to-r from-[#f7941D] to-[#F79520] hover:from-[#e8830a] hover:to-[#e8830a] text-white px-8 py-3 font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <Heart className="mr-2" size={18} />
                    Donate Now
                  </Button>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Button
                    variant="outline"
                    onClick={() => onPageChange("events")}
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-[#004080] px-8 py-3 font-bold rounded-full transition-all duration-300 hover:scale-105"
                  >
                    Join an Event
                  </Button>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Button
                    variant="outline"
                    onClick={() => onPageChange("stories")}
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-[#004080] px-8 py-3 font-bold rounded-full transition-all duration-300 hover:scale-105"
                  >
                    Share Your Story
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>
        </ScrollReveal>
      </div>

      {/* Completely Remade Footer with Color */}
      <footer className="bg-gradient-to-br from-[#004080] via-[#0056b3] to-[#f7941D] text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-white/5 to-transparent rounded-full translate-x-40 translate-y-40"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-[#f7941D]/5 to-[#004080]/5 rounded-full -translate-x-32 -translate-y-32"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#f7941D] to-[#F79520] rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">A</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">A Woman's Worth</h3>
                    <p className="text-gray-400 text-sm">Empowering Women Since 2020</p>
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-lg">
                  Empowering women to recognize their inherent worth and embrace their unlimited potential 
                  through community support, mentorship, and shared stories of transformation.
                </p>
                <div className="flex space-x-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    <Facebook size={20} />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:from-pink-600 hover:to-purple-700 transition-colors shadow-lg"
                  >
                    <Instagram size={20} />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-800 transition-colors shadow-lg"
                  >
                    <Linkedin size={20} />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors shadow-lg"
                  >
                    <Twitter size={20} />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Our Stories', page: 'stories' },
                  { label: 'Upcoming Events', page: 'events' },
                  { label: 'Support Store', page: 'store' },
                  { label: 'Make a Donation', page: 'donate' },
                  { label: 'Event Gallery', page: 'gallery' },
                  { label: 'My Profile', page: 'profile' },
                ].map((link, index) => (
                  <li key={index}>
                    <motion.button
                      onClick={() => onPageChange(link.page)}
                      className="text-gray-300 hover:text-[#f7941D] transition-all duration-300 hover:translate-x-2 flex items-center group"
                      whileHover={{ x: 4 }}
                    >
                      <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold mb-6 text-white">Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#f7941D]/20 rounded-lg flex items-center justify-center">
                    <Mail size={16} className="text-[#f7941D]" />
                  </div>
                  <div>
                    <p className="text-gray-300">info@awomansWorth.org</p>
                    <p className="text-gray-500 text-sm">We'd love to hear from you</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#f7941D]/20 rounded-lg flex items-center justify-center">
                    <Phone size={16} className="text-[#f7941D]" />
                  </div>
                  <div>
                    <p className="text-gray-300">(555) 123-4567</p>
                    <p className="text-gray-500 text-sm">Mon-Fri, 9AM-5PM EST</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#f7941D]/20 rounded-lg flex items-center justify-center mt-1">
                    <LocationIcon size={16} className="text-[#f7941D]" />
                  </div>
                  <div>
                    <p className="text-gray-300">123 Empowerment Street</p>
                    <p className="text-gray-300">Suite 200</p>
                    <p className="text-gray-300">Hope City, HC 12345</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>



          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="border-t border-white/20 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center"
          >
            <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              &copy; 2025 A Woman's Worth. All rights reserved. Made with ❤️ for empowering women everywhere.
            </p>
            <div className="flex space-x-6 text-sm">
              <button className="text-gray-400 hover:text-[#f7941D] transition-colors">Privacy Policy</button>
              <button className="text-gray-400 hover:text-[#f7941D] transition-colors">Terms of Service</button>
              <button className="text-gray-400 hover:text-[#f7941D] transition-colors">Accessibility</button>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}