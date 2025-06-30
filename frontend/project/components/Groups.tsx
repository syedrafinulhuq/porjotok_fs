"use client";

import { useState } from 'react';
import { Users, Plus, Search, Crown, Shield, User, MessageCircle, Calendar, Settings } from 'lucide-react';

export default function Groups() {
  const [activeTab, setActiveTab] = useState('my-groups');

  const myGroups = [
    {
      id: 1,
      name: 'Dhaka Gana',
      description: 'A community for Dhakaiya for travel tips and strategy',
      members: 12500,
      posts: 234,
      category: 'General',
      role: 'Admin',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Bangladesh_Bank_%2833398162476%29.jpg',
      isPrivate: false,
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      name: 'Content Creators Hub',
      description: 'Connect with fellow content creators and share your work',
      members: 8900,
      posts: 156,
      category: 'Creative',
      role: 'Moderator',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=200',
      isPrivate: true,
      lastActivity: '5 hours ago'
    },
    {
      id: 3,
      name: 'Chittagong Travellers',
      description: 'A group for chittagong travel fans',
      members: 15200,
      posts: 89,
      category: 'General',
      role: 'Member',
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Jamburi_Park.jpg',
      isPrivate: false,
      lastActivity: '1 day ago'
    }
  ]

  const suggestedGroups = [
    {
      id: 4,
      name: 'Dhaka Gana',
      description: 'A community for Dhakaiya for travel tips and strategy',
      members: 12500,
      posts: 234,
      category: 'General',
      role: 'Admin',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Bangladesh_Bank_%2833398162476%29.jpg',
      isPrivate: false,
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      name: 'Content Creators Hub',
      description: 'Connect with fellow content creators and share your work',
      members: 8900,
      posts: 156,
      category: 'Creative',
      role: 'Moderator',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=200',
      isPrivate: true,
      lastActivity: '5 hours ago'
    },
    {
      id: 3,
      name: 'Chittagong Travellers',
      description: 'A group for chittagong travel fans',
      members: 15200,
      posts: 89,
      category: 'General',
      role: 'Member',
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Jamburi_Park.jpg',
      isPrivate: false,
      lastActivity: '1 day ago'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      groupName: 'Social Media Marketers',
      activity: 'New post by Rafinul Huq',
      content: 'Just shared my latest case study on Instagram engagement',
      time: '2 hours ago',
      type: 'post'
    },
    {
      id: 5,
      groupName: 'Content Creators Hub',
      activity: 'Samiul joined the group',
      content: '',
      time: '4 hours ago',
      type: 'member'
    },
    {
      id: 6,
      groupName: 'Digital Entrepreneurs',
      activity: 'Event scheduled',
      content: 'Monthly networking meetup - January 25th',
      time: '6 hours ago',
      type: 'event'
    }
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin': return <Crown className="w-4 h-4 text-warning" />;
      case 'Moderator': return <Shield className="w-4 h-4 text-info" />;
      default: return <User className="w-4 h-4 text-base-content/60" />;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin': return 'badge-warning';
      case 'Moderator': return 'badge-info';
      default: return 'badge-neutral';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Groups</h1>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Create Group
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
              placeholder="Search groups..."
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <select className="select select-bordered">
          <option>All Categories</option>
          <option>Marketing</option>
          <option>Creative</option>
          <option>Business</option>
          <option>Technology</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed">
        <button
          className={`tab ${activeTab === 'my-groups' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('my-groups')}
        >
          My Groups
        </button>
        <button
          className={`tab ${activeTab === 'suggested' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('suggested')}
        >
          Suggested
        </button>
        <button
          className={`tab ${activeTab === 'activity' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          Recent Activity
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'my-groups' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {myGroups.map((group) => (
            <div key={group.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <figure className="px-4 pt-4">
                <img
                  src={group.image}
                  alt={group.name}
                  className="rounded-lg w-full h-32 object-cover"
                />
              </figure>
              <div className="card-body">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="card-title text-lg">{group.name}</h2>
                  {group.isPrivate && (
                    <div className="badge badge-outline badge-sm">Private</div>
                  )}
                </div>

                <p className="text-sm opacity-70 mb-3">{group.description}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4 text-sm opacity-70">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {group.members.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {group.posts}
                    </span>
                  </div>
                  <span className={`badge ${getRoleBadge(group.role)} badge-sm flex items-center gap-1`}>
                    {getRoleIcon(group.role)}
                    {group.role}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs opacity-60">Active {group.lastActivity}</span>
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
                      <Settings className="w-4 h-4" />
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li><a>View Group</a></li>
                      <li><a>Group Settings</a></li>
                      <li><a>Leave Group</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'suggested' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {suggestedGroups.map((group) => (
            <div key={group.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <figure className="px-4 pt-4">
                <img
                  src={group.image}
                  alt={group.name}
                  className="rounded-lg w-full h-32 object-cover"
                />
              </figure>
              <div className="card-body">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="card-title text-lg">{group.name}</h2>
                  {group.isPrivate && (
                    <div className="badge badge-outline badge-sm">Private</div>
                  )}
                </div>

                <p className="text-sm opacity-70 mb-3">{group.description}</p>

                <div className="flex items-center gap-4 text-sm opacity-70 mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {group.members.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {group.posts}
                  </span>
                  <span className="badge badge-primary badge-sm">{group.category}</span>
                </div>

                <div className="card-actions">
                  <button className="btn btn-primary btn-sm flex-1">
                    {group.isPrivate ? 'Request to Join' : 'Join Group'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 bg-base-200 rounded-lg">
                  <div className="flex-shrink-0">
                    {activity.type === 'post' && (
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-primary" />
                      </div>
                    )}
                    {activity.type === 'member' && (
                      <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-success" />
                      </div>
                    )}
                    {activity.type === 'event' && (
                      <div className="w-10 h-10 bg-info/10 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-info" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm">{activity.groupName}</h3>
                      <span className="text-xs opacity-70">{activity.time}</span>
                    </div>
                    <p className="text-sm opacity-80 mb-1">{activity.activity}</p>
                    {activity.content && (
                      <p className="text-sm opacity-70">{activity.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Total Groups</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Admin Groups</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <Crown className="w-8 h-8 text-warning" />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Total Members</p>
                <p className="text-2xl font-bold">36.6K</p>
              </div>
              <Shield className="w-8 h-8 text-info" />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Active Today</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <MessageCircle className="w-8 h-8 text-success" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}