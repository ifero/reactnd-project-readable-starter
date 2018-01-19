import {
  voteComment,
  addComment,
  deleteComment,
  editComment
} from '../utilities/APIAccessor';
import { generateUUID } from '../utilities/uuid'
import {ADD_COMMENT, DELETE_COMMENT, SAVE_EDITED_COMMENT} from "./index";

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

export function editSelectedComment(comment_id, body) {
  return dispatch =>
    new Promise((resolve, reject) => {
      editComment(comment_id, Date.now(), body)
        .then(comment => {
          dispatch(saveEditedComment(comment));
          resolve();
        })
        .catch(() => {
          reject();
        })
    })
}