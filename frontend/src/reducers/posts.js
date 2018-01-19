import {
  SAVE_ALL_POSTS,
  SET_POST_DETAIL,
  SAVE_EDITED_POST,
  SAVE_NEW_POST,
  DELETE_POST,
  DELETE_COMMENT,
  ADD_COMMENT

} from '../actions'

const initialPostsState = {
  posts: [],
  comments: [],
  post: {},
};

export function postsReducer (state = initialPostsState, action) {
  switch (action.type) {
    case SAVE_ALL_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case SET_POST_DETAIL:
      return {
        ...state,
        post: action.post,
      };
    case SAVE_EDITED_POST:
      const posts = state.posts;
      return {
        ...state,
        posts: posts.filter(post => post.id !== action.post.id).concat([action.post]),
        post: action.post,
      };
    case SAVE_NEW_POST:
      return {
        ...state,
        posts: state.posts.concat([action.post]),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.post_id),
        post: {},
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          commentCount: state.post.commentCount - 1,
        }
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          commentCount: state.post.commentCount + 1,
        }
      };
    default:
      return state
  }
}
