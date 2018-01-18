import {
  getCategories,
  getPosts,
  getPostDetail,
  editPost,
  addPost,
  getPostComments,
  deletePost,
  votePost,
  voteComment,
  addComment,
  deleteComment
} from '../utilities/APIAccessor';
import { generateUUID } from '../utilities/uuid'
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SAVE_ALL_POSTS = 'SAVE_ALL_POSTS';
export const SET_POST_DETAIL = 'SET_POST_DETAIL';
export const SAVE_EDITED_POST = 'SAVE_EDITED_POST';
export const SAVE_NEW_POST = 'SAVE_NEW_POST';
export const DELETE_POST = 'DELETE_POST';
export const SAVE_EDITED_COMMENT = 'SAVE_EDITED_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories,
  }
}

function setPostDetail(post, comments) {
  return {
    type: SET_POST_DETAIL,
    post,
    comments,
  }
}

function saveAllPosts(posts) {
  return {
    type: SAVE_ALL_POSTS,
    posts,
  }
}

function saveEditedPost(post) {
  return {
    type: SAVE_EDITED_POST,
    post,
  }
}

function saveNewPost(post) {
  return {
    type: SAVE_NEW_POST,
    post,
  }
}

function deleteSelectedPost(post_id) {
  return {
    type: DELETE_POST,
    post_id,
  }
}

function saveEditedComment(comment) {
  return {
    type: SAVE_EDITED_COMMENT,
    comment,
  }
}

function saveNewComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

function deleteSelectedComment(comment_id) {
  return {
    type: DELETE_COMMENT,
    comment_id,
  }
}

export function fetchCategories() {
  return dispatch =>
    new Promise((resolve, reject) => {
      getCategories()
        .then(categories => {
          dispatch(setCategories(categories));
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
}

export function fetchPosts() {
  return dispatch =>
    new Promise((resolve, reject) => {
      getPosts()
        .then(posts => {
          dispatch(saveAllPosts(posts));
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
}

export function fetchPostDetail(postID) {
  return dispatch =>
    new Promise((resolve, reject) => {
      getPostDetail(postID)
        .then(post => {
          if (post.commentCount > 0){
            getPostComments(postID)
              .then(comments => {
                dispatch(setPostDetail(post, comments));
                resolve();
              })
              .catch(() => {
                reject();
              })
          }
          else {
            dispatch(setPostDetail(post, []));
            resolve();
          }
        })
        .catch(() => {
          reject();
        });
    });
}

export function editSelectedPost(post_id, title, body) {
  return dispatch =>
    new Promise((resolve, reject) => {
      editPost(post_id, title, body)
        .then(post => {
          dispatch(saveEditedPost(post));
          resolve();
        })
        .catch(() => {
          reject();
        })
    });
}

export function createPost(post) {
  return dispatch =>
    new Promise((resolve, reject) => {
      addPost({
        ...post,
        id: generateUUID(),
        timestamp: Date.now(),
      })
        .then(post => {
          dispatch(saveNewPost(post));
          resolve();
        })
        .catch(() => {
          reject();
        })
    });
}

export function removePost(post_id) {
  return dispatch =>
    new Promise((resolve, reject) => {
    deletePost(post_id)
      .then(() => {
        dispatch(deleteSelectedPost(post_id));
        resolve();
      })
      .catch(() => {
        reject();
      })
    })
}

export function voteSelectedPost(post_id, vote) {
  return dispatch =>
    new Promise((resolve, reject) => {
      votePost(post_id, vote)
        .then(post => {
          dispatch(saveEditedPost(post));
          resolve();
        })
        .catch(() => {
          reject();
        })
    })
}

export function voteSelectedComment(comment_id, vote) {
  return dispatch =>
    new Promise((resolve, reject) => {
      voteComment(comment_id, vote)
        .then(comment => {
          dispatch(saveEditedComment(comment));
          resolve();
        })
        .catch(() => {
          reject();
        })
    })
}

export function createComment(post_id, comment) {
  return dispatch =>
    new Promise((resolve, reject) => {
      addComment({
        ...comment,
        id: generateUUID(),
        timestamp: Date.now(),
        parentId: post_id,
      })
        .then(comment => {
          dispatch(saveNewComment(comment));
          resolve();
        })
        .catch(() => {
          reject();
        })
    })
}

export function removeComment(comment_id) {
  return dispatch =>
    new Promise((resolve, reject) => {
      deleteComment(comment_id)
        .then(() => {
          dispatch(deleteSelectedComment(comment_id));
          resolve();
        })
        .catch(() => {
          reject();
        })
    })
}
