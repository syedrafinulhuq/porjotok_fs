"use client";

import { Bell, Search, Menu, User } from 'lucide-react';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  return (
    <header className="bg-base-100 border-b border-base-300 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden btn btn-ghost btn-sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="hidden sm:flex">
            <div className="form-control">
              <div className="input-group">
                <span className="bg-base-200">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="input input-bordered w-64"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="indicator">
            <span className="indicator-item badge badge-primary badge-xs"></span>
            <button className="btn btn-ghost btn-circle">
              <Bell className="w-5 h-5" />
            </button>
          </div>
          
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-8 rounded-full bg-primary flex items-center justify-center">
                <User className="w-4 h-4 text-primary-content" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a className="justify-between">Profile</a></li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}