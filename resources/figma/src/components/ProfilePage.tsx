import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Lock, Bell, Heart, FileText, Settings, Edit, Save, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfilePageProps {
  onPageChange: (page: string) => void;
}

export function ProfilePage({ onPageChange }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    bio: 'Passionate advocate for women empowerment and community building. I believe every woman has the potential to create positive change.',
    location: 'San Francisco, CA',
    joinDate: 'January 2024',
    profileImage: 'https://images.unsplash.com/photo-1646369505567-3a9cbb052342?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhpbnNwaXJhdGlvbmFsJTIwd29tYW4lMjBzcGVha2luZ3xlbnwxfHx8fDE3NTk3ODYzODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    eventReminders: true,
    storyNotifications: false,
    newsletter: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const userStories = [
    {
      id: 1,
      title: "My Journey to Self-Discovery",
      status: "published",
      date: "2024-12-15",
      excerpt: "After years of putting everyone else first, I finally learned to prioritize my own dreams and aspirations...",
      likes: 45,
      comments: 12
    },
    {
      id: 2,
      title: "Breaking Barriers in Tech",
      status: "draft",
      date: "2024-12-20",
      excerpt: "My transition from marketing to software development wasn't easy, but it taught me that it's never too late...",
      likes: 0,
      comments: 0
    },
    {
      id: 3,
      title: "Building Community Connections",
      status: "pending",
      date: "2024-12-18",
      excerpt: "How I started a local women's networking group that has now grown to over 200 members...",
      likes: 0,
      comments: 0
    }
  ];

  const activityHistory = [
    {
      type: 'story',
      action: 'Published a new story',
      title: 'My Journey to Self-Discovery',
      date: '2024-12-15'
    },
    {
      type: 'event',
      action: 'Registered for',
      title: 'Women in Leadership Summit',
      date: '2024-12-10'
    },
    {
      type: 'donation',
      action: 'Made a donation',
      title: '$50 to support the mission',
      date: '2024-12-05'
    },
    {
      type: 'story',
      action: 'Liked a story',
      title: "Sarah's Journey to Leadership",
      date: '2024-12-01'
    }
  ];

  const handleSaveProfile = () => {
    // Mock save functionality
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    // Mock password change
    alert('Password updated successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'story': return <FileText size={16} />;
      case 'event': return <User size={16} />;
      case 'donation': return <Heart size={16} />;
      default: return <User size={16} />;
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Profile Header */}
      <section className="bg-gradient-to-r from-[#f7941D] to-[#F79520] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-white shadow-lg">
                <ImageWithFallback
                  src={profileData.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                <Edit size={16} className="text-gray-600" />
              </button>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {profileData.firstName} {profileData.lastName}
            </h1>
            <p className="text-white text-opacity-90 mb-4">{profileData.location}</p>
            <Badge className="bg-white text-[#f7941D] mb-4">
              Member since {profileData.joinDate}
            </Badge>
            <p className="text-white text-opacity-90 max-w-2xl mx-auto">
              {profileData.bio}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="stories">My Stories</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Personal Information</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    >
                      {isEditing ? <Save size={16} /> : <Edit size={16} />}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <Input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <Input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <Input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <Input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <Textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Community Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#f7941D] mb-2">3</div>
                        <div className="text-gray-600">Stories Shared</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#f7941D] mb-2">57</div>
                        <div className="text-gray-600">Likes Received</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#f7941D] mb-2">5</div>
                        <div className="text-gray-600">Events Attended</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#f7941D] mb-2">$150</div>
                        <div className="text-gray-600">Total Donated</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Stories Tab */}
            <TabsContent value="stories" className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Stories</h2>
                <Button 
                  onClick={() => onPageChange('stories')}
                  className="bg-[#f7941D] hover:bg-[#F79520] text-white"
                >
                  Share New Story
                </Button>
              </div>
              <div className="space-y-4">
                {userStories.map((story) => (
                  <Card key={story.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{story.title}</h3>
                            <Badge className={getStatusColor(story.status)}>
                              {story.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{story.excerpt}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Published on {story.date}</span>
                            {story.status === 'published' && (
                              <>
                                <span>•</span>
                                <span>{story.likes} likes</span>
                                <span>•</span>
                                <span>{story.comments} comments</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          {story.status === 'published' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => onPageChange('stories')}
                            >
                              View
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activityHistory.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 p-2 bg-white rounded-full">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900">
                            <span className="font-medium">{activity.action}</span>
                            {' '}
                            <span className="text-[#f7941D]">{activity.title}</span>
                          </p>
                          <p className="text-sm text-gray-500">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bell size={20} />
                      <span>Notification Preferences</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Updates</p>
                        <p className="text-sm text-gray-500">Receive updates about new features and community news</p>
                      </div>
                      <Switch
                        checked={notifications.emailUpdates}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, emailUpdates: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Event Reminders</p>
                        <p className="text-sm text-gray-500">Get reminded about upcoming events you've registered for</p>
                      </div>
                      <Switch
                        checked={notifications.eventReminders}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, eventReminders: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Story Notifications</p>
                        <p className="text-sm text-gray-500">Get notified when someone likes or comments on your stories</p>
                      </div>
                      <Switch
                        checked={notifications.storyNotifications}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, storyNotifications: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Newsletter</p>
                        <p className="text-sm text-gray-500">Monthly newsletter with inspiring stories and updates</p>
                      </div>
                      <Switch
                        checked={notifications.newsletter}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, newsletter: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Lock size={20} />
                      <span>Change Password</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <Input
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <Input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <Input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="bg-[#004080] hover:bg-[#003066] text-white"
                      >
                        Update Password
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}