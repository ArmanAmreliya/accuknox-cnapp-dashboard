import React from 'react';
import { Plus } from 'lucide-react';

export const AddWidgetCard = ({ onAddClick }) => {
  return (
    <div className="bg-white rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center h-[230px] hover:border-slate-300 transition-colors p-4 shadow-sm">
      <button
        onClick={onAddClick}
        className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-md text-xs font-medium text-slate-500 hover:text-slate-800 hover:border-slate-400 hover:bg-slate-50 transition-all shadow-sm"
      >
        <Plus className="w-3.5 h-3.5" />
        Add Widget
      </button>
    </div>
  );
};
