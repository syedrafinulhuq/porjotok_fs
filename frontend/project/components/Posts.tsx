"use client";

import { useState } from 'react';
import { Plus, Search, Filter, Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

export default function Posts() {
  const [selectedTab, setSelectedTab] = useState('all');

  const posts = [
    {
      id: 1,
      platform: 'Instagram',
      content: 'Beautiful sunset at the beach 🌅 #nature #photography',
      status: 'published',
      likes: 1247,
      comments: 89,
      shares: 23,
      date: '2024-01-15',
      image: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      platform: 'Twitter',
      content: 'Hello there we went to Tripura to launch our pro mark campaign. #launch #product',
      status: 'published',
      likes: 892,
      comments: 156,
      shares: 67,
      date: '2024-01-14',
      image: null
    },
    {
      id: 3,
      platform: 'LinkedIn',
      content: '5 travel tips for better travel arrangement',
      status: 'scheduled',
      likes: 0,
      comments: 0,
      shares: 0,
      date: '2024-01-16',
      image: null
    },
    {
      id: 4,
      platform: 'Facebook',
      content: 'Behind the scenes of our latest project. The team worked incredibly hard!',
      status: 'draft',
      likes: 0,
      comments: 0,
      shares: 0,
      date: '2024-01-17',
      image: null
    },
  ];

  const filteredPosts = selectedTab === 'all' 
    ? posts 
    : posts.filter(post => post.status === selectedTab);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return 'badge-success';
      case 'scheduled':
        return 'badge-warning';
      case 'draft':
        return 'badge-neutral';
      default:
        return 'badge-neutral';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return 'from-purple-500 to-pink-500';
      case 'Twitter':
        return 'from-blue-400 to-blue-600';
      case 'LinkedIn':
        return 'from-blue-600 to-blue-800';
      case 'Facebook':
        return 'from-blue-500 to-blue-700';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Posts</h1>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="form-control flex-1">
          <div className="input-group">
            <span className="bg-base-200">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search posts..."
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <button className="btn btn-outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed">
        <button 
          className={`tab ${selectedTab === 'all' ? 'tab-active' : ''}`}
          onClick={() => setSelectedTab('all')}
        >
          All Posts
        </button>
        <button 
          className={`tab ${selectedTab === 'published' ? 'tab-active' : ''}`}
          onClick={() => setSelectedTab('published')}
        >
          Published
        </button>
        <button 
          className={`tab ${selectedTab === 'scheduled' ? 'tab-active' : ''}`}
          onClick={() => setSelectedTab('scheduled')}
        >
          Scheduled
        </button>
        <button 
          className={`tab ${selectedTab === 'draft' ? 'tab-active' : ''}`}
          onClick={() => setSelectedTab('draft')}
        >
          Drafts
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
            {post.image && (
              <figure className="px-4 pt-4">
                <img 
                  src={post.image} 
                  alt="Post" 
                  className="rounded-lg w-full h-48 object-cover"
                />
              </figure>
            )}
            <div className="card-body">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 bg-gradient-to-r ${getPlatformColor(post.platform)} rounded-lg flex items-center justify-center`}>
                    <span className="text-white font-bold text-xs">
                      {post.platform.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-semibold text-sm">{post.platform}</span>
                </div>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
                    <MoreHorizontal className="w-4 h-4" />
                  </label>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Edit</a></li>
                    <li><a>Duplicate</a></li>
                    <li><a>Delete</a></li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className={`badge ${getStatusBadge(post.status)} badge-sm`}>
                  {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                </span>
                <span className="text-xs opacity-70">{post.date}</span>
              </div>

              <p className="text-sm mb-4 line-clamp-3">{post.content}</p>

              {post.status === 'published' && (
                <div className="flex justify-between text-xs opacity-70 border-t pt-3">
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
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Post Modal */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Quick Post</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Select Platform</span>
            </label>
            <select className="select select-bordered w-full">
              <option>Instagram</option>
              <option>Twitter</option>
              <option>LinkedIn</option>
              <option>Facebook</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <textarea 
              className="textarea textarea-bordered h-24" 
              placeholder="What's on your mind?"
            ></textarea>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-outline">Save Draft</button>
            <button className="btn btn-primary">Post Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}