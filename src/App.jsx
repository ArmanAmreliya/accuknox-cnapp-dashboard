import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar } from './components/Navbar';
import { DashboardHeader } from './components/DashboardHeader';
import { CategorySection } from './components/CategorySection';
import { AddWidgetDrawer } from './components/AddWidgetDrawer';
import {
  setSearchQuery,
  setTimeRange,
  setToast,
  clearToast,
  openModal,
  closeModal,
  setActiveModalCategoryTab,
  addWidget,
  removeWidget,
  updateCategoryWidgets,
  resetDashboard
} from './store/dashboardSlice';

export function App() {
  const dispatch = useDispatch();
  const {
    data,
    searchQuery,
    isAddWidgetModalOpen,
    activeModalCategoryTab,
    targetAddCategory,
    selectedTimeRange,
    notificationToast
  } = useSelector((state) => state.dashboard);

  const showNotification = (msg) => {
    dispatch(setToast(msg));
    setTimeout(() => {
      dispatch(clearToast());
    }, 3500);
  };

  const handleOpenAddModal = (categoryId = null, tabLabel = null) => {
    dispatch(openModal({
      categoryTab: categoryId || 'cspm',
      targetCategory: categoryId
    }));
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch(removeWidget({ categoryId, widgetId }));
    showNotification('Widget removed from dashboard');
  };

  const handleConfirmCategoryWidgets = (categoryId, selectedWidgets) => {
    dispatch(updateCategoryWidgets({ categoryId, selectedWidgets }));
    showNotification('Dashboard layout updated successfully');
  };

  const handleAddNewCustomWidget = (categoryId, newWidget) => {
    dispatch(addWidget({ categoryId, widget: newWidget }));
    showNotification(`Added widget "${newWidget.name}"`);
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col font-sans">
      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xl border border-slate-700 flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          <span>{notificationToast}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={(q) => dispatch(setSearchQuery(q))}
        onNotify={showNotification}
      />

      {/* Main Dashboard Content */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-6 py-6">
        <DashboardHeader
          onAddWidgetClick={() => handleOpenAddModal('cspm')}
          onReset={() => dispatch(resetDashboard())}
          selectedTimeRange={selectedTimeRange}
          onSelectTimeRange={(range) => dispatch(setTimeRange(range))}
          onNotify={showNotification}
        />

        {/* Dynamic Category Sections */}
        <div className="space-y-6">
          {data.categories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              searchQuery={searchQuery}
              onRemoveWidget={handleRemoveWidget}
              onAddWidgetClick={(catId, tab) => handleOpenAddModal(catId, tab)}
            />
          ))}
        </div>
      </main>

      {/* Slide-over Drawer for Adding / Personalising Widgets */}
      <AddWidgetDrawer
        isOpen={isAddWidgetModalOpen}
        onClose={() => dispatch(closeModal())}
        categories={data.categories}
        activeTab={activeModalCategoryTab}
        targetCategory={targetAddCategory}
        onTabChange={(tabId) => dispatch(setActiveModalCategoryTab(tabId))}
        onConfirmWidgets={handleConfirmCategoryWidgets}
        onAddNewCustomWidget={handleAddNewCustomWidget}
      />
    </div>
  );
}

export default App;
