import React from 'react';
import { Plus, RotateCw, MoreVertical, Clock } from 'lucide-react';

export const DashboardHeader = ({ onAddWidgetClick, onReset }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <h1 className="text-lg font-bold text-slate-900 tracking-tight">
        CNAPP Dashboard
      </h1>

      <div className="flex items-center gap-3 flex-wrap">
        {/* + Add Widget button in top bar */}
        <button
          onClick={onAddWidgetClick}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm"
        >
          Add Widget
          <Plus className="w-3.5 h-3.5 text-slate-500" />
        </button>

        {/* Refresh button */}
        <button
          onClick={onReset}
          title="Reset / Refresh default state"
          className="p-1.5 bg-white border border-slate-300 rounded-md text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>

        {/* More options button */}
        <button
          className="p-1.5 bg-white border border-slate-300 rounded-md text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
        >
          <MoreVertical className="w-3.5 h-3.5" />
        </button>

        {/* Time range selector pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-[#14238a] rounded-md text-xs font-bold text-[#14238a] shadow-sm cursor-pointer hover:bg-blue-50/50">
          <Clock className="w-3.5 h-3.5" />
          <div className="h-3.5 w-[1px] bg-[#14238a]"></div>
          <span>Last 2 days</span>
          <span className="text-[10px]">▼</span>
        </div>
      </div>
    </div>
  );
};

