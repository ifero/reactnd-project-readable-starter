import {getCategories, getPosts} from '../utilities/APIAccessor';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SAVE_ALL_POSTS = 'SAVE_ALL_POSTS';

function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories,
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