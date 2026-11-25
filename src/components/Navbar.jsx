import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, UserCircle, CheckCircle, ShieldAlert, Sliders } from 'lucide-react';

export const Navbar = ({ searchQuery, onSearchChange, onNotify }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifyRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifyRef.current && !notifyRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, title: 'CSPM Compliance Check', desc: 'Scan completed successfully. 7,253 checks passed.', time: '10m ago', unread: true },
    { id: 2, title: 'Image Security Alert', desc: '2 Critical vulnerabilities flagged in registry scan.', time: '1h ago', unread: true },
    { id: 3, title: 'CWPP Agent Synchronized', desc: 'K8s Cluster namespace monitoring active.', time: '3h ago', unread: false }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-2.5 flex items-center justify-between">
      {/* Breadcrumb */}
      <div className="flex items-center text-xs font-medium text-slate-500 gap-1.5">
        <span className="hover:text-slate-700 cursor-pointer">Home</span>
        <span>&gt;</span>
        <span className="text-[#14238a] font-semibold">Dashboard V2</span>
      </div>

      {/* Search Input & Action Icons */}
      <div className="flex items-center gap-6">
        <div className="relative w-64 md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search anything (widgets, alerts, graphs)..."
            className="w-full pl-9 pr-8 py-1.5 bg-[#f0f5fa] border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-full px-1.5 py-0.5"
            >
              Clear
            </button>
          )}
        </div>

        {/* Right profile / notification area */}
        <div className="flex items-center gap-4 text-slate-400">
          {/* Notification Bell Dropdown */}
          <div className="relative" ref={notifyRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Security Notifications</span>
                  <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">3 new</span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        onNotify?.(`Opened notification: ${n.title}`);
                        setShowNotifications(false);
                      }}
                      className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                          {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                          {n.title}
                        </span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <div
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 p-1 rounded-md hover:bg-slate-50 transition-colors"
            >
              <UserCircle className="w-6 h-6 text-slate-500" />
              <ChevronDown className="w-3.5 h-3.5" />
            </div>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="font-semibold text-slate-800">Admin User</p>
                  <p className="text-[11px] text-slate-400">admin@accuknox.com</p>
                </div>
                <button
                  onClick={() => {
                    onNotify?.('Switched to Cloud Security role');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
                  Security Center
                </button>
                <button
                  onClick={() => {
                    onNotify?.('Opened Dashboard Preferences');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                >
                  <Sliders className="w-3.5 h-3.5 text-slate-400" />
                  Preferences
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
