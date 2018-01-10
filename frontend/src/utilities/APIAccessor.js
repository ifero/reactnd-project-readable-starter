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
    body: JSON.stringify(post)
  })
    .then(res => res.json());

export const getPostDetail = (postId) =>
  fetch(`${baseURL}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data.post);

export const votePost = (post, vote) =>
  fetch(`${baseURL}/posts/${post.id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: vote })
  })
    .then(res => res.json());

export const editPost = (post, title, body) =>
  fetch(`${baseURL}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title, body})
  })
    .then(res => res.json());

export const deletePost = (post) =>
  fetch(`${baseURL}/posts/${post.id}`, {
    method: 'DELETE',
    headers: headers,
  })
    .then(res => res.json());

export const getPostComments = (post) =>
  fetch(`${baseURL}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data.comments);

export const addComment = (comment) =>
  fetch(`${baseURL}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })
    .then(res => res.json());