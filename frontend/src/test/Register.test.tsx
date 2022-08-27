import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: { auth: authReducer },
});
describe('full app rendering/navigating to Register', () => {
  test('navigate to Register', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await userEvent.click(screen.getByText(/Sign Up/i));

    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Your Account/i)).toBeInTheDocument();
    expect(screen.getByText(/Already Have an Account?/i)).toBeInTheDocument();

    expect(screen.getByText(/Register/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  });
  test('Register form type info', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await userEvent.type(screen.getByPlaceholderText('Name'), 'Test Name');

    expect(screen.getByPlaceholderText('Name')).toHaveAttribute(
      'value',
      'Test Name'
    );

    await userEvent.type(
      screen.getByPlaceholderText('Email Address'),
      'email@gmail.com'
    );

    expect(screen.getByPlaceholderText('Email Address')).toHaveAttribute(
      'value',
      'email@gmail.com'
    );

    await userEvent.type(
      screen.getByPlaceholderText('Password'),
      'test-password'
    );

    expect(screen.getByPlaceholderText('Password')).toHaveAttribute(
      'value',
      'test-password'
    );

    await userEvent.type(
      screen.getByPlaceholderText('Confirm Password'),
      'test-password'
    );

    expect(screen.getByPlaceholderText('Confirm Password')).toHaveAttribute(
      'value',
      'test-password'
    );
  });
  test('Click Register button', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // await userEvent.click(screen.getByText(/Sign Up/i));
    await userEvent.click(screen.getByText('Register'));
  });
});
