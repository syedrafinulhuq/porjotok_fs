"use client";

import { Search, TrendingUp, Users, Heart, MessageCircle, Share2, UserPlus, Eye } from 'lucide-react';

export default function Explore() {
  const trendingTopics = [
    { tag: '#SocialMediaTips', posts: '12.5K', growth: '+15%' },
    { tag: '#DigitalMarketing', posts: '8.9K', growth: '+22%' },
    { tag: '#ContentCreation', posts: '15.2K', growth: '+8%' },
    { tag: '#BrandStrategy', posts: '6.7K', growth: '+31%' },
    { tag: '#InfluencerMarketing', posts: '9.1K', growth: '+12%' }
  ];

  const popularPosts = [
    {
      id: 1,
      author: 'Shah Asif Mahbub',
      username: '@asif_anime',
      avatar: 'https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-6/497700642_4076359236016620_5210080379354121256_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGJf-2JZHL8F3cYdWLzZNkcwECW3eRAjEPAQJbd5ECMQ9uZas2hGzLhGLUhmoTtHucefMOQb2WAQebaW5ybdxUJ&_nc_ohc=TNjvXuHpvuYQ7kNvwEHh3bO&_nc_oc=Adl5oTabL0HJOSEhqreCEO0yVXucvXy7gYEiPzkLiHL61tAAfSjQug3n9Vco-dB3FIU&_nc_zt=23&_nc_ht=scontent.fdac138-1.fna&_nc_gid=L5BwFR5_X36WR2IaozUf9w&oh=00_AfMIBUoA_1LQ6nJr0yIxZMWmgWGFad03kNqlCbfKvLkGzw&oe=68669ECF',
      content: 'New art 🚀',
      platform: 'LinkedIn',
      likes: 2847,
      comments: 156,
      shares: 89,
      time: '2h ago',
      image: 'https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-6/511545355_4117697678549442_1554811980927505766_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHg1Ik-LfbZJTUR502mkZFaWkAlKYf1x5xaQCUph_XHnFLs1wGuYHRSKuvzwMCztOkwsiTeL0IRoAgxnxdayYvw&_nc_ohc=5Evsj_ifFjIQ7kNvwH2ieaC&_nc_oc=AdmpObtc4yCT-H-u_wj3Oy1KF7nmtCGui-11hb1diHkjRwilkTDzJDdDH-5Wig600zk&_nc_zt=23&_nc_ht=scontent.fdac138-2.fna&_nc_gid=8bDqVzyRy0ci9vfbMnBs1g&oh=00_AfNk8wUmWIoWxp87YL25T4rscfDlWxt8icJAZfTkn1k6yw&oe=68669954'
    },
    {
      id: 2,
      author: 'Noman Abdullah',
      username: '@nomanabdullah',
      avatar: 'https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-6/497700642_4076359236016620_5210080379354121256_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGJf-2JZHL8F3cYdWLzZNkcwECW3eRAjEPAQJbd5ECMQ9uZas2hGzLhGLUhmoTtHucefMOQb2WAQebaW5ybdxUJ&_nc_ohc=TNjvXuHpvuYQ7kNvwEHh3bO&_nc_oc=Adl5oTabL0HJOSEhqreCEO0yVXucvXy7gYEiPzkLiHL61tAAfSjQug3n9Vco-dB3FIU&_nc_zt=23&_nc_ht=scontent.fdac138-1.fna&_nc_gid=L5BwFR5_X36WR2IaozUf9w&oh=00_AfMIBUoA_1LQ6nJr0yIxZMWmgWGFad03kNqlCbfKvLkGzw&oe=68669ECF',
      content: 'The future of social media is here! AI-powered content creation is changing everything.',
      platform: 'Twitter',
      likes: 1923,
      comments: 234,
      shares: 167,
      time: '4h ago',
      image: null
    },
    {
      id: 3,
      author: 'Creative Studio',
      username: '@creativestudio',
      avatar: 'https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-6/497700642_4076359236016620_5210080379354121256_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGJf-2JZHL8F3cYdWLzZNkcwECW3eRAjEPAQJbd5ECMQ9uZas2hGzLhGLUhmoTtHucefMOQb2WAQebaW5ybdxUJ&_nc_ohc=TNjvXuHpvuYQ7kNvwEHh3bO&_nc_oc=Adl5oTabL0HJOSEhqreCEO0yVXucvXy7gYEiPzkLiHL61tAAfSjQug3n9Vco-dB3FIU&_nc_zt=23&_nc_ht=scontent.fdac138-1.fna&_nc_gid=L5BwFR5_X36WR2IaozUf9w&oh=00_AfMIBUoA_1LQ6nJr0yIxZMWmgWGFad03kNqlCbfKvLkGzw&oe=68669ECF',
      content: 'Behind the scenes of our latest brand campaign ✨',
      platform: 'Instagram',
      likes: 3456,
      comments: 89,
      shares: 234,
      time: '6h ago',
      image: 'https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-6/510175098_4114408628878347_178861914738466238_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGxtYGSLVD9CXTtkboyMEfBecYhMNP3Vv95xiEw0_dW_wqEZxEiFhUtjY5qddARRxZDJ9BrU0QItfbuYDNuAan-&_nc_ohc=1nuFh8XbQhQQ7kNvwE1q9Fh&_nc_oc=AdkAadQgg4BPasHOvkTTHhIq0HUHr6J71YMZ5pEwIE1icOhjP5D2rd-9ESOnNaxWBOs&_nc_zt=23&_nc_ht=scontent.fdac138-1.fna&_nc_gid=2CiqLD7PaMJisZ3jfhxTdw&oh=00_AfO-_6J0y_wZpRWA1pO9vvb9wj1GXgRq85sUdYGi7V9rKQ&oe=68669D02'
    }
  ];

  const suggestedUsers = [
    {
      id: 1,
      name: 'Mahin Afif',
      username: '@afif_design',
      bio: 'UI/UX Designer & Content Creator',
      followers: '45.2K',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
      isFollowing: false
    },
    {
      id: 2,
      name: 'Jasem Khondokar',
      username: '@jasem_social',
      bio: 'Social Media Strategist',
      followers: '32.8K',
      avatar: 'https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-6/504920973_4101495880169622_592914148742527129_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF1kLsd34cpfEyNZAYoIsIEUcVJtHVyIFpRxUm0dXIgWv2CDna7VggAz71qiXMYoAqxrG__jkEBHD8TRnlfMfTI&_nc_ohc=umgJF9xyuggQ7kNvwFUEw7-&_nc_oc=Admy4ALWfN5ep_zumm7iirQRTzVmbxQgkYzMnRThHY9WjF0ae_M39Fao3tZ0zmbhglA&_nc_zt=23&_nc_ht=scontent.fdac138-2.fna&_nc_gid=Nail0bnhV4Xq_iOCGqLclQ&oh=00_AfN2IfuAE7MLzvi5pARKgiw2oqYdOOQa9VRW9MNsjrXbIw&oe=6866865F',
      isFollowing: false
    },
    {
      id: 3,
      name: 'David Rodriguez',
      username: '@davidr_marketing',
      bio: 'Digital Marketing Expert',
      followers: '28.9K',
      avatar: 'https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-6/504920973_4101495880169622_592914148742527129_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF1kLsd34cpfEyNZAYoIsIEUcVJtHVyIFpRxUm0dXIgWv2CDna7VggAz71qiXMYoAqxrG__jkEBHD8TRnlfMfTI&_nc_ohc=umgJF9xyuggQ7kNvwFUEw7-&_nc_oc=Admy4ALWfN5ep_zumm7iirQRTzVmbxQgkYzMnRThHY9WjF0ae_M39Fao3tZ0zmbhglA&_nc_zt=23&_nc_ht=scontent.fdac138-2.fna&_nc_gid=Nail0bnhV4Xq_iOCGqLclQ&oh=00_AfN2IfuAE7MLzvi5pARKgiw2oqYdOOQa9VRW9MNsjrXbIw&oe=6866865F',
      isFollowing: true
    }
  ];

  const activeGroups = [
    {
      id: 1,
      name: 'Social Media Marketers',
      members: '12.5K',
      posts: '234',
      category: 'Marketing',
      image: 'https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-6/504920973_4101495880169622_592914148742527129_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF1kLsd34cpfEyNZAYoIsIEUcVJtHVyIFpRxUm0dXIgWv2CDna7VggAz71qiXMYoAqxrG__jkEBHD8TRnlfMfTI&_nc_ohc=umgJF9xyuggQ7kNvwFUEw7-&_nc_oc=Admy4ALWfN5ep_zumm7iirQRTzVmbxQgkYzMnRThHY9WjF0ae_M39Fao3tZ0zmbhglA&_nc_zt=23&_nc_ht=scontent.fdac138-2.fna&_nc_gid=Nail0bnhV4Xq_iOCGqLclQ&oh=00_AfN2IfuAE7MLzvi5pARKgiw2oqYdOOQa9VRW9MNsjrXbIw&oe=6866865F'
    },
    {
      id: 2,
      name: 'Content Creators Hub',
      members: '8.9K',
      posts: '156',
      category: 'Creative',
      image: 'https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-6/504920973_4101495880169622_592914148742527129_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF1kLsd34cpfEyNZAYoIsIEUcVJtHVyIFpRxUm0dXIgWv2CDna7VggAz71qiXMYoAqxrG__jkEBHD8TRnlfMfTI&_nc_ohc=umgJF9xyuggQ7kNvwFUEw7-&_nc_oc=Admy4ALWfN5ep_zumm7iirQRTzVmbxQgkYzMnRThHY9WjF0ae_M39Fao3tZ0zmbhglA&_nc_zt=23&_nc_ht=scontent.fdac138-2.fna&_nc_gid=Nail0bnhV4Xq_iOCGqLclQ&oh=00_AfN2IfuAE7MLzvi5pARKgiw2oqYdOOQa9VRW9MNsjrXbIw&oe=6866865F'
    },
    {
      id: 3,
      name: 'Digital Entrepreneurs',
      members: '15.2K',
      posts: '89',
      category: 'Business',
      image: 'https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-6/504920973_4101495880169622_592914148742527129_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF1kLsd34cpfEyNZAYoIsIEUcVJtHVyIFpRxUm0dXIgWv2CDna7VggAz71qiXMYoAqxrG__jkEBHD8TRnlfMfTI&_nc_ohc=umgJF9xyuggQ7kNvwFUEw7-&_nc_oc=Admy4ALWfN5ep_zumm7iirQRTzVmbxQgkYzMnRThHY9WjF0ae_M39Fao3tZ0zmbhglA&_nc_zt=23&_nc_ht=scontent.fdac138-2.fna&_nc_gid=Nail0bnhV4Xq_iOCGqLclQ&oh=00_AfN2IfuAE7MLzvi5pARKgiw2oqYdOOQa9VRW9MNsjrXbIw&oe=6866865F'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Explore</h1>
        <div className="form-control">
          <div className="input-group">
            <span className="bg-base-200">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search posts, users, groups..."
              className="input input-bordered w-64"
            />
          </div>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Trending Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-primary">{topic.tag}</span>
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <p className="text-sm opacity-70">{topic.posts} posts</p>
                <p className="text-xs text-success">{topic.growth} growth</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Popular Posts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Popular Posts</h2>
              <div className="space-y-6">
                {popularPosts.map((post) => (
                  <div key={post.id} className="border-b border-base-300 pb-6 last:border-b-0">
                    <div className="flex items-start gap-4">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-full">
                          <img src={post.avatar} alt={post.author} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{post.author}</h3>
                          <span className="text-sm opacity-70">{post.username}</span>
                          <span className="badge badge-primary badge-sm">{post.platform}</span>
                          <span className="text-sm opacity-70">{post.time}</span>
                        </div>
                        <p className="mb-3">{post.content}</p>
                        {post.image && (
                          <img 
                            src={post.image} 
                            alt="Post content" 
                            className="w-full h-48 object-cover rounded-lg mb-3"
                          />
                        )}
                        <div className="flex items-center gap-6 text-sm opacity-70">
                          <button className="flex items-center gap-1 hover:text-error transition-colors">
                            <Heart className="w-4 h-4" />
                            {post.likes.toLocaleString()}
                          </button>
                          <button className="flex items-center gap-1 hover:text-info transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            {post.comments}
                          </button>
                          <button className="flex items-center gap-1 hover:text-success transition-colors">
                            <Share2 className="w-4 h-4" />
                            {post.shares}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Suggested Users */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Suggested Users</h2>
              <div className="space-y-4">
                {suggestedUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full">
                        <img src={user.avatar} alt={user.name} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{user.name}</h3>
                      <p className="text-xs opacity-70">{user.bio}</p>
                      <p className="text-xs opacity-60">{user.followers} followers</p>
                    </div>
                    <button className={`btn btn-sm ${user.isFollowing ? 'btn-outline' : 'btn-primary'}`}>
                      {user.isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Groups */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Active Groups</h2>
              <div className="space-y-4">
                {activeGroups.map((group) => (
                  <div key={group.id} className="p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <img 
                        src={group.image} 
                        alt={group.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{group.name}</h3>
                        <p className="text-xs opacity-70">{group.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs opacity-70">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {group.members} members
                      </span>
                      <span>{group.posts} posts today</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Your Activity</h2>
              <div className="stats stats-vertical">
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <Eye className="w-6 h-6" />
                  </div>
                  <div className="stat-title">Profile Views</div>
                  <div className="stat-value text-primary">2.6K</div>
                  <div className="stat-desc">21% more than last week</div>
                </div>
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <div className="stat-title">New Followers</div>
                  <div className="stat-value text-secondary">156</div>
                  <div className="stat-desc">This week</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}