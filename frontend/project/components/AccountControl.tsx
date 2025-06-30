"use client";

import { useState } from 'react';
import { User, Mail, Lock, Bell, Shield, Trash2, Eye, EyeOff, Camera, Save } from 'lucide-react';

export default function AccountControl() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    security: true
  });

  const connectedAccounts = [
    { platform: 'Instagram', username: '@yourhandle', connected: true, followers: '45.2K' },
    { platform: 'Twitter', username: '@yourtwitter', connected: true, followers: '32.8K' },
    { platform: 'LinkedIn', username: 'Your Name', connected: true, followers: '18.9K' },
    { platform: 'Facebook', username: 'Your Page', connected: false, followers: '0' }
  ];

  const securityLogs = [
    { action: 'Login', location: 'New York, US', time: '2 hours ago', device: 'Chrome on Windows' },
    { action: 'Password Changed', location: 'New York, US', time: '1 day ago', device: 'Chrome on Windows' },
    { action: 'Login', location: 'New York, US', time: '3 days ago', device: 'Safari on iPhone' },
    { action: 'Account Settings Updated', location: 'New York, US', time: '1 week ago', device: 'Chrome on Windows' }
  ];

type NotificationKey = keyof typeof notifications;

const handleNotificationChange = (key: NotificationKey) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Account Control</h1>
        <button className="btn btn-primary btn-sm">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed">
        <button 
          className={`tab ${activeTab === 'profile' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          className={`tab ${activeTab === 'security' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
        <button 
          className={`tab ${activeTab === 'notifications' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
        <button 
          className={`tab ${activeTab === 'accounts' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('accounts')}
        >
          Connected Accounts
        </button>
        <button 
          className={`tab ${activeTab === 'privacy' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('privacy')}
        >
          Privacy
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Profile Information</h2>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="avatar">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                    <User className="w-10 h-10 text-primary-content" />
                  </div>
                </div>
                <button className="btn btn-outline btn-sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Change Photo
                </button>
              </div>

              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input type="text" placeholder="Your Name" className="input input-bordered" defaultValue="Rafi Nul" />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" placeholder="your@email.com" className="input input-bordered" defaultValue="amrh.cse@gmail.com" />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input type="text" placeholder="@username" className="input input-bordered" defaultValue="@devamrh" />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Bio</span>
                  </label>
                  <textarea className="textarea textarea-bordered h-24" placeholder="Tell us about yourself..."></textarea>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Website</span>
                  </label>
                  <input type="url" placeholder="https://yourwebsite.com" className="input input-bordered" />
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Account Statistics</h2>
              
              <div className="stats stats-vertical">
                <div className="stat">
                  <div className="stat-title">Total Followers</div>
                  <div className="stat-value text-primary">96.9K</div>
                  <div className="stat-desc">Across all platforms</div>
                </div>
                
                <div className="stat">
                  <div className="stat-title">Total Posts</div>
                  <div className="stat-value text-secondary">1,247</div>
                  <div className="stat-desc">This year</div>
                </div>
                
                <div className="stat">
                  <div className="stat-title">Engagement Rate</div>
                  <div className="stat-value text-accent">12.4%</div>
                  <div className="stat-desc">Average across platforms</div>
                </div>
              </div>

              <div className="divider"></div>

              <div className="space-y-3">
                <h3 className="font-semibold">Account Status</h3>
                <div className="flex items-center justify-between">
                  <span>Email Verified</span>
                  <div className="badge badge-success">Verified</div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Phone Verified</span>
                  <div className="badge badge-warning">Pending</div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Two-Factor Auth</span>
                  <div className="badge badge-error">Disabled</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Password & Security</h2>
                
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Current Password</span>
                    </label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        className="input input-bordered w-full pr-10" 
                        placeholder="Enter current password"
                      />
                      <button 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">New Password</span>
                    </label>
                    <input type="password" className="input input-bordered" placeholder="Enter new password" />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Confirm New Password</span>
                    </label>
                    <input type="password" className="input input-bordered" placeholder="Confirm new password" />
                  </div>

                  <button className="btn btn-primary">Update Password</button>
                </div>

                <div className="divider"></div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Two-Factor Authentication</h3>
                  <p className="text-sm opacity-70">Add an extra layer of security to your account</p>
                  <button className="btn btn-outline">
                    <Shield className="w-4 h-4 mr-2" />
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Recent Security Activity</h2>
                
                <div className="space-y-4">
                  {securityLogs.map((log, index) => (
                    <div key={index} className="p-3 bg-base-200 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm">{log.action}</span>
                        <span className="text-xs opacity-70">{log.time}</span>
                      </div>
                      <p className="text-sm opacity-70">{log.location}</p>
                      <p className="text-xs opacity-60">{log.device}</p>
                    </div>
                  ))}
                </div>

                <button className="btn btn-outline btn-sm mt-4">View All Activity</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Notification Preferences</h2>
            
            <div className="space-y-6">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">
                    <div>
                      <div className="font-semibold">Email Notifications</div>
                      <div className="text-sm opacity-70">Receive notifications via email</div>
                    </div>
                  </span>
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary" 
                    checked={notifications.email}
                    onChange={() => handleNotificationChange('email')}
                  />
                </label>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">
                    <div>
                      <div className="font-semibold">Push Notifications</div>
                      <div className="text-sm opacity-70">Receive push notifications in your browser</div>
                    </div>
                  </span>
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary" 
                    checked={notifications.push}
                    onChange={() => handleNotificationChange('push')}
                  />
                </label>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">
                    <div>
                      <div className="font-semibold">Marketing Communications</div>
                      <div className="text-sm opacity-70">Receive updates about new features and tips</div>
                    </div>
                  </span>
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary" 
                    checked={notifications.marketing}
                    onChange={() => handleNotificationChange('marketing')}
                  />
                </label>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">
                    <div>
                      <div className="font-semibold">Security Alerts</div>
                      <div className="text-sm opacity-70">Important security notifications</div>
                    </div>
                  </span>
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary" 
                    checked={notifications.security}
                    onChange={() => handleNotificationChange('security')}
                  />
                </label>
              </div>
            </div>

            <div className="divider"></div>

            <div className="space-y-4">
              <h3 className="font-semibold">Notification Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Quiet Hours Start</span>
                  </label>
                  <input type="time" className="input input-bordered" defaultValue="22:00" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Quiet Hours End</span>
                  </label>
                  <input type="time" className="input input-bordered" defaultValue="08:00" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connected Accounts Tab */}
      {activeTab === 'accounts' && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Connected Social Media Accounts</h2>
            
            <div className="space-y-4">
              {connectedAccounts.map((account, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">{account.platform.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{account.platform}</h3>
                      <p className="text-sm opacity-70">{account.username}</p>
                      {account.connected && (
                        <p className="text-xs opacity-60">{account.followers} followers</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {account.connected ? (
                      <>
                        <div className="badge badge-success">Connected</div>
                        <button className="btn btn-outline btn-sm">Disconnect</button>
                      </>
                    ) : (
                      <button className="btn btn-primary btn-sm">Connect</button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="divider"></div>

            <div className="alert alert-info">
              <Bell className="w-4 h-4" />
              <div>
                <h3 className="font-bold">Account Sync</h3>
                <div className="text-xs">Your connected accounts are synced every 15 minutes for the latest data.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Tab */}
      {activeTab === 'privacy' && (
        <div className="space-y-6">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Privacy Settings</h2>
              
              <div className="space-y-6">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">
                      <div>
                        <div className="font-semibold">Profile Visibility</div>
                        <div className="text-sm opacity-70">Make your profile visible to other users</div>
                      </div>
                    </span>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">
                      <div>
                        <div className="font-semibold">Analytics Tracking</div>
                        <div className="text-sm opacity-70">Allow us to collect analytics data to improve your experience</div>
                      </div>
                    </span>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">
                      <div>
                        <div className="font-semibold">Data Sharing</div>
                        <div className="text-sm opacity-70">Share anonymized data with partners for research</div>
                      </div>
                    </span>
                    <input type="checkbox" className="toggle toggle-primary" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-error">Danger Zone</h2>
              
              <div className="space-y-4">
                <div className="alert alert-warning">
                  <Trash2 className="w-4 h-4" />
                  <div>
                    <h3 className="font-bold">Delete Account</h3>
                    <div className="text-xs">Once you delete your account, there is no going back. Please be certain.</div>
                  </div>
                </div>
                
                <button className="btn btn-error btn-outline">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}