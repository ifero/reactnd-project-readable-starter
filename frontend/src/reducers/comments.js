import {
  SAVE_EDITED_COMMENT,
  DELETE_COMMENT,
  ADD_COMMENT,
  SET_POST_DETAIL
} from '../actions'

const initialCommentsState = {
  comments: [],
};

export function commentsReducer (state = initialCommentsState, action) {
  switch (action.type) {
    case SAVE_EDITED_COMMENT:
      return {
        comments: state.comments.filter(comment => comment.id !== action.comment.id).concat([action.comment]),
      };
    case DELETE_COMMENT:
      return {
        comments: state.comments.filter(comment => comment.id !== action.comment_id),
      };
    case ADD_COMMENT:
      return {
        comments: state.comments.concat([action.comment]),
      };
    case SET_POST_DETAIL:
      return {
        comments: action.comments,
      };
    default:
      return state
  }
}
