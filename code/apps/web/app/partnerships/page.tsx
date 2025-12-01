'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Building2, Users, Heart, Star, CheckCircle2, ArrowRight, Lightbulb, TrendingUp, Sparkles, DollarSign } from 'lucide-react';
import { ImageWithFallback } from '../../components/ImageWithFallback';

// Animation variants
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

// ScrollReveal component
function ScrollReveal({ children, variants = fadeInUp, className = "" }: {
  children: React.ReactNode;
  variants?: any;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      <div>{children}</div>
    </motion.div>
  );
}

function PartnershipsPage() {
  const partnershipTypes = [
    {
      icon: Users,
      title: "Community Partners",
      description: "Join our network of local organizations, nonprofits, and community groups working together to empower women. Together, we can amplify our impact and reach more women in need.",
      image: "https://images.unsplash.com/photo-1697665387559-253e7a645e96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBwYXJ0bmVycyUyMG5vbnByb2ZpdHxlbnwxfHx8fDE3NjIzODA5MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Measurable Impact",
      description: "Receive detailed reports showing the direct impact of your partnership on women's lives"
    },
    {
      icon: Users,
      title: "Community Connection",
      description: "Build authentic relationships with diverse communities and engage your team in meaningful work"
    },
    {
      icon: Lightbulb,
      title: "Thought Leadership",
      description: "Position your organization as a leader in women's empowerment and social responsibility"
    },
    {
      icon: Heart,
      title: "Brand Alignment",
      description: "Demonstrate your commitment to diversity, equity, and inclusion through action"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="relative h-[350px] bg-gradient-to-br from-[#004080] to-[#003066] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758518729240-7162d07427b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzc3dvbWVuJTIwaGFuZHNoYWtlJTIwcGFydG5lcnNoaXB8ZW58MXx8fHwxNzYyMzg3ODM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Partnerships"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-3xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl mb-6">
                Partner with Us
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 text-white/90"
            >
              Together, we can create lasting change and empower women to reach their full potential
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured Partnerships - PROMINENT SECTION */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#f7941D]/10 to-[#F79520]/5 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#004080]/10 to-blue-500/5 rounded-full blur-3xl -z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f7941D] to-[#F79520] text-white px-6 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Featured Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl text-[#004080] mb-4">
              Our Strategic Partnerships
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Through collaborative partnerships, we've received critical funding to expand our mission of empowering women and strengthening families
            </p>
          </ScrollReveal>

          <div className="space-y-8">
            {/* Spokane Workforce Council - Higher grant amount first */}
            <ScrollReveal variants={slideInLeft}>
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-[#f7941D]/20 bg-gradient-to-br from-white to-orange-50/30">
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="md:col-span-2 bg-gradient-to-br from-[#004080] to-[#003066] p-8 md:p-12 flex flex-col justify-center items-center text-white">
                    <motion.div 
                      className="bg-white p-6 rounded-2xl mb-6 w-full max-w-xs"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img 
                        src="/images/Spokane WorkForce Council.png" 
                        alt="Spokane Workforce Council"
                        className="w-full h-auto object-contain"
                      />
                    </motion.div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <DollarSign className="w-8 h-8 text-[#f7941D]" />
                        <span className="text-5xl font-bold text-[#f7941D]">$30,000</span>
                      </div>
                      <p className="text-white/90 text-lg">Grant Award</p>
                    </div>
                  </div>
                  <div className="md:col-span-3 p-8 md:p-12">
                    <div className="inline-block bg-[#f7941D] text-white px-4 py-1 rounded-full text-sm mb-4">
                      Strategic Partner
                    </div>
                    <h3 className="text-3xl md:text-4xl text-[#004080] mb-4">
                      Spokane Workforce Council
                    </h3>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      A Woman's Worth was awarded a <strong className="text-[#f7941D]">$30,000 grant</strong> from the Spokane Workforce Council to continue our vital work assisting women in their journey toward self-sufficiency through education, employment opportunities, and professional training programs.
                    </p>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      Through this transformative partnership, we've established comprehensive pathways that connect women to essential resources for themselves and their children. Our collaborative approach ensures that when we empower a woman, we strengthen the entire family unit—creating generational impact that extends far beyond individual success stories.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-[#004080]" />
                        <span className="text-[#004080]">Education Support</span>
                      </div>
                      <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-[#004080]" />
                        <span className="text-[#004080]">Employment Training</span>
                      </div>
                      <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-[#004080]" />
                        <span className="text-[#004080]">Family Resources</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            {/* The Way To Justice */}
            <ScrollReveal variants={slideInRight}>
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-[#f7941D]/20 bg-gradient-to-br from-white to-orange-50/30">
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="md:col-span-3 p-8 md:p-12 order-2 md:order-1">
                    <div className="inline-block bg-[#f7941D] text-white px-4 py-1 rounded-full text-sm mb-4">
                      Strategic Partner
                    </div>
                    <h3 className="text-3xl md:text-4xl text-[#004080] mb-4">
                      The Way To Justice
                    </h3>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      A Woman's Worth was honored to receive a <strong className="text-[#f7941D]">$10,000 grant</strong> from The Way To Justice to advance our critical mission of empowering and supporting women who are courageously returning to society after incarceration.
                    </p>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      This partnership has enabled us to provide comprehensive support services, resources, and guidance to women navigating the challenging transition back into their communities. By addressing barriers and creating opportunities, we're not only transforming individual lives but also strengthening families and positively impacting the broader community through successful reintegration and long-term stability.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-[#004080]" />
                        <span className="text-[#004080]">Reintegration Support</span>
                      </div>
                      <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-[#004080]" />
                        <span className="text-[#004080]">Resource Access</span>
                      </div>
                      <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-[#004080]" />
                        <span className="text-[#004080]">Community Impact</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2 bg-gradient-to-br from-[#004080] to-[#003066] p-8 md:p-12 flex flex-col justify-center items-center text-white order-1 md:order-2">
                    <motion.div 
                      className="bg-white p-6 rounded-2xl mb-6 w-full max-w-xs"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img 
                        src="/images/The Way To justice.png" 
                        alt="The Way To Justice"
                        className="w-full h-auto object-contain"
                      />
                    </motion.div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <DollarSign className="w-8 h-8 text-[#f7941D]" />
                        <span className="text-5xl font-bold text-[#f7941D]">$10,000</span>
                      </div>
                      <p className="text-white/90 text-lg">Grant Award</p>
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          </div>

          {/* Partnership Impact Summary */}
          <ScrollReveal className="mt-12">
            <Card className="bg-gradient-to-r from-[#004080] to-[#003066] text-white p-8 md:p-12 text-center border-0">
              <h3 className="text-3xl mb-4">
                Combined Partnership Impact
              </h3>
              <p className="text-xl text-white/90 mb-6 max-w-3xl mx-auto">
                Together, these strategic partnerships have provided <span className="font-bold text-[#f7941D]">$40,000</span> in funding, enabling us to expand our reach, enhance our programs, and create more opportunities for women to build brighter futures for themselves and their families.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-[#f7941D]" />
                  <span>Transforming Lives</span>
                </div>
                <span className="hidden sm:inline text-white/40">•</span>
                <div className="flex items-center gap-2">
                  <Heart className="w-6 h-6 text-[#f7941D]" />
                  <span>Strengthening Families</span>
                </div>
                <span className="hidden sm:inline text-white/40">•</span>
                <div className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-[#f7941D]" />
                  <span>Building Community</span>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-[#004080] mb-4">
              Why Partner With AWW?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your partnership creates meaningful change while providing valuable benefits for your organization
            </p>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-t-4 border-t-[#f7941D]">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#f7941D] to-[#F79520] rounded-full flex items-center justify-center mb-4">
                      <benefit.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl mb-3 text-[#004080]">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-[#004080] mb-4">
              Partnership Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the partnership model that aligns with your organization's mission and values
            </p>
          </ScrollReveal>

          <div className="space-y-12">
            {partnershipTypes.map((type, index) => (
              <ScrollReveal key={index} variants={index % 2 === 0 ? slideInLeft : slideInRight}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                      <ImageWithFallback
                        src={type.image}
                        alt={type.title}
                        className="w-full h-full object-cover min-h-[300px]"
                      />
                    </div>
                    <div className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                      <div className="w-16 h-16 bg-gradient-to-br from-[#f7941D] to-[#F79520] rounded-full flex items-center justify-center mb-6">
                        <type.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl mb-4 text-[#004080]">
                        {type.title}
                      </h3>
                      <p className="text-gray-600 text-lg mb-6">
                        {type.description}
                      </p>
                      <Button className="bg-[#f7941D] hover:bg-[#F79520] text-white w-fit">
                        Learn More <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#004080] to-[#003066] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join our community of partners dedicated to empowering women and creating lasting change
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#f7941D] hover:bg-[#F79520] text-white px-8 py-6 text-lg rounded-full transition-all duration-200 hover:scale-105">
                Become a Partner
              </Button>
              <Button variant="outline" className="bg-white text-[#004080] hover:bg-gray-100 px-8 py-6 text-lg rounded-full transition-all duration-200 hover:scale-105 border-2 border-white">
                Download Partnership Guide
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h3 className="text-3xl text-[#004080] mb-6">
              Questions About Partnerships?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              We'd love to discuss how we can work together to empower women in our community
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="mailto:partnerships@awomansworth.org" className="text-[#f7941D] hover:text-[#F79520] transition-colors text-lg">
                partnerships@awomansworth.org
              </a>
              <span className="hidden sm:inline text-gray-300">|</span>
              <a href="tel:+1234567890" className="text-[#f7941D] hover:text-[#F79520] transition-colors text-lg">
                (123) 456-7890
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

export default PartnershipsPage;