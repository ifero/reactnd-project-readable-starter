import {
  getCategories,
  getPosts,
  getPostDetail,
  editPost,
  addPost, getPostComments
} from '../utilities/APIAccessor';
import { generateUUID } from '../utilities/uuid'
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SAVE_ALL_POSTS = 'SAVE_ALL_POSTS';
export const SET_POST_DETAIL = 'SET_POST_DETAIL';
export const SAVE_EDITED_POST = 'SAVE_EDITED_POST';
export const SAVE_NEW_POST = 'SAVE_NEW_POST';

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
