import { COMIC_CHANGE_SCALE, COMIC_CHANGE_COLOR} from './constants';

export function changeScale(value) {
  return {
    type: COMIC_CHANGE_SCALE,
    value
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMIC_CHANGE_SCALE:
      return {
        ...state,
        scaleInt: action.value
      };
      case COMIC_CHANGE_COLOR:
        return {
          ...state,
          color: action.value
        };
    default:
      return state;
  }
}
export function changeColor(value) {
  return {
    type: COMIC_CHANGE_COLOR,
    value
  };
}



