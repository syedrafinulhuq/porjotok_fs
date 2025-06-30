"use client";

import { 
  Home, 
  FileText, 
  BarChart3, 
  Calendar, 
  DollarSign,
  Compass,
  MessageSquare,
  Users,
  UserCog,
  HelpCircle,
  Settings, 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const mainMenuItems = [
    { id: 'overview', icon: Home, label: 'Overview' },
    { id: 'posts', icon: FileText, label: 'Posts' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
  ];

  const additionalMenuItems = [
    { id: 'budgeting', icon: DollarSign, label: 'Budgeting' },
    { id: 'explore', icon: Compass, label: 'Explore' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'groups', icon: Users, label: 'Groups' },
  ];

  const bottomMenuItems = [
    { id: 'account', icon: UserCog, label: 'Account Control' },
    { id: 'help', icon: HelpCircle, label: 'Help & Support' },
  ];

  const socialPlatforms = [
    { icon: Instagram, label: 'Instagram', connected: true },
    { icon: Twitter, label: 'Twitter', connected: true },
    { icon: Facebook, label: 'Facebook', connected: false },
    { icon: Linkedin, label: 'LinkedIn', connected: true },
  ];

  return (
    <aside className="w-64 min-h-full bg-base-200 text-base-content">
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary-content" />
          </div>
          <h1 className="text-xl font-bold">Porjotok</h1>
        </div>
        
        {/* Main Navigation */}
        <nav className="space-y-2 mb-6">
          <div className="text-xs font-semibold text-base-content/60 mb-3 px-4">
            MAIN
          </div>
          {mainMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-base-300 ${
                activeTab === item.id 
                  ? 'bg-primary text-primary-content shadow-lg' 
                  : 'text-base-content/70 hover:text-base-content'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Additional Features */}
        <nav className="space-y-2 mb-6">
          <div className="text-xs font-semibold text-base-content/60 mb-3 px-4">
            FEATURES
          </div>
          {additionalMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-base-300 ${
                activeTab === item.id 
                  ? 'bg-primary text-primary-content shadow-lg' 
                  : 'text-base-content/70 hover:text-base-content'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {item.id === 'messages' && (
                <span className="ml-auto bg-error text-error-content text-xs px-2 py-1 rounded-full">3</span>
              )}
            </button>
          ))}
        </nav>

        {/* Connected Accounts */}
        <div className="border-t border-base-300 pt-6 mb-6">
          <h3 className="text-xs font-semibold text-base-content/60 mb-4 px-4">
            CONNECTED ACCOUNTS
          </h3>
          <div className="space-y-2">
            {socialPlatforms.map((platform, index) => (
              <div key={index} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-base-300 transition-colors">
                <platform.icon className="w-4 h-4" />
                <span className="text-sm">{platform.label}</span>
                <div className={`ml-auto w-2 h-2 rounded-full ${
                  platform.connected ? 'bg-success' : 'bg-error'
                }`} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Menu */}
        <div className="mt-auto space-y-2">
          <div className="border-t border-base-300 pt-4">
            {bottomMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-base-300 ${
                  activeTab === item.id 
                    ? 'bg-primary text-primary-content shadow-lg' 
                    : 'text-base-content/70 hover:text-base-content'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}