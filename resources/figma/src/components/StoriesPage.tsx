import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Heart, Share2, Plus, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function StoriesPage() {
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    email: '',
    story: '',
    category: 'inspiration'
  });

  const stories = [
    {
      id: 1,
      title: "Sarah's Journey to Leadership",
      author: "Sarah M.",
      category: "Leadership",
      excerpt: "From struggling single mother to CEO, Sarah's story inspires us all to believe in our potential and never give up on our dreams...",
      content: "Sarah's journey began five years ago when she found herself as a single mother of two, working three part-time jobs just to make ends meet. Despite the overwhelming challenges, she refused to let her circumstances define her future...",
      image: "https://images.unsplash.com/photo-1646369505567-3a9cbb052342?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnNwaXJhdGlvbmFsJTIwd29tYW4lMjBzcGVha2luZ3xlbnwxfHx8fDE3NTk3ODYzODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 234,
      date: "2025-02-15"
    },
    {
      id: 2,
      title: "Breaking Barriers in Tech",
      author: "Maria L.",
      category: "Career Change",
      excerpt: "Maria's transition from teacher to software engineer shows that it's never too late to chase your dreams and make a career pivot...",
      content: "After 15 years in education, Maria decided to pursue her childhood dream of working in technology. At 38, she enrolled in a coding bootcamp while still teaching full-time...",
      image: "https://images.unsplash.com/photo-1693893217892-0517da6a46f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHdvcmtzaG9wJTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3NTk3ODYzODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 189,
      date: "2025-02-10"
    },
    {
      id: 3,
      title: "Community Builder",
      author: "Rachel K.",
      category: "Community Impact",
      excerpt: "How Rachel transformed her neighborhood through grassroots organizing and community outreach, proving that one person can make a difference...",
      content: "Rachel noticed that her neighborhood lacked resources for families and children. Instead of waiting for someone else to take action, she decided to become the change she wanted to see...",
      image: "https://images.unsplash.com/flagged/photo-1570088830605-b410ac0ba20c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub25wcm9maXQlMjBjb21tdW5pdHklMjBldmVudHxlbnwxfHx8fDE3NTk3MzY3NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 156,
      date: "2025-02-05"
    },
    {
      id: 4,
      title: "Overcoming Adversity",
      author: "Jennifer R.",
      category: "Personal Growth",
      excerpt: "Jennifer's story of overcoming personal challenges and finding strength in vulnerability resonates with women facing similar struggles...",
      content: "Jennifer's path to self-discovery wasn't easy. After years of putting everyone else's needs before her own, she found herself lost and disconnected from her true self...",
      image: "https://images.unsplash.com/photo-1587579919988-e2ba60d91283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXBvd2VyZWQlMjB3b21lbiUyMGxlYWRlcnNoaXB8ZW58MXx8fHwxNzU5Nzg2MzIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 203,
      date: "2025-01-28"
    },
    {
      id: 5,
      title: "The Entrepreneur's Path",
      author: "Lisa T.",
      category: "Business",
      excerpt: "Lisa's journey from corporate executive to successful business owner shows how taking calculated risks can lead to extraordinary rewards...",
      content: "Lisa had climbed the corporate ladder successfully, but she felt unfulfilled. At 45, she made the bold decision to leave her six-figure salary to start her own consulting firm...",
      image: "https://images.unsplash.com/photo-1676629650907-d50f2f27db20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGNvbW11bml0eSUyMHN1cHBvcnR8ZW58MXx8fHwxNzU5Nzg2MzIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 178,
      date: "2025-01-20"
    },
    {
      id: 6,
      title: "Finding My Voice",
      author: "Diana C.",
      category: "Personal Growth",
      excerpt: "Diana's transformation from shy introvert to confident public speaker demonstrates the power of stepping outside your comfort zone...",
      content: "Diana had always been the quiet one in every room. Public speaking was her greatest fear, but she knew that to advance in her career, she needed to overcome this challenge...",
      image: "https://images.unsplash.com/photo-1611331023516-6ec931575ecc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGNlbGVicmF0aW5nJTIwc3VjY2Vzc3xlbnwxfHx8fDE3NTk3ODYzMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 167,
      date: "2025-01-15"
    }
  ];

  const categories = ["All", "Leadership", "Career Change", "Community Impact", "Personal Growth", "Business"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredStories = selectedCategory === "All" 
    ? stories 
    : stories.filter(story => story.category === selectedCategory);

  const handleSubmitStory = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    alert('Thank you for sharing your story! We will review it and get back to you soon.');
    setShowSubmissionForm(false);
    setFormData({ title: '', authorName: '', email: '', story: '', category: 'inspiration' });
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#f7941D] to-[#F79520] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-white mb-6"
          >
            Women's Stories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white text-opacity-90 mb-8 max-w-3xl mx-auto"
          >
            Every woman has a story worth telling. Read inspiring journeys of courage, resilience, and triumph.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button 
              onClick={() => setShowSubmissionForm(true)}
              className="bg-white text-[#f7941D] hover:bg-gray-100 px-8 py-3 text-lg rounded-full transition-all duration-200 hover:scale-105"
            >
              <Plus className="mr-2" size={20} />
              Share Your Story
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-[#f7941D] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                  <div className="aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#f7941D] bg-orange-50 px-3 py-1 rounded-full">
                          {story.category}
                        </span>
                        <span className="text-sm text-gray-500">{story.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{story.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{story.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">by {story.author}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Heart size={16} />
                          <span className="text-sm">{story.likes}</span>
                        </div>
                        <button 
                          onClick={() => setSelectedStory(story)}
                          className="text-[#f7941D] hover:text-[#F79520] font-medium inline-flex items-center"
                        >
                          Read More <ArrowRight className="ml-1" size={16} />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Detail Modal */}
      <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedStory && (
            <div>
              <DialogHeader>
                <div className="aspect-video overflow-hidden rounded-lg mb-4">
                  <ImageWithFallback
                    src={selectedStory.image}
                    alt={selectedStory.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-[#f7941D] bg-orange-50 px-3 py-1 rounded-full">
                    {selectedStory.category}
                  </span>
                  <span className="text-sm text-gray-500">{selectedStory.date}</span>
                </div>
                <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedStory.title}
                </DialogTitle>
                <p className="text-gray-600 mb-4">by {selectedStory.author}</p>
              </DialogHeader>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{selectedStory.content}</p>
              </div>
              <div className="flex items-center justify-between mt-6 pt-6 border-t">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-[#f7941D] transition-colors">
                    <Heart size={20} />
                    <span>{selectedStory.likes} likes</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-[#f7941D] transition-colors">
                    <Share2 size={20} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Submission Form Modal */}
      <Dialog open={showSubmissionForm} onOpenChange={setShowSubmissionForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
              Share Your Story
            </DialogTitle>
            <p className="text-gray-600">
              Your story has the power to inspire and empower other women. Share your journey with our community.
            </p>
          </DialogHeader>
          <form onSubmit={handleSubmitStory} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <Input
                  type="text"
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Story Title
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Give your story a compelling title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7941D]"
              >
                <option value="inspiration">Inspiration</option>
                <option value="leadership">Leadership</option>
                <option value="career">Career Change</option>
                <option value="community">Community Impact</option>
                <option value="personal">Personal Growth</option>
                <option value="business">Business</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Story
              </label>
              <Textarea
                value={formData.story}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                placeholder="Share your journey, challenges, triumphs, and lessons learned..."
                rows={8}
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowSubmissionForm(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#f7941D] hover:bg-[#F79520] text-white"
              >
                Submit Story
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}