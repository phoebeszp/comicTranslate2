import { COMIC_CHANGE_DISPLAY_IMAGE } from './constants';

export function changeDisplayImage(value) {
  return {
    type: COMIC_CHANGE_DISPLAY_IMAGE,
    value
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMIC_CHANGE_DISPLAY_IMAGE:
      return {
        ...state,
        selectedImage: action.value.pic
      };

    default:
      return state;
  }
}