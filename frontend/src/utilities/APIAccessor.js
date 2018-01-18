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
    .then(data => data)

export const getPosts = () =>
  fetch(`${baseURL}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

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
    .then(data => data);

export const votePost = (post_id, vote) =>
  fetch(`${baseURL}/posts/${post_id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: vote })
  })
    .then(res => res.json());

export const editPost = (post_id, title, body) =>
  fetch(`${baseURL}/posts/${post_id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title, body})
  })
    .then(res => res.json());

export const deletePost = (post_id) =>
  fetch(`${baseURL}/posts/${post_id}`, {
    method: 'DELETE',
    headers: headers,
  })
    .then(res => res.json());

export const getPostComments = (post_id) =>
  fetch(`${baseURL}/posts/${post_id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data);

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

export const getComment = (commentID) =>
  fetch(`${baseURL}/comments/${commentID}`, { headers })
    .then(res => res.json())
    .then(data => data);

export const voteComment = (comment_id, vote) =>
  fetch(`${baseURL}/comments/${comment_id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: vote })
  })
    .then(res => res.json());

export const editComment = (comment, timestamp, body) =>
  fetch(`${baseURL}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({timestamp, body})
  })
    .then(res => res.json());

export const deleteComment = (comment) =>
  fetch(`${baseURL}/comments/${comment.id}`, {
    method: 'DELETE',
    headers: headers,
  })
    .then(res => res.json());