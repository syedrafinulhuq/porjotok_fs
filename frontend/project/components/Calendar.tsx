"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const scheduledPosts = [
    {
      id: 1,
      date: 15,
      platform: 'Instagram',
      title: 'Product launch announcement',
      time: '10:00 AM',
      status: 'scheduled'
    },
    {
      id: 2,
      date: 18,
      platform: 'Twitter',
      title: 'Weekly tips thread',
      time: '2:00 PM',
      status: 'scheduled'
    },
    {
      id: 3,
      date: 22,
      platform: 'LinkedIn',
      title: 'Industry insights article',
      time: '9:00 AM',
      status: 'scheduled'
    },
    {
      id: 4,
      date: 25,
      platform: 'Facebook',
      title: 'Behind the scenes video',
      time: '3:00 PM',
      status: 'scheduled'
    },
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return <Instagram className="w-3 h-3" />;
      case 'Twitter':
        return <Twitter className="w-3 h-3" />;
      case 'LinkedIn':
        return <Linkedin className="w-3 h-3" />;
      case 'Facebook':
        return <Facebook className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'Twitter':
        return 'bg-blue-500';
      case 'LinkedIn':
        return 'bg-blue-600';
      case 'Facebook':
        return 'bg-blue-700';
      default:
        return 'bg-gray-500';
    }
  };

  const getPostsForDate = (date: number) => {
    return scheduledPosts.filter(post => post.date === date);
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-base-200"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const postsForDay = getPostsForDate(day);
      const isToday = day === new Date().getDate() && 
                     currentDate.getMonth() === new Date().getMonth() && 
                     currentDate.getFullYear() === new Date().getFullYear();
      
      days.push(
        <div key={day} className={`h-24 border border-base-300 p-1 ${isToday ? 'bg-primary/10 border-primary' : 'bg-base-100'}`}>
          <div className="font-semibold text-sm mb-1">{day}</div>
          <div className="space-y-1">
            {postsForDay.slice(0, 2).map((post) => (
              <div key={post.id} className={`${getPlatformColor(post.platform)} text-white text-xs p-1 rounded flex items-center gap-1`}>
                {getPlatformIcon(post.platform)}
                <span className="truncate">{post.time}</span>
              </div>
            ))}
            {postsForDay.length > 2 && (
              <div className="text-xs text-base-content/60">+{postsForDay.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Content Calendar</h1>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Post
        </button>
      </div>

      {/* Calendar Header */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => navigateMonth('next')}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="h-8 bg-base-200 flex items-center justify-center font-semibold text-sm">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {renderCalendarDays()}
          </div>
        </div>
      </div>

      {/* Upcoming Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Upcoming Posts</h2>
            <div className="space-y-4">
              {scheduledPosts.map((post) => (
                <div key={post.id} className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                  <div className={`w-10 h-10 ${getPlatformColor(post.platform)} rounded-lg flex items-center justify-center text-white`}>
                    {getPlatformIcon(post.platform)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{post.title}</h3>
                    <p className="text-xs opacity-70">{post.platform}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Jan {post.date}</p>
                    <p className="text-xs opacity-70 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Quick Schedule</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Platform</span>
              </label>
              <select className="select select-bordered">
                <option>Instagram</option>
                <option>Twitter</option>
                <option>LinkedIn</option>
                <option>Facebook</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date & Time</span>
              </label>
              <input type="datetime-local" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea className="textarea textarea-bordered h-24" placeholder="Post content..."></textarea>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-outline">Save Draft</button>
              <button className="btn btn-primary">Schedule Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}