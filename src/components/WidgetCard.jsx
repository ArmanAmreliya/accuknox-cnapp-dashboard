import React from 'react';
import { X } from 'lucide-react';
import { DonutChart } from './charts/DonutChart';
import { ProgressBarChart } from './charts/ProgressBarChart';
import { EmptyWidgetState } from './charts/EmptyWidgetState';

export const WidgetCard = ({ widget, onRemove }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col h-[230px] relative group transition-all hover:shadow-md">
      {/* Header with Title and Cross button to remove */}
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-xs font-semibold text-slate-800 tracking-tight line-clamp-1" title={widget.name}>
          {widget.name}
        </h4>
        <button
          onClick={() => onRemove(widget.id)}
          className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1 rounded-md transition-colors opacity-70 group-hover:opacity-100"
          title="Remove widget"
          aria-label={`Remove ${widget.name}`}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Widget Content Body */}
      <div className="flex-1 flex flex-col justify-center overflow-hidden">
        {widget.type === 'donut' && (
          <DonutChart
            data={widget.data}
            total={widget.total}
            centerLabel={widget.centerLabel}
          />
        )}

        {widget.type === 'progress-bar' && (
          <ProgressBarChart
            segments={widget.segments}
            subtitle={widget.subtitle}
          />
        )}

        {widget.type === 'empty' && (
          <EmptyWidgetState text={widget.text} />
        )}

        {widget.type === 'text' && (
          <div className="flex items-center justify-center p-4 bg-slate-50/70 border border-dashed border-slate-200 rounded-lg text-slate-600 text-xs text-center h-full">
            <p className="leading-relaxed">{widget.text || "Custom dynamic widget content"}</p>
          </div>
        )}
      </div>
    </div>
  );
};
