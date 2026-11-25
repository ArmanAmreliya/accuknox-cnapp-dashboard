import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { initialDashboardData } from '../data/dashboardData';

export const AddWidgetDrawer = ({
  isOpen,
  onClose,
  categories,
  activeTab,
  onTabChange,
  targetCategory,
  onConfirmWidgets,
  onAddNewCustomWidget
}) => {
  // Find current active category
  const currentCategory = categories.find(c => c.id === activeTab) || categories[0];

  // We maintain a catalog of known widgets for each category (from initial state plus any dynamically added)
  // Checkbox selection state: IDs currently active/selected for the category
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Custom new widget form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [formError, setFormError] = useState('');

  // Collect all widgets that belong or ever belonged to this category tab
  // Merge initial catalog widgets with any added ones so user can uncheck or recheck
  const initialWidgetsForTab = initialDashboardData.categories.find(c => c.id === currentCategory?.id)?.widgets || [];
  const currentWidgetsForTab = currentCategory?.widgets || [];

  // Map of unique available widgets for this category
  const availableWidgets = React.useMemo(() => {
    const map = new Map();
    // add from initial data
    initialWidgetsForTab.forEach(w => map.set(w.id, w));
    // add currently present
    currentWidgetsForTab.forEach(w => map.set(w.id, w));
    return Array.from(map.values());
  }, [currentCategory?.id, currentWidgetsForTab, initialWidgetsForTab]);

  useEffect(() => {
    if (isOpen && currentCategory) {
      setSelectedIds(currentCategory.widgets.map(w => w.id));
      setShowAddForm(false);
      setWidgetName('');
      setWidgetText('');
      setFormError('');
    }
  }, [isOpen, activeTab, currentCategory]);

  if (!isOpen) return null;

  const handleToggleCheckbox = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleConfirm = () => {
    // Filter widgets from available pool that are currently selected in selectedIds
    const finalWidgets = availableWidgets.filter(w => selectedIds.includes(w.id));
    onConfirmWidgets(currentCategory.id, finalWidgets);
    onClose();
  };

  const handleCreateNewWidget = (e) => {
    e.preventDefault();
    if (!widgetName.trim()) {
      setFormError('Widget name is required');
      return;
    }

    const newWidget = {
      id: `custom-${Date.now()}`,
      name: widgetName.trim(),
      type: 'text',
      text: widgetText.trim() || 'Dynamic custom widget content'
    };

    onAddNewCustomWidget(currentCategory.id, newWidget);
    setWidgetName('');
    setWidgetText('');
    setShowAddForm(false);
    setFormError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="bg-[#14238a] text-white px-6 py-3.5 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide">Add Widget</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-header instruction */}
        <div className="px-6 pt-5 pb-3">
          <p className="text-xs font-medium text-slate-700">
            Personalise your dashboard by adding the following widget
          </p>
        </div>

        {/* Category Tabs */}
        <div className="px-6 border-b border-slate-200 flex gap-6 text-xs font-semibold">
          {categories.map((cat) => {
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                onClick={() => onTabChange(cat.id)}
                className={`pb-2.5 transition-colors border-b-2 ${
                  isActive
                    ? 'border-[#14238a] text-[#14238a]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {cat.tabLabel || cat.title}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
          {/* List of selectable widgets for the active tab */}
          <div className="space-y-2.5">
            {availableWidgets.map((w) => {
              const isChecked = selectedIds.includes(w.id);
              return (
                <label
                  key={w.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                    isChecked
                      ? 'border-blue-400 bg-blue-50/40 text-slate-900'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggleCheckbox(w.id)}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <span className="flex-1 select-none">{w.name}</span>
                </label>
              );
            })}
          </div>

          {/* Form to add completely new widget (as requested: Widget Name & Widget Text) */}
          <div className="pt-4 border-t border-slate-200">
            {!showAddForm ? (
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 py-1"
              >
                + Create new dynamic widget for {currentCategory?.tabLabel}
              </button>
            ) : (
              <form onSubmit={handleCreateNewWidget} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800">Add New Widget to {currentCategory?.tabLabel}</h4>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="text-slate-400 hover:text-slate-600 text-xs"
                  >
                    Cancel
                  </button>
                </div>

                {formError && (
                  <p className="text-[11px] text-red-600 font-medium">{formError}</p>
                )}

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Widget Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={widgetName}
                    onChange={(e) => setWidgetName(e.target.value)}
                    placeholder="e.g. Vulnerability Trends"
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Widget Text / Content
                  </label>
                  <textarea
                    rows={2}
                    value={widgetText}
                    onChange={(e) => setWidgetText(e.target.value)}
                    placeholder="Enter widget description or random text..."
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-sm transition-colors"
                  >
                    Add to Category
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer buttons: Cancel and Confirm */}
        <div className="p-4 px-6 border-t border-slate-200 flex justify-end gap-3 bg-white">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-[#14238a] hover:bg-[#0f1b6a] text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

