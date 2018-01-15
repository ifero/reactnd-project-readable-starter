import { Map } from 'immutable';
import {
  SET_CATEGORIES,
  SAVE_ALL_POSTS,
  SET_POST_DETAIL
} from '../actions'

const initialCategoriesState = Map({
  categories: [],
});

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

const initialPostsState = Map({
  posts: [],
});

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
      }
    default:
      return state
  }
}
