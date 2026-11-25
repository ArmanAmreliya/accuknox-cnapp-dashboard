import React, { useState, useRef, useEffect } from 'react';
import { Plus, RotateCw, MoreVertical, Clock, Check, Download, Share2, Filter, LayoutGrid } from 'lucide-react';

export const DashboardHeader = ({
  onAddWidgetClick,
  onReset,
  selectedTimeRange,
  onSelectTimeRange,
  onNotify
}) => {
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const timeDropdownRef = useRef(null);
  const moreMenuRef = useRef(null);

  const timeRangeOptions = [
    'Last 24 hours',
    'Last 2 days',
    'Last 7 days',
    'Last 30 days',
    'Custom range'
  ];

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (timeDropdownRef.current && !timeDropdownRef.current.contains(e.target)) {
        setShowTimeDropdown(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
        setShowMoreMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRefreshClick = () => {
    setIsRotating(true);
    onReset();
    onNotify?.('Dashboard reset & refreshed with latest telemetry');
    setTimeout(() => {
      setIsRotating(false);
    }, 600);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <h1 className="text-lg font-bold text-slate-900 tracking-tight">
        CNAPP Dashboard
      </h1>

      <div className="flex items-center gap-3 flex-wrap">
        {/* + Add Widget button in top bar */}
        <button
          onClick={onAddWidgetClick}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm active:scale-95"
        >
          Add Widget
          <Plus className="w-3.5 h-3.5 text-slate-500" />
        </button>

        {/* Refresh button with spin animation */}
        <button
          onClick={handleRefreshClick}
          title="Reset & Refresh Dashboard State"
          className="p-1.5 bg-white border border-slate-300 rounded-md text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
        >
          <RotateCw className={`w-3.5 h-3.5 transition-transform duration-500 ${isRotating ? 'rotate-180 text-blue-600' : ''}`} />
        </button>

        {/* More options 3-dots menu */}
        <div className="relative" ref={moreMenuRef}>
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            title="More Dashboard Options"
            className="p-1.5 bg-white border border-slate-300 rounded-md text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>

          {showMoreMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => {
                  window.print();
                  setShowMoreMenu(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                Export / Print PDF
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  onNotify?.('Dashboard link copied to clipboard!');
                  setShowMoreMenu(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5 text-slate-400" />
                Share Dashboard
              </button>
              <div className="my-1 border-t border-slate-100"></div>
              <button
                onClick={() => {
                  onReset();
                  onNotify?.('Default categories restored');
                  setShowMoreMenu(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2"
              >
                <RotateCw className="w-3.5 h-3.5 text-red-400" />
                Restore Initial Widgets
              </button>
            </div>
          )}
        </div>

        {/* Time range selector pill with interactive dropdown */}
        <div className="relative" ref={timeDropdownRef}>
          <div
            onClick={() => setShowTimeDropdown(!showTimeDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-[#14238a] rounded-md text-xs font-bold text-[#14238a] shadow-sm cursor-pointer hover:bg-blue-50/50 select-none active:scale-95 transition-all"
          >
            <Clock className="w-3.5 h-3.5" />
            <div className="h-3.5 w-[1px] bg-[#14238a]"></div>
            <span>{selectedTimeRange || 'Last 2 days'}</span>
            <span className="text-[10px]">▼</span>
          </div>

          {showTimeDropdown && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 font-semibold text-slate-400 text-[10px] uppercase tracking-wider">
                Select Time Window
              </div>
              {timeRangeOptions.map((opt) => {
                const isSelected = selectedTimeRange === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => {
                      onSelectTimeRange(opt);
                      onNotify?.(`Filter applied: ${opt}`);
                      setShowTimeDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-blue-50/60 transition-colors ${
                      isSelected ? 'font-bold text-[#14238a] bg-blue-50/30' : 'text-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#14238a]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
