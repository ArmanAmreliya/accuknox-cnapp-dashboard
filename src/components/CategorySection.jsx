import React from 'react';
import { WidgetCard } from './WidgetCard';
import { AddWidgetCard } from './AddWidgetCard';

export const CategorySection = ({ category, searchQuery, onRemoveWidget, onAddWidgetClick }) => {
  // Filter widgets inside category by search query if present
  const filteredWidgets = category.widgets.filter(widget => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const matchName = widget.name?.toLowerCase().includes(query);
    const matchText = widget.text?.toLowerCase().includes(query);
    return matchName || matchText;
  });

  return (
    <section className="mb-6">
      <h3 className="text-sm font-bold text-slate-800 mb-3 tracking-wide">
        {category.title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWidgets.map((widget) => (
          <WidgetCard
            key={widget.id}
            widget={widget}
            onRemove={(widgetId) => onRemoveWidget(category.id, widgetId)}
          />
        ))}

        {/* Empty state when searching and no match in this category */}
        {searchQuery && filteredWidgets.length === 0 && (
          <div className="col-span-full py-6 text-center text-xs text-slate-400 bg-white/50 rounded-xl border border-dashed border-slate-200">
            No widgets found in this section matching "{searchQuery}"
          </div>
        )}

        {/* Add Widget Placeholder Card */}
        <AddWidgetCard onAddClick={() => onAddWidgetClick(category.id, category.tabLabel)} />
      </div>
    </section>
  );
};
