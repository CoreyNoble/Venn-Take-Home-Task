import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('renders children content', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});