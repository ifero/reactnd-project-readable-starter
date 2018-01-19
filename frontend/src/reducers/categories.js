import {SET_CATEGORIES} from "../actions/index";

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