"use client";

import { TrendingUp, TrendingDown, Users, Heart, MessageCircle, Share2 } from 'lucide-react';

export default function Analytics() {
  const metrics = [
    { 
      title: 'Total Reach', 
      value: '245.8K', 
      change: '+18.2%', 
      trending: 'up',
      description: 'People reached this month'
    },
    { 
      title: 'Engagement Rate', 
      value: '12.4%', 
      change: '+2.8%', 
      trending: 'up',
      description: 'Average engagement across platforms'
    },
    { 
      title: 'New Followers', 
      value: '1,284', 
      change: '-3.1%', 
      trending: 'down',
      description: 'Gained this month'
    },
    { 
      title: 'Click-through Rate', 
      value: '4.7%', 
      change: '+0.9%', 
      trending: 'up',
      description: 'From social media to website'
    },
  ];

  const topPosts = [
    {
      id: 1,
      platform: 'Instagram',
      content: 'Beautiful sunset at the beach 🌅',
      engagement: 1247,
      reach: 15420,
      image: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      platform: 'Twitter',
      content: 'Just launched our new product! Excited to share it with everyone.',
      engagement: 892,
      reach: 12300,
      image: null
    },
    {
      id: 3,
      platform: 'LinkedIn',
      content: '5 tips for better social media engagement',
      engagement: 654,
      reach: 8900,
      image: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ];

  const audienceData = [
    { platform: 'Instagram', followers: 45200, growth: '+12.5%' },
    { platform: 'Twitter', followers: 32800, growth: '+8.2%' },
    { platform: 'LinkedIn', followers: 18900, growth: '+15.1%' },
    { platform: 'Facebook', followers: 28600, growth: '+5.8%' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm">Last 30 days</button>
          <button className="btn btn-primary btn-sm">Export Data</button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium opacity-70">{metric.title}</h3>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {metric.trending === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-success" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-error" />
                    )}
                    <span className={`text-sm font-medium ${
                      metric.trending === 'up' ? 'text-success' : 'text-error'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <p className="text-xs opacity-60 mt-1">{metric.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Audience Growth Chart */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Audience Growth</h2>
            <div className="h-64 bg-base-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">+15.2%</div>
                <p className="text-sm opacity-70">Growth this month</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {audienceData.map((data, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                  <div>
                    <p className="font-semibold text-sm">{data.platform}</p>
                    <p className="text-xs opacity-70">{data.followers.toLocaleString()}</p>
                  </div>
                  <span className="text-success text-sm font-medium">{data.growth}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Engagement Overview */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Engagement Overview</h2>
            <div className="h-64 bg-base-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">12.4%</div>
                <p className="text-sm opacity-70">Average engagement rate</p>
              </div>
            </div>
            <div className="stats stats-vertical mt-4">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <Heart className="w-6 h-6" />
                </div>
                <div className="stat-title">Likes</div>
                <div className="stat-value text-primary">89.2K</div>
                <div className="stat-desc">21% more than last month</div>
              </div>
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="stat-title">Comments</div>
                <div className="stat-value text-secondary">12.8K</div>
                <div className="stat-desc">5% more than last month</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Top Performing Posts</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Post</th>
                  <th>Platform</th>
                  <th>Engagement</th>
                  <th>Reach</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {topPosts.map((post) => (
                  <tr key={post.id} className="hover">
                    <td>
                      <div className="flex items-center gap-3">
                        {post.image && (
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={post.image} alt="Post" />
                            </div>
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-sm">{post.content}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-primary badge-sm">{post.platform}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-primary" />
                        {post.engagement.toLocaleString()}
                      </div>
                    </td>
                    <td>{post.reach.toLocaleString()}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="text-success font-medium">High</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}