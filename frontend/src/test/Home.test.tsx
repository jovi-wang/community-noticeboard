/* eslint-disable testing-library/no-node-access */

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../App';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

const initStore = configureStore({
  reducer: { auth: authReducer },
});

const authStore = configureStore({
  reducer: { auth: authReducer },
  preloadedState: {
    auth: { user: { email: 'string', password: 'string' }, error: '' },
  },
});

describe('App home page', () => {
  test('Render header before login', () => {
    render(
      <Provider store={initStore}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Community Noticeboard')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toHaveClass('navbar bg-dark');

    expect(screen.getAllByRole('link')).toHaveLength(3);
    expect(screen.getByText('Community Noticeboard')).toContainHTML(
      '<a href="/">Community Noticeboard</a>'
    );
    // screen.debug();
  });
  test('Render header after login', () => {
    render(
      <Provider store={authStore}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Community Noticeboard')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toHaveClass('navbar bg-dark');

    expect(screen.getAllByRole('link')).toHaveLength(7);
    expect(screen.getByText('Community Noticeboard')).toContainHTML(
      '<a href="/">Community Noticeboard</a>'
    );

    expect(screen.getByText('Posts')).toContainHTML(
      '<span class="hide-sm">Posts</span>'
    );

    expect(screen.getByText('Posts').closest('a')).toHaveAttribute(
      'href',
      '/posts'
    );
    expect(screen.getByText('Members')).toContainHTML(
      '<span class="hide-sm">Members</span>'
    );
    expect(screen.getByText('Members').closest('a')).toHaveAttribute(
      'href',
      '/profiles'
    );
    expect(screen.getByText('Logout')).toContainHTML(
      '<span class="hide-sm">Logout</span>'
    );
  });
  test('Render Home page before login', () => {
    render(
      <Provider store={initStore}>
        <App />
      </Provider>
    );
    expect(screen.getByText('Your community')).toBeInTheDocument();
    expect(screen.getByText('Your community')).toHaveClass('x-large');
    expect(
      screen.getByText(
        'Our Community Noticeboard keeps you informed with what is happening locally.'
      )
    ).toBeInTheDocument();

    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toHaveClass('btn btn-primary');
    expect(screen.getByText('Sign Up')).toHaveAttribute('href', '/register');

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Login')).toHaveClass('btn');
    expect(screen.getByText('Login')).toHaveAttribute('href', '/login');
  });
  test('Render Hope page after login', () => {
    render(
      <Provider store={authStore}>
        <App />
      </Provider>
    );
    expect(screen.getAllByRole('link')).toHaveLength(7);

    expect(screen.getByText('Your community')).toBeInTheDocument();
    expect(screen.getByText('Your community')).toHaveClass('x-large');
    expect(
      screen.getByText(
        'Our Community Noticeboard keeps you informed with what is happening locally.'
      )
    ).toBeInTheDocument();

    expect(screen.getByText('Connect with locals...')).toBeInTheDocument();
    expect(screen.getByText('Connect with locals...')).toHaveClass(
      'btn btn-primary'
    );
    expect(screen.getByText('Connect with locals...')).toHaveAttribute(
      'href',
      '/profiles'
    );

    expect(screen.getByText('Share your thoughts...')).toBeInTheDocument();
    expect(screen.getByText('Share your thoughts...')).toHaveClass('btn');
    expect(screen.getByText('Share your thoughts...')).toHaveAttribute(
      'href',
      '/posts'
    );

    expect(screen.getByText('Edit my profile')).toBeInTheDocument();
    expect(screen.getByText('Edit my profile')).toHaveClass('btn-dark');
    expect(screen.getByText('Edit my profile')).toHaveAttribute('href', '/me');
  });
});
