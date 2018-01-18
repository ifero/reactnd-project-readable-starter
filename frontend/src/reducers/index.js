import {
  SET_CATEGORIES,
  SAVE_ALL_POSTS,
  SET_POST_DETAIL,
  SAVE_EDITED_POST,
  SAVE_NEW_POST,
  DELETE_POST,
  SAVE_EDITED_COMMENT,
  DELETE_COMMENT,
  ADD_COMMENT

} from '../actions'

const initialCategoriesState = {
  categories: [],
};

export function categoriesReducer (state = initialCategoriesState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    default:
      return state
  }
}

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
        comments: action.comments,
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
      };
    case SAVE_EDITED_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.comment.id).concat([action.comment]),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.comment_id),
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: state.comments.concat([action.comment]),
      };
    default:
      return state
  }
}
