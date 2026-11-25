import React from 'react';

export const DonutChart = ({ data, total, centerLabel }) => {
  // SVG donut calculation
  const size = 160;
  const strokeWidth = 26;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const totalSum = data.reduce((acc, curr) => acc + curr.value, 0);
  let accumulatedAngle = 0;

  return (
    <div className="flex items-center justify-between w-full h-full py-2">
      <div className="relative flex items-center justify-center shrink-0 w-[150px] h-[150px]">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
          {data.map((item, index) => {
            const fraction = totalSum > 0 ? item.value / totalSum : 0;
            const strokeDasharray = `${fraction * circumference} ${circumference}`;
            const strokeDashoffset = -accumulatedAngle * circumference;
            accumulatedAngle += fraction;

            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-bold text-slate-800 leading-none">{total}</span>
          <span className="text-xs text-slate-500 mt-0.5">{centerLabel || 'Total'}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 ml-4 text-xs font-medium text-slate-600 flex-1">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="truncate">{item.name} ({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};
