import { getCategories } from '../utilities/APIAccessor';
import {SET_CATEGORIES} from "./index";

function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories,
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