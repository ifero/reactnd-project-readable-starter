const baseURL = 'http://localhost:3001';

const headers = {
  'Accept': 'application/json',
  'Authorization': 'ifero',
}

export const getCategories = () =>
  fetch(`${baseURL}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getCategoryPosts = (category) =>
  fetch(`${baseURL}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data.posts)

export const getPosts = () =>
  fetch(`${baseURL}/posts`, { headers })
    .then(res => res.json())
    .then(data => data.posts);

export const addPost = (post) =>
  fetch(`${baseURL}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ post })
  })
    .then(res => res.json());