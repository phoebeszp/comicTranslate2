import { COMIC_CHANGE_SCALE, COMIC_CHANGE_COLOR, COMIC_DRAG_MOVE, 
  COMIC_CHANGE_COMMENT,COMIC_SAVE_COMMENT} from './constants';

export function saveComment(){
  return {
    type: COMIC_SAVE_COMMENT
  }
}
export function changeComment(value){
  return {
    type: COMIC_CHANGE_COMMENT,
    value
  }
}
export function changeScale(value) {
  return {
    type: COMIC_CHANGE_SCALE,
    value
  };
}
export function changeColor(value) {
  return {
    type: COMIC_CHANGE_COLOR,
    value
  };
}

export function dragMove(value){
  return {
    type: COMIC_DRAG_MOVE,
    value
  }
}
export function reducer(state, action) {
  switch (action.type) {
    case COMIC_CHANGE_SCALE:
      const {height, width} = state.selectedImage;
      const {translateX,translateY} = state.isDrawing;
      const newScaleInt = action.value;
      return {
        ...state,
        scaleInt: newScaleInt,
        isDrawing: {...state.isDrawing, 
          translateX: -0.5*width*(1 - newScaleInt),
          translateY: -0.5*height*(1 - newScaleInt)
        }
      };
      case COMIC_CHANGE_COLOR:
        return {
          ...state,
          color: action.value
        };
      case COMIC_DRAG_MOVE: 
        return {
          ...state,
          isDrawing: {
            ...state.isDrawing, 
            translateX: action.value.translateX,
            translateY: action.value.translateY
        }
      };
      case COMIC_CHANGE_COMMENT: 
        return {
          ...state,
          comment:{
            ...state.comment,
            newComment:{
              ...state.comment.newComment,
              tr_content: action.value
            }
          }
        };
    case COMIC_SAVE_COMMENT:
      return {
        ...state,
        comment:{
          ...state.comment,
            list:[...state.comment.list, {
              description: state.comment.newComment.tr_content,
              title: Date.now()
            }],
            defaultActiveTab: "2"
        }
      };
    default:
      return state;
  }
}



