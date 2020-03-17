

import Rectangle from '../sketchPad/tools/Rectangle';
let tool, doc = document, startDrawing = false, scaleInt = 1, color;
function onMouseDown(e) {
    const data = tool.onMouseDown(...getCursorPosition(e), color, 5, '');
    data && data[0] && this.onItemStart && this.onItemStart.apply(null, data);
    if (this.onDebouncedItemChange) {
      this.interval = setInterval(this.onDebouncedMove, 1000);
    }
    startDrawing = true;
    e.stopPropagation();
  }

function onDebouncedMove() {
    if (typeof tool.onDebouncedMouseMove === 'function' && this.onDebouncedItemChange) {
      this.onDebouncedItemChange.apply(null, tool.onDebouncedMouseMove());
    }
 }

function onMouseMove(e) {
    if(!startDrawing){
        return;
    }
    const data = tool.onMouseMove(...getCursorPosition(e));
    data && data[0] && this.onEveryItemChange && this.onEveryItemChange.apply(null, data);
}

function onMouseUp(e, callback) {
    if(!startDrawing){
        return;
    }
    const data = tool.onMouseUp(...getCursorPosition(e));
    data && data[0] && this.onCompleteItem && this.onCompleteItem.apply(null, data);
    if (this.onDebouncedItemChange) {
        clearInterval(this.interval);
        this.interval = null;
    }
    e.stopPropagation();
    startDrawing = false;
    if(callback){
        callback(data);
    }
}

function getCursorPosition(e) {
    const {top, left} = doc.getBoundingClientRect();
    let x = e.clientX - left, y = e.clientY - top;
    return [
        x/scaleInt,
        y/scaleInt
    ];
}
function handleMouseDownWrapper(checkDrawingStatus){
    return function(e){
        const state = checkDrawingStatus();
        scaleInt = state.scaleInt;
        color = state.color;
        let is_drawing = state.isDrawing.processing;
        if(is_drawing<1){
            onMouseDown.call(doc,e);
        }
    }
}
function handMouseUpWrapper(callback){
    return function(e){
        onMouseUp.call(doc, e, callback);
    };
}
export default class ShetchManager {
    static register(domRef, mouseDownHandler, mouseUpHandler) {
        doc = domRef;
        let ctx = domRef.getContext('2d');
        tool = Rectangle(ctx);
        domRef.addEventListener("mousedown", handleMouseDownWrapper(mouseDownHandler), false);
        domRef.addEventListener("mouseup", handMouseUpWrapper(mouseUpHandler), false);
        domRef.addEventListener("mousemove", onMouseMove, false);
        domRef.addEventListener("mouseout", onMouseUp, false);
    }
    static draw(recdata){
        tool.draw(recdata);
    }
    static clearRect(){
        tool.clear();
    }
    static changeScrollbar (y, x) {
        document.getElementsByClassName("comic-translate-picture-displayer")[0].scrollTop = y;
        document.getElementsByClassName("comic-translate-picture-displayer")[0].scrollLeft  = x;
    }
}