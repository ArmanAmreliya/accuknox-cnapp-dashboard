import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar } from './components/Navbar';
import { DashboardHeader } from './components/DashboardHeader';
import { CategorySection } from './components/CategorySection';
import { AddWidgetDrawer } from './components/AddWidgetDrawer';
import {
  setSearchQuery,
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
    targetAddCategory
  } = useSelector((state) => state.dashboard);

  const handleOpenAddModal = (categoryId = null, tabLabel = null) => {
    dispatch(openModal({
      categoryTab: categoryId || 'cspm',
      targetCategory: categoryId
    }));
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  const handleConfirmCategoryWidgets = (categoryId, selectedWidgets) => {
    dispatch(updateCategoryWidgets({ categoryId, selectedWidgets }));
  };

  const handleAddNewCustomWidget = (categoryId, newWidget) => {
    dispatch(addWidget({ categoryId, widget: newWidget }));
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={(q) => dispatch(setSearchQuery(q))}
      />

      {/* Main Dashboard Content */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-6 py-6">
        <DashboardHeader
          onAddWidgetClick={() => handleOpenAddModal('cspm')}
          onReset={() => dispatch(resetDashboard())}
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
