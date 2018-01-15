import {getCategories, getPosts, getPostDetail} from '../utilities/APIAccessor';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SAVE_ALL_POSTS = 'SAVE_ALL_POSTS';
export const SET_POST_DETAIL = 'SET_POST_DETAIL';

function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories,
  }
}

function setPostDetail(post) {
  return {
    type: SET_POST_DETAIL,
    post,
  }
}

function saveAllPosts(posts) {
  return {
    type: SAVE_ALL_POSTS,
    posts,
  }
}

export function fetchCategories() {
  return dispatch =>
    new Promise((resolve, reject) => {
      getCategories()
        .then(categories => {
          dispatch(setCategories(categories))
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
          dispatch(saveAllPosts(posts))
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
          dispatch(setPostDetail(post))
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
}