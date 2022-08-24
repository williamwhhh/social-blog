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

export const getAllPosts = () =>
  fetch('http://localhost:3001/posts/getAllPosts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
