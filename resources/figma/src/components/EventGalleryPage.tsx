import { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, X, Calendar, MapPin, Users, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function EventGalleryPage() {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [uploadData, setUploadData] = useState({
    eventName: '',
    description: '',
    photographer: ''
  });

  const events = [
    { id: 'all', name: 'All Events' },
    { id: 'leadership-summit-2025', name: 'Leadership Summit 2025' },
    { id: 'entrepreneurship-workshop', name: 'Entrepreneurship Workshop' },
    { id: 'wellness-retreat', name: 'Wellness Retreat' },
    { id: 'financial-literacy', name: 'Financial Literacy Workshop' }
  ];

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1693893217892-0517da6a46f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHdvcmtzaG9wJTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3NTk3ODYzODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Opening Keynote",
      event: "Leadership Summit 2025",
      eventId: "leadership-summit-2025",
      date: "March 15, 2025",
      photographer: "Sarah Johnson",
      description: "Inspiring opening keynote speech by renowned speaker Dr. Maria Rodriguez",
      attendees: 200,
      location: "Downtown Convention Center"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1646369505567-3a9cbb052342?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnNwaXJhdGlvbmFsJTIwd29tYW4lMjBzcGVha2luZ3xlbnwxfHx8fDE3NTk3ODYzODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Panel Discussion",
      event: "Leadership Summit 2025",
      eventId: "leadership-summit-2025",
      date: "March 15, 2025",
      photographer: "Mike Chen",
      description: "Panel discussion on women in leadership featuring industry experts",
      attendees: 200,
      location: "Downtown Convention Center"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1611331023516-6ec931575ecc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGNlbGVicmF0aW5nJTIwc3VjY2Vzc3xlbnwxfHx8fDE3NTk3ODYzMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Networking Session",
      event: "Entrepreneurship Workshop",
      eventId: "entrepreneurship-workshop",
      date: "March 22, 2025",
      photographer: "Lisa Anderson",
      description: "Women entrepreneurs connecting and sharing experiences",
      attendees: 50,
      location: "Business Innovation Hub"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1587579919988-e2ba60d91283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXBvd2VyZWQlMjB3b21lbiUyMGxlYWRlcnNoaXB8ZW58MXx8fHwxNzU5Nzg2MzIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Business Planning Workshop",
      event: "Entrepreneurship Workshop",
      eventId: "entrepreneurship-workshop",
      date: "March 22, 2025",
      photographer: "Rachel Kim",
      description: "Hands-on workshop session on creating effective business plans",
      attendees: 50,
      location: "Business Innovation Hub"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1676629650907-d50f2f27db20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGNvbW11bml0eSUyMHN1cHBvcnR8ZW58MXx8fHwxNzU5Nzg2MzIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Group Meditation",
      event: "Wellness Retreat",
      eventId: "wellness-retreat",
      date: "April 5, 2025",
      photographer: "Emma Wilson",
      description: "Peaceful group meditation session during the wellness retreat",
      attendees: 30,
      location: "Serenity Wellness Center"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/flagged/photo-1570088830605-b410ac0ba20c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub25wcm9maXQlMjBjb21tdW5pdHklMjBldmVudHxlbnwxfHx8fDE3NTk3MzY3NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Community Gathering",
      event: "Financial Literacy Workshop",
      eventId: "financial-literacy",
      date: "February 20, 2025",
      photographer: "David Park",
      description: "Community members gathering for financial education session",
      attendees: 40,
      location: "Community Learning Center"
    }
  ];

  const filteredImages = selectedEvent === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.eventId === selectedEvent);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock upload functionality
    alert('Images uploaded successfully! They will be reviewed and added to the gallery.');
    setShowUploadModal(false);
    setUploadData({ eventName: '', description: '', photographer: '' });
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
            Event Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white text-opacity-90 mb-8 max-w-3xl mx-auto"
          >
            Relive the inspiring moments from our events and workshops. See the community we're building together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button 
              onClick={() => setShowUploadModal(true)}
              className="bg-white text-[#f7941D] hover:bg-gray-100 px-6 py-3 rounded-full transition-all duration-200 hover:scale-105"
            >
              <Upload className="mr-2" size={20} />
              Upload Event Images
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Event Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {events.map((event) => (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event.id)}
                className={`px-6 py-2 rounded-full transition-all duration-200 ${
                  selectedEvent === event.id
                    ? 'bg-[#f7941D] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {event.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="aspect-video overflow-hidden relative">
                    <ImageWithFallback
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white rounded-full p-2">
                          <Eye className="text-gray-700" size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-[#f7941D] text-white text-xs">
                        {image.event}
                      </Badge>
                      <span className="text-xs text-gray-500">{image.date}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{image.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{image.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Users size={12} />
                        <span>{image.attendees} attendees</span>
                      </div>
                      <span>by {image.photographer}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No images found for the selected event.</p>
              <Button 
                onClick={() => setShowUploadModal(true)}
                className="bg-[#f7941D] hover:bg-[#F79520] text-white"
              >
                Be the first to upload images
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Gallery Statistics</h2>
            <p className="text-lg text-gray-600">A glimpse of our community impact</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-[#f7941D] mb-2">{galleryImages.length}</div>
              <div className="text-gray-600">Photos Captured</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-[#f7941D] mb-2">{events.length - 1}</div>
              <div className="text-gray-600">Events Documented</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-[#f7941D] mb-2">570+</div>
              <div className="text-gray-600">Women Featured</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-[#f7941D] mb-2">6</div>
              <div className="text-gray-600">Photographers</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden p-0">
          {selectedImage && (
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
              >
                <X size={20} />
              </button>
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h2>
                    <Badge className="bg-[#f7941D] text-white mb-2">{selectedImage.event}</Badge>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center mb-1">
                      <Calendar size={14} className="mr-1" />
                      {selectedImage.date}
                    </div>
                    <div className="flex items-center mb-1">
                      <MapPin size={14} className="mr-1" />
                      {selectedImage.location}
                    </div>
                    <div className="flex items-center">
                      <Users size={14} className="mr-1" />
                      {selectedImage.attendees} attendees
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{selectedImage.description}</p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-gray-500">
                    Photographed by <span className="font-medium">{selectedImage.photographer}</span>
                  </span>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                    <Button size="sm" className="bg-[#f7941D] hover:bg-[#F79520] text-white">
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Upload Modal */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
              Upload Event Images
            </DialogTitle>
            <p className="text-gray-600">
              Share your photos from AWW events to help document our community's journey.
            </p>
          </DialogHeader>
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Name
              </label>
              <select
                value={uploadData.eventName}
                onChange={(e) => setUploadData({ ...uploadData, eventName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7941D]"
                required
              >
                <option value="">Select an event</option>
                {events.slice(1).map((event) => (
                  <option key={event.id} value={event.name}>{event.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photographer Name
              </label>
              <Input
                type="text"
                value={uploadData.photographer}
                onChange={(e) => setUploadData({ ...uploadData, photographer: e.target.value })}
                placeholder="Your name or photographer's name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Input
                type="text"
                value={uploadData.description}
                onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                placeholder="Brief description of the photos"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#f7941D] transition-colors">
                <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 mb-2">Drag and drop your images here, or click to browse</p>
                <p className="text-sm text-gray-500">Supports JPG, PNG, GIF (max 10MB each)</p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4"
                >
                  Choose Files
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Upload Guidelines</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Please only upload photos you have permission to share</li>
                <li>• Images will be reviewed before appearing in the gallery</li>
                <li>• High-quality photos that showcase our events are preferred</li>
                <li>• Respect privacy - avoid photos with personal information visible</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#f7941D] hover:bg-[#F79520] text-white"
              >
                Upload Images
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}