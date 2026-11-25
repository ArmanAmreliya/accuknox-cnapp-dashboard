import React from 'react';

export const ProgressBarChart = ({ segments, subtitle }) => {
  const total = segments.reduce((acc, s) => acc + s.value, 0);

  return (
    <div className="flex flex-col justify-between w-full h-full pt-1 pb-2">
      {subtitle && (
        <div className="text-sm font-semibold text-slate-800 mb-2">
          {subtitle}
        </div>
      )}

      {/* Multi-segment Progress Bar */}
      <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-100 my-auto shadow-inner">
        {segments.map((seg, idx) => {
          const widthPercent = total > 0 ? (seg.value / total) * 100 : 0;
          if (widthPercent === 0) return null;
          return (
            <div
              key={idx}
              className="h-full transition-all duration-300"
              style={{
                width: `${widthPercent}%`,
                backgroundColor: seg.color
              }}
              title={`${seg.name}: ${seg.value}`}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-600 mt-3">
        {segments.map((seg, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: seg.color }}
            />
            <span className="truncate">{seg.name} ({seg.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

