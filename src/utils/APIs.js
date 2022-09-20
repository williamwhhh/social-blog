export const signUp = (details) =>
  fetch('http://localhost:3001/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
  }).then((res) => res.json());

export const login = (details) =>
  fetch('http://localhost:3001/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
  }).then((res) => res.json());

export const addPost = (details) =>
  fetch('http://localhost:3001/posts/addPost', {
    method: 'POST',
    headers: {},
    body: details,
  }).then((res) => res.json());

export const removePost = (details) =>
  fetch('http://localhost:3001/posts/removePost', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(details),
  }).then((res) => res.json());

export const getAllPosts = () =>
  fetch('http://localhost:3001/posts/getAllPosts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

export const bookmark = (details) =>
  fetch('http://localhost:3001/posts/bookmark', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(details),
  }).then((res) => res.json());

export const getBookmarks = (details) =>
  fetch('http://localhost:3001/posts/getBookmarks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      email: details.email,
    },
  }).then((res) => res.json());

export const removeBookmark = (details) =>
  fetch('http://localhost:3001/posts/removeBookmark', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
  }).then((res) => res.json());

export const editProfile = (details) =>
  fetch('http://localhost:3001/users/editProfile', {
    method: 'POST',
    headers: {},
    body: details,
  }).then((res) => res.json());

export const getAllUsers = () =>
  fetch('http://localhost:3001/users/getAllUsers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
