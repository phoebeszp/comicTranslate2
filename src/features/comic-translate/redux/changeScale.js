import { COMIC_CHANGE_DISPLAY_IMAGE,
  COMIC_CHANGE_SCALE, 
  COMIC_CHANGE_COLOR, 
  COMIC_DRAG_MOVE, 
  COMIC_CLICK_DRAW_PEN, 
  COMIC_CHANGE_COMMENT,
  COMIC_SAVE_COMMENT, 
  COMIC_CANCEL_COMMENT,
  COMIC_ADD_COMMENTS,
  COMIC_REMOVE_COMMENT,
  COMIC_SHOW_SELECTED_COMMENT,
  COMIC_SHOW_SELECTED_RECT,
  COMIC_DESELECT
} from './constants';

export function removeComment(value){
  return {
    type: COMIC_REMOVE_COMMENT,
    value
  }
}
export function deSelectAll(){
  return {
    type: COMIC_DESELECT
  }
}
export function saveComment(){
  return {
    type: COMIC_SAVE_COMMENT
  }
}
export function cancelComment(){
  return {
    type: COMIC_CANCEL_COMMENT
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

export function changeDisplayImage(value) {
  return {
    type: COMIC_CHANGE_DISPLAY_IMAGE,
    value
  };
}
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
export function showSelectedComment(value){
  return {
    type: COMIC_SHOW_SELECTED_COMMENT,
    value
  }
}
export function showSelectedRect(value){
  return {
    type: COMIC_SHOW_SELECTED_RECT,
    value
  }
}
export function reducer(state, action) {
  switch (action.type) {
    case COMIC_CHANGE_SCALE:
      const {height, width} = state.selectedImage;
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
              tr_content: action.value,
            },
            defaultActiveTab: "1"
          }
        };
      case COMIC_SHOW_SELECTED_COMMENT:
        const selectedItem = state.comment.list.find(item => item.id === action.value.id);
        return {
          ...state,
          comment:{
            ...state.comment,
            newComment: selectedItem,
            defaultActiveTab: "1"
          },
          isDrawing: {
            ...state.isDrawing,
            processing: 1
          }
        };
      case COMIC_SHOW_SELECTED_RECT:
        const commentList = state.comment.list;
        const selected =  action.value.id;
        return {...state, 
          comment: {...state.comment, list:commentList.map(item =>{
          if(item.id === selected){
            item.selected = true;
          }else {
            item.selected = false;
          }
          return item;}), 
          onlyShowSelected: true
        }
      }
      case COMIC_CANCEL_COMMENT:
        return {
          ...state,
          comment:{
            ...state.comment,
            newComment:{
              ...state.comment.newComment,
              tr_content: ""
            },
            // onlyShowSelected: false,
            defaultActiveTab: "2"
          },
          isDrawing: {
            ...state.isDrawing,
            processing: 0
          }
        };
     
    case COMIC_SAVE_COMMENT:
      const newDate = new Date();
      const newComment = state.comment.newComment;
      const selectedId = newComment.id;
      if(selectedId){ //edit
        return {...state, 
          comment:{
          ...state.comment,
          list: state.comment.list.map(item => {
              if(item.id === selectedId){
                return {...item,
                  id: selectedId,
                  rectData: newComment.rectData, 
                  tr_content: newComment.tr_content,
                  title :  `${newDate.getMonth()}-${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`
                }
              }
              return item;
            }),
          newComment:{
            ...state.comment.newComment,
            tr_content: "",
            rectData: "",
            id:''
          },
          // onlyShowSelected: false,
          defaultActiveTab: "2"
        },
        isDrawing: {
          ...state.isDrawing,
          processing: 2
        }
      };
      }
      return {
        ...state,
        comment:{
          ...state.comment,
            list:[...state.comment.list, {
              id: newComment.rectData.id,
              rectData: newComment.rectData, 
              tr_content: newComment.tr_content,
              title: `${newDate.getMonth()}-${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}`
            }],
            newComment:{
              ...state.comment.newComment,
              tr_content: "",
              rectData: "",
              id:''
            },
            // onlyShowSelected: false,
            defaultActiveTab: "2"
        },
        isDrawing: {
          ...state.isDrawing,
          processing: 2
        }
      };
      case COMIC_REMOVE_COMMENT: 
        return {...state, 
                comment:{
                  ...state.comment,
                    list: state.comment.list.filter(item=> item.rectData.id !== action.value.id ),
                    onlyShowSelected: false
                  }
                };
      case COMIC_DESELECT:
        return {
          ...state,
          comment: {
            ...state.comment,
            list: state.comment.list.map(item => {
               item.selected = false;
               return item;
            }),
            onlyShowSelected: false
          }
        }
      case COMIC_CHANGE_DISPLAY_IMAGE:
        return {
          ...state,
          selectedImage: action.value.pic
        };
        case COMIC_CLICK_DRAW_PEN:
        const currentStatus = state.isDrawing.processing === 0 ? 2 : 0;
        return {
          ...state,
          isDrawing: {...state.isDrawing, processing:currentStatus}
        };
      case COMIC_ADD_COMMENTS:
          return {
            ...state,
            comment:{
              ...state.comment,
              newComment:{
                ...state.comment.newComment,
                rectData: action.value[0],
              },
              defaultActiveTab: "1"
            },
            isDrawing: {
              ...state.isDrawing,
              processing: 1
            }
          }
    default:
      return state;
  }
}



