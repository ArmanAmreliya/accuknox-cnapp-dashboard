import { createSlice } from '@reduxjs/toolkit';
import { initialDashboardData } from '../data/dashboardData';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('accuknox_dashboard_state');
    if (serializedState === null) {
      return initialDashboardData;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialDashboardData;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem('accuknox_dashboard_state', JSON.stringify(state));
  } catch {
    // Ignore write errors
  }
};

const initialState = {
  data: loadState(),
  searchQuery: '',
  isAddWidgetModalOpen: false,
  activeModalCategoryTab: 'cspm', // default selected tab
  targetAddCategory: null, // when clicking "+ Add Widget" on a specific card
  selectedTimeRange: 'Last 2 days',
  notificationToast: null
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setTimeRange: (state, action) => {
      state.selectedTimeRange = action.payload;
    },
    setToast: (state, action) => {
      state.notificationToast = action.payload;
    },
    clearToast: (state) => {
      state.notificationToast = null;
    },
    openModal: (state, action) => {
      state.isAddWidgetModalOpen = true;
      if (action.payload?.categoryTab) {
        state.activeModalCategoryTab = action.payload.categoryTab;
      }
      if (action.payload?.targetCategory) {
        state.targetAddCategory = action.payload.targetCategory;
      }
    },
    closeModal: (state) => {
      state.isAddWidgetModalOpen = false;
      state.targetAddCategory = null;
    },
    setActiveModalCategoryTab: (state, action) => {
      state.activeModalCategoryTab = action.payload;
    },
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.data.categories.find(c => c.id === categoryId);
      if (category) {
        const newWidget = {
          id: widget.id || `widget-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          name: widget.name,
          text: widget.text || '',
          type: widget.type || 'text',
          ...widget
        };
        category.widgets.push(newWidget);
        saveState(state.data);
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.data.categories.find(c => c.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(w => w.id !== widgetId);
        saveState(state.data);
      }
    },
    updateCategoryWidgets: (state, action) => {
      // payload: { categoryId, selectedWidgetIds, availableWidgets }
      const { categoryId, selectedWidgets } = action.payload;
      const category = state.data.categories.find(c => c.id === categoryId);
      if (category) {
        category.widgets = selectedWidgets;
        saveState(state.data);
      }
    },
    resetDashboard: (state) => {
      state.data = initialDashboardData;
      saveState(state.data);
    }
  }
});

export const {
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
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

