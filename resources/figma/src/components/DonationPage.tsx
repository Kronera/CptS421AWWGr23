import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Shield, CreditCard, Zap, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

export function DonationPage() {
  const [donationAmount, setDonationAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const predefinedAmounts = [25, 50, 100, 250, 500];
  const impactLevels = [
    {
      amount: 25,
      title: "Supporter",
      description: "Helps fund educational materials for one woman",
      icon: "📚"
    },
    {
      amount: 50,
      title: "Advocate",
      description: "Sponsors a workshop session for multiple women",
      icon: "🎯"
    },
    {
      amount: 100,
      title: "Champion",
      description: "Funds a full day workshop for 10 women",
      icon: "🏆"
    },
    {
      amount: 250,
      title: "Leader",
      description: "Sponsors mentorship program for 5 women",
      icon: "👑"
    },
    {
      amount: 500,
      title: "Visionary",
      description: "Funds a complete empowerment program",
      icon: "✨"
    }
  ];

  const getCurrentImpact = () => {
    const amount = customAmount ? parseInt(customAmount) : donationAmount;
    return impactLevels.find(level => level.amount <= amount) || impactLevels[0];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock donation processing
    setShowSuccessModal(true);
  };

  const getCurrentAmount = () => {
    return customAmount ? parseInt(customAmount) || 0 : donationAmount;
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#004080] to-[#003066] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-white mb-6"
          >
            Support Our Mission
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white text-opacity-90 mb-8 max-w-3xl mx-auto"
          >
            Your donation helps us empower women through education, mentorship, and community support. Every contribution makes a difference.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center space-x-8 text-white"
          >
            <div className="text-center">
              <div className="text-3xl font-bold">2,500+</div>
              <div className="text-white text-opacity-80">Women Empowered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">150+</div>
              <div className="text-white text-opacity-80">Workshops Held</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-white text-opacity-80">Community Partners</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Donation Options */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Make a Donation</h2>
              
              {/* Amount Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Choose Amount</h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setDonationAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`p-4 rounded-lg border transition-all ${
                        donationAmount === amount && !customAmount
                          ? 'border-[#f7941D] bg-orange-50 text-[#f7941D]'
                          : 'border-gray-300 hover:border-[#f7941D]'
                      }`}
                    >
                      <div className="text-xl font-bold">${amount}</div>
                    </button>
                  ))}
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="text-center text-lg"
                  />
                </div>
              </div>

              {/* Impact Display */}
              <div className="mb-8">
                <Card className="border-[#f7941D] bg-orange-50">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-2">{getCurrentImpact().icon}</div>
                    <h3 className="text-xl font-bold text-[#f7941D] mb-2">
                      {getCurrentImpact().title} - ${getCurrentAmount()}
                    </h3>
                    <p className="text-gray-700">{getCurrentImpact().description}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recurring Donation */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Make this recurring</h3>
                  <Switch
                    checked={isRecurring}
                    onCheckedChange={setIsRecurring}
                  />
                </div>
                {isRecurring && (
                  <div className="grid grid-cols-3 gap-2">
                    {['monthly', 'quarterly', 'annually'].map((freq) => (
                      <button
                        key={freq}
                        onClick={() => setRecurringFrequency(freq)}
                        className={`p-2 rounded border text-sm transition-all ${
                          recurringFrequency === freq
                            ? 'border-[#f7941D] bg-orange-50 text-[#f7941D]'
                            : 'border-gray-300 hover:border-[#f7941D]'
                        }`}
                      >
                        {freq.charAt(0).toUpperCase() + freq.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Payment Methods */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full p-4 rounded-lg border transition-all flex items-center justify-between ${
                      paymentMethod === 'card'
                        ? 'border-[#f7941D] bg-orange-50'
                        : 'border-gray-300 hover:border-[#f7941D]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard size={20} />
                      <span>Credit / Debit Card</span>
                    </div>
                    <Badge variant="secondary">Recommended</Badge>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className={`w-full p-4 rounded-lg border transition-all flex items-center ${
                      paymentMethod === 'paypal'
                        ? 'border-[#f7941D] bg-orange-50'
                        : 'border-gray-300 hover:border-[#f7941D]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-blue-600 rounded"></div>
                      <span>PayPal</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div>
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Information</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <Input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <Input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    {paymentMethod === 'card' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Card Number
                          </label>
                          <Input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Expiry Date
                            </label>
                            <Input
                              type="text"
                              placeholder="MM/YY"
                              value={formData.expiryDate}
                              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              CVV
                            </label>
                            <Input
                              type="text"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name on Card
                          </label>
                          <Input
                            type="text"
                            value={formData.cardName}
                            onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                            required
                          />
                        </div>
                      </>
                    )}

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="text-green-600" size={16} />
                        <span className="text-sm font-medium text-gray-700">Secure Donation</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Your payment information is encrypted and secure. We never store your card details.
                      </p>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium">
                          {isRecurring ? `${recurringFrequency.charAt(0).toUpperCase() + recurringFrequency.slice(1)} Donation` : 'One-time Donation'}
                        </span>
                        <span className="text-2xl font-bold text-[#f7941D]">
                          ${getCurrentAmount()}
                        </span>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-[#f7941D] hover:bg-[#F79520] text-white py-3 text-lg rounded-full transition-all duration-200 hover:scale-105"
                      >
                        <Heart className="mr-2" size={20} />
                        Donate Securely
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <div className="mt-6 text-center space-y-2">
                <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Shield size={16} className="text-green-600" />
                    <span>SSL Secured</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap size={16} className="text-blue-600" />
                    <span>Instant Receipt</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check size={16} className="text-green-600" />
                    <span>Tax Deductible</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  A Woman's Worth is a registered 501(c)(3) nonprofit organization. EIN: 12-3456789
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Impact in Numbers</h2>
            <p className="text-lg text-gray-600">See how your donations are making a difference</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactLevels.map((level, index) => (
              <motion.div
                key={level.amount}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl mb-4">{level.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">${level.amount}</h3>
                  <h4 className="font-medium text-[#f7941D] mb-2">{level.title}</h4>
                  <p className="text-gray-600 text-sm">{level.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="text-green-600" size={32} />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
              Thank You!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Your generous donation of <span className="font-bold text-[#f7941D]">${getCurrentAmount()}</span> has been processed successfully.
            </p>
            <p className="text-sm text-gray-500">
              You will receive an email receipt shortly. Your contribution helps us continue empowering women in our community.
            </p>
            <div className="flex space-x-2 pt-4">
              <Button
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 bg-[#f7941D] hover:bg-[#F79520] text-white"
              >
                Continue
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowSuccessModal(false);
                  // Reset form or navigate to another page
                }}
                className="flex-1"
              >
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}