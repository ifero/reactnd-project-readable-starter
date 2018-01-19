import {
  addPost,
  deletePost,
  editPost, getPostComments,
  getPostDetail,
  getPosts,
  votePost
} from "../utilities/APIAccessor";
import {DELETE_POST, SAVE_ALL_POSTS, SAVE_EDITED_POST, SAVE_NEW_POST, SET_POST_DETAIL} from "./index";
import {generateUUID} from "../utilities/uuid";

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
          if (post.id === undefined) {
            reject();
          }
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