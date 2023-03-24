import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Profile from './components/Profile';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

var localStorageMock = (function () {
  var store = {
    user: JSON.stringify({ name: 'Will', username: 'will111', avatar: '' }),
  };
  return {
    getItem: function (key) {
      return store[key];
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key) {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

test('renders landing page heading', () => {
  render(
    <BrowserRouter>
      <Landing />
    </BrowserRouter>
  );
  const heading = screen.getByText(/Welcome to Social Blog/);
  expect(heading).toBeInTheDocument();
});

test('sign up button in landing page', () => {
  render(
    <BrowserRouter>
      <Landing />
    </BrowserRouter>
  );
  fireEvent.click(screen.getByText('Sign up with email'));
  const headings = screen.getAllByText(/Sign Up/);
  expect(headings).toHaveLength(2);
});

test('renders home page heading', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const headings = screen.getAllByText(/Home/);
  expect(headings).toHaveLength(2);
});

test('renders profile name and profile page heading', () => {
  render(
    <BrowserRouter>
      <Profile />
    </BrowserRouter>
  );
  const name = screen.getByText(/Will/);
  const username = screen.getByText(/@will111/);
  const heading = screen.getByText(/My Profile/);
  expect(name).toBeInTheDocument();
  expect(username).toBeInTheDocument();
  expect(heading).toBeInTheDocument();
});
