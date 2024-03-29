export const signUp = (details) =>
  fetch('http://localhost:3001/auth/signup', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
  }).then((res) => res.json());

export const login = (details) =>
  fetch('http://localhost:3001/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
  }).then((res) => res.json());

export const addPost = (details) =>
  fetch('http://localhost:3001/posts/addPost', {
    method: 'POST',
    credentials: 'include',
    headers: {},
    body: details,
  }).then((res) => res.json());

export const removePost = (details) =>
  fetch('http://localhost:3001/posts/removePost', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(details),
  }).then((res) => res.json());

export const getAllPosts = () =>
  fetch('http://localhost:3001/posts/getAllPosts', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

export const getMyPosts = (details) =>
  fetch('http://localhost:3001/posts/getMyPosts', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      username: details.username,
    },
  }).then((res) => res.json());

export const getPost = (id) =>
  fetch('http://localhost:3001/posts/getPost', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      id: id,
    },
  }).then((res) => res.json());

export const addComment = (details) =>
  fetch('http://localhost:3001/posts/addComment', {
    method: 'POST',
    credentials: 'include',
    headers: {},
    body: details,
  }).then((res) => res.json());

export const removeComment = (details) =>
  fetch('http://localhost:3001/posts/removeComment', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(details),
  }).then((res) => res.json());

export const bookmark = (details) =>
  fetch('http://localhost:3001/posts/bookmark', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(details),
  }).then((res) => res.json());

export const getBookmarks = (details) =>
  fetch('http://localhost:3001/posts/getBookmarks', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      email: details.email,
    },
  }).then((res) => res.json());

export const removeBookmark = (details) =>
  fetch('http://localhost:3001/posts/removeBookmark', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
  }).then((res) => res.json());

export const likePost = (details) =>
  fetch('http://localhost:3001/posts/likePost', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(details),
  }).then((res) => res.json());

export const getLikedPosts = (details) =>
  fetch('http://localhost:3001/posts/getLikedPosts', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      email: details.email,
    },
  }).then((res) => res.json());

export const unlikePost = (details) =>
  fetch('http://localhost:3001/posts/unlikePost', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
  }).then((res) => res.json());

export const editProfile = (details) =>
  fetch('http://localhost:3001/users/editProfile', {
    method: 'POST',
    credentials: 'include',
    headers: {},
    body: details,
  }).then((res) => res.json());

export const getAllUsers = () =>
  fetch('http://localhost:3001/users/getAllUsers', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

export const getRoomDetails = (details) =>
  fetch('http://localhost:3001/messages/getRoomDetails', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      user1: details.user1,
      user2: details.user2,
    },
  }).then((res) => res.json());

export const sendMessage = (details) =>
  fetch('http://localhost:3001/messages/sendMessage', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
  }).then((res) => res.json());

export const getContacts = (details) =>
  fetch('http://localhost:3001/messages/getContacts', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      username: details.username,
    },
  }).then((res) => res.json());

export const deleteRoom = (details) =>
  fetch('http://localhost:3001/messages/deleteRoom', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      user1: details.user1,
      user2: details.user2,
    },
  }).then((res) => res.json());
