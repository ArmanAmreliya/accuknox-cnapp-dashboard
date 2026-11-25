import { describe, it, expect } from 'vitest';
import dashboardReducer, {
  addWidget,
  removeWidget,
  setSearchQuery,
  updateCategoryWidgets,
  resetDashboard
} from './dashboardSlice';
import { initialDashboardData } from '../data/dashboardData';

describe('dashboardSlice reducers', () => {
  const getFreshState = () => ({
    data: JSON.parse(JSON.stringify(initialDashboardData)),
    searchQuery: '',
    isAddWidgetModalOpen: false,
    activeModalCategoryTab: 'cspm',
    targetAddCategory: null
  });

  it('should remove a widget from category when removeWidget is called', () => {
    const initialState = getFreshState();
    const state = dashboardReducer(
      initialState,
      removeWidget({ categoryId: 'cspm', widgetId: 'cloud-accounts' })
    );

    const cspmCategory = state.data.categories.find(c => c.id === 'cspm');
    expect(cspmCategory.widgets.some(w => w.id === 'cloud-accounts')).toBe(false);
  });

  it('should add a custom widget to a category when addWidget is called', () => {
    const initialState = getFreshState();
    const newWidget = {
      id: 'custom-widget-123',
      name: 'Custom Metric',
      text: 'Sample metric content'
    };

    const state = dashboardReducer(
      initialState,
      addWidget({ categoryId: 'cwpp', widget: newWidget })
    );

    const cwppCategory = state.data.categories.find(c => c.id === 'cwpp');
    const added = cwppCategory.widgets.find(w => w.id === 'custom-widget-123');
    expect(added).toBeDefined();
    expect(added.name).toBe('Custom Metric');
  });

  it('should update search query correctly', () => {
    const initialState = getFreshState();
    const state = dashboardReducer(initialState, setSearchQuery('Cloud'));
    expect(state.searchQuery).toBe('Cloud');
  });

  it('should batch update category widgets on drawer confirm', () => {
    const initialState = getFreshState();
    const selectedWidgets = [
      { id: 'cloud-accounts', name: 'Cloud Accounts' }
    ];

    const state = dashboardReducer(
      initialState,
      updateCategoryWidgets({ categoryId: 'cspm', selectedWidgets })
    );

    const cspmCategory = state.data.categories.find(c => c.id === 'cspm');
    expect(cspmCategory.widgets.length).toBe(1);
    expect(cspmCategory.widgets[0].id).toBe('cloud-accounts');
  });
});

