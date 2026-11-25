import React from 'react';
import { BarChart3 } from 'lucide-react';

export const EmptyWidgetState = ({ text = "No Graph data available!" }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[140px] text-slate-400">
      <div className="p-3 bg-slate-50 rounded-lg mb-2">
        <BarChart3 className="w-10 h-10 text-slate-300 stroke-[1.5]" />
      </div>
      <p className="text-xs font-medium text-slate-400">{text}</p>
    </div>
  );
};

