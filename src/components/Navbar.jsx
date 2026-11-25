import React from 'react';
import { Search, Bell, ChevronDown, UserCircle } from 'lucide-react';

export const Navbar = ({ searchQuery, onSearchChange }) => {
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
            placeholder="Search anything..."
            className="w-full pl-9 pr-4 py-1.5 bg-[#f0f5fa] border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all"
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
          <button className="hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100">
            <Bell className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80">
            <UserCircle className="w-6 h-6 text-slate-500" />
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </header>
  );
};
