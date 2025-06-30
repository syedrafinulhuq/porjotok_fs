"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Overview from '@/components/Overview';
import Posts from '@/components/Posts';
import Analytics from '@/components/Analytics';
import Calendar from '@/components/Calendar';
import Budgeting from '@/components/Budgeting';
import Explore from '@/components/Explore';
import Messages from '@/components/Messages';
import Groups from '@/components/Groups';
import AccountControl from '@/components/AccountControl';
import Help from '@/components/Help';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'posts':
        return <Posts />;
      case 'analytics':
        return <Analytics />;
      case 'calendar':
        return <Calendar />;
      case 'budgeting':
        return <Budgeting />;
      case 'explore':
        return <Explore />;
      case 'messages':
        return <Messages />;
      case 'groups':
        return <Groups />;
      case 'account':
        return <AccountControl />;
      case 'help':
        return <Help />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="drawer lg:drawer-open">
        <input 
          id="drawer-toggle" 
          type="checkbox" 
          className="drawer-toggle"
          checked={sidebarOpen}
          onChange={(e) => setSidebarOpen(e.target.checked)}
        />
        <div className="drawer-content flex flex-col">
          <Header setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 p-4 lg:p-6">
            {renderContent()}
          </main>
        </div>
        <div className="drawer-side">
          <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </div>
  );
}