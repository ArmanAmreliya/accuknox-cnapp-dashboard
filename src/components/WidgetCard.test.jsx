import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WidgetCard } from './WidgetCard';

describe('WidgetCard Component', () => {
  it('renders widget title and triggers onRemove when cross icon is clicked', () => {
    const mockRemove = vi.fn();
    const mockWidget = {
      id: 'w-1',
      name: 'Cloud Accounts',
      type: 'text',
      text: 'Test widget details'
    };

    render(<WidgetCard widget={mockWidget} onRemove={mockRemove} />);

    expect(screen.getByText('Cloud Accounts')).toBeInTheDocument();
    expect(screen.getByText('Test widget details')).toBeInTheDocument();

    const removeBtn = screen.getByLabelText('Remove Cloud Accounts');
    fireEvent.click(removeBtn);

    expect(mockRemove).toHaveBeenCalledWith('w-1');
  });
});

