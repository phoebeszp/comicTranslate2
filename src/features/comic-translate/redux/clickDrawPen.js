import { COMIC_CLICK_DRAW_PEN, COMIC_ADD_COMMENTS } from './constants';
export function clickDrawPen(){
    return {
      type: COMIC_CLICK_DRAW_PEN
    }
  }
  export function addComments(value){
    return {
      type:COMIC_ADD_COMMENTS,
      value
    }
  }
  export function reducer(state, action) {
    switch (action.type) {
      case COMIC_CLICK_DRAW_PEN:
        return {
          ...state,
          isDrawing: {...state.isDrawing, processing:!state.isDrawing.processing}
        };
      case COMIC_ADD_COMMENTS:
          return {...state, selectedComment:{...state.selectedComment, rectData:action.value, content:'new comment'}};
      default:
        return state;
    }
  }
  