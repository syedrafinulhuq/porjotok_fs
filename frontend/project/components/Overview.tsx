"use client";

import { TrendingUp, Users, Heart, MessageCircle, Share2, Eye } from 'lucide-react';

export default function Overview() {
  const stats = [
    { title: 'Total Followers', value: '124.8K', change: '+12.5%', icon: Users, color: 'text-primary' },
    { title: 'Engagement Rate', value: '8.2%', change: '+2.1%', icon: Heart, color: 'text-secondary' },
    { title: 'Total Posts', value: '1,247', change: '+23', icon: MessageCircle, color: 'text-accent' },
    { title: 'Reach', value: '89.2K', change: '+5.8%', icon: Eye, color: 'text-info' },
  ];

  const recentPosts = [
    {
      id: 1,
      platform: 'Instagram',
      content: 'Beautiful sunset at the beach 🌅',
      likes: 1247,
      comments: 89,
      shares: 23,
      time: '2 hours ago',
      image: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      platform: 'Twitter',
      content: 'Just launched our new product! Excited to share it with everyone.',
      likes: 892,
      comments: 156,
      shares: 67,
      time: '4 hours ago',
      image: null
    },
    {
      id: 3,
      platform: 'LinkedIn',
      content: 'Tips for better travel',
      likes: 456,
      comments: 34,
      shares: 89,
      time: '1 day ago',
      image: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm">Last 7 days</button>
          <button className="btn btn-primary btn-sm">Export Report</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-success">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-base-200 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Recent Posts</h2>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex gap-4 p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt="Post" 
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="badge badge-primary badge-sm">{post.platform}</span>
                      <span className="text-xs opacity-70">{post.time}</span>
                    </div>
                    <p className="text-sm mb-2">{post.content}</p>
                    <div className="flex gap-4 text-xs opacity-70">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {post.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="w-3 h-3" />
                        {post.shares}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Platform Performance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">IG</span>
                  </div>
                  <div>
                    <p className="font-semibold">Instagram</p>
                    <p className="text-sm opacity-70">45.2K followers</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-success font-semibold">+12.5%</p>
                  <p className="text-xs opacity-70">vs last week</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">TW</span>
                  </div>
                  <div>
                    <p className="font-semibold">Twitter</p>
                    <p className="text-sm opacity-70">32.8K followers</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-success font-semibold">+8.2%</p>
                  <p className="text-xs opacity-70">vs last week</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">LI</span>
                  </div>
                  <div>
                    <p className="font-semibold">LinkedIn</p>
                    <p className="text-sm opacity-70">18.9K connections</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-success font-semibold">+15.1%</p>
                  <p className="text-xs opacity-70">vs last week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}