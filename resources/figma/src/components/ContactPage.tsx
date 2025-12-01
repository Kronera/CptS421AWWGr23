import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import teamPhoto1 from 'figma:asset/5ad9db1d3c33660903b06817608d8610a55a22d9.png';
import teamPhoto2 from 'figma:asset/48162ea9089758cc10d2faa8dbe2bd5a43faeb66.png';
import teamPhoto3 from 'figma:asset/3ed3c2131dc765c2d7f7c62e4e6acac51aadffcc.png';
import teamPhoto4 from 'figma:asset/d5948d09cd8c97a27cce078a11659528720a40c2.png';
import teamPhoto5 from 'figma:asset/a1f8d94615401a0aebdbf726ded21dd040b5a52e.png';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '', inquiryType: 'general' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email Us',
      content: 'info@awomansWorth.org',
      description: 'Send us an email anytime'
    },
    {
      icon: <Phone size={24} />,
      title: 'Call Us',
      content: '(555) 123-4567',
      description: 'Mon-Fri, 9am-5pm EST'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Visit Us',
      content: '123 Empowerment Street\nCity, State 12345',
      description: 'Our main office location'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'volunteer', label: 'Volunteer Interest' },
    { value: 'media', label: 'Media & Press' },
    { value: 'donation', label: 'Donation Questions' },
    { value: 'events', label: 'Event Information' }
  ];

  const faqItems = [
    {
      question: 'How can I get involved with AWW?',
      answer: 'There are many ways to get involved! You can attend our events, share your story, volunteer your time, or make a donation. Visit our Events page to see upcoming opportunities or use our contact form to express your interest.'
    },
    {
      question: 'Can I share my story anonymously?',
      answer: 'Yes, we understand that some stories are deeply personal. When submitting your story, you can choose to use a pseudonym or share anonymously. We respect your privacy while honoring your courage to share.'
    },
    {
      question: 'How do I register for events?',
      answer: 'You can register for events through our Events page. Most events are free, though some workshops may have a small fee to cover materials. Registration confirmation will be sent to your email.'
    },
    {
      question: 'Are donations tax-deductible?',
      answer: 'Yes! AWW is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the fullest extent allowed by law. You will receive a receipt for your records.'
    },
    {
      question: 'How can my organization partner with AWW?',
      answer: 'We welcome partnerships with organizations that share our mission. Please use our contact form with "Partnership Opportunity" as the inquiry type, and include details about your organization and proposed collaboration.'
    }
  ];

  const teamMembers = [
    {
      name: 'Gaye Hallman',
      role: 'Founder/Executive Director',
      bio: 'Gaye was part of JITA City Church for over 25 years and hosted Open House gatherings through JITA Ministries. She now serves with Victory Faith Ministries as Usher/Security. For 10 years she co-facilitated JITA Annual Stir up the Gift Celebration. She works at the YMCA as a Care Coordinator, is a Certified Peer Counselor, Published Author, Graphic Designer, and Poet.',
      image: teamPhoto1
    },
    {
      name: 'Patricia McClain Osborne',
      role: 'President',
      bio: 'Patricia is Owner/Designer of Patty\'s M~O Designs and Bridal Alteration Specialist. She designs custom apparel for Beyond Pink nonprofit. Former manager at Richard Allen Apartments, President of Spokane Ballet Ensemble, and Spokane President of Women in Networking. Her mission is to help women live and love the skin they are in.',
      image: teamPhoto2
    },
    {
      name: 'Arnita C Hallman',
      role: 'Board Member',
      bio: 'Arnita is a Compliance Director with over 20 years of experience in financial services and serves as a DEIB Ambassador for CLA LLP. Previously Special Assistant to President/CEO of South Central Community Services, Inc. for over 10 years. Passionate about empowering minority women to dream big and reach for the stars.',
      image: teamPhoto3
    },
    {
      name: 'Desiree Thurman',
      role: 'Treasurer',
      bio: 'Desiree has been married for 48 years with three children, three grandchildren, and a great granddaughter. She served in the Air Force as a Computer Tech for over 20 years. After retirement, she started D\'s Devine Transportation and D\'s Dependable Daycare. She helps each woman see the value in their lives one woman at a time.',
      image: teamPhoto4
    },
    {
      name: 'Karen Boone',
      role: 'Outreach Director',
      bio: 'Karen has more than 25 years of experience in the nonprofit sector specializing in social change, community development, and cultural leadership. A Washington State certified crisis & crime victim advocate with over 20 years of service. Motivational speaker, business consultant, empowerment specialist, minister, and life coach. Mother of five and grandmother of eleven.',
      image: teamPhoto5
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#004080] to-[#003066] py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-white mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white text-opacity-90 mb-8 max-w-3xl mx-auto"
          >
            We'd love to hear from you! Whether you have questions, want to get involved, or need support, we're here to help.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center mt-8"
          >
            <p className="text-white text-opacity-80 mb-2">Scroll down to meet our leadership team</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#f7941D]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-8 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-600">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name *
                          </label>
                          <Input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Inquiry Type
                        </label>
                        <select
                          value={formData.inquiryType}
                          onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7941D]"
                        >
                          {inquiryTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <Input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={6}
                          required
                          placeholder="Tell us how we can help you..."
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-[#f7941D] hover:bg-[#F79520] text-white py-3 rounded-full transition-all duration-200 hover:scale-105"
                      >
                        <Send className="mr-2" size={20} />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 p-3 bg-[#f7941D] bg-opacity-10 rounded-lg">
                            <div className="text-[#f7941D]">{info.icon}</div>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 mb-1">{info.title}</h3>
                            <p className="text-gray-900 mb-1 whitespace-pre-line">{info.content}</p>
                            <p className="text-sm text-gray-500">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Office Hours */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock size={20} />
                    <span>Office Hours</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="mr-2" size={16} />
                    Live Chat Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2" size={16} />
                    Schedule a Meeting
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2" size={16} />
                    Subscribe to Newsletter
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl text-[#004080] mb-4">Meet Our Leadership Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The dedicated women leading AWW's mission to empower and support women in our community
              </p>
            </motion.div>
          </div>
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-t-[#f7941D]">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden mb-4 ring-4 ring-[#f7941D] ring-opacity-20">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-2xl text-[#004080] mb-2">{member.name}</h3>
                      <div className="inline-block bg-gradient-to-r from-[#f7941D] to-[#F79520] text-white px-4 py-1 rounded-full text-sm mb-4">
                        {member.role}
                      </div>
                      <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Find answers to common questions about AWW</p>
          </div>
          <div className="space-y-6">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}