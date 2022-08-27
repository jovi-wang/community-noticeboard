import React from 'react';
import { render, screen } from '@testing-library/react';

import NotFound from '../pages/NotFound';

describe('Render NotFound Page', () => {
  test('Render NotFound Page', () => {
    render(<NotFound />);

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(
      screen.getByText('Sorry, this page does not exist')
    ).toBeInTheDocument();
  });
});
