
var doc = document;
var mouseDown = false, isPinch = false, lastMouseX, lastMouseY;

function handleMouseDown(event) {

    if (event.touches && event.touches.length > 1) {
        isPinch = true;
        mouseDown = false;
        return;
    }

    mouseDown = true;
    lastMouseX = event.clientX || event.touches[0].clientX;
    lastMouseY = event.clientY || event.touches[0].clientY;

    // to detect pinch
    //event.preventDefault();
}

function handleMouseUp(event) {

    isPinch = false;

    if (!mouseDown) {
        return;
    }

    mouseDown = false;
    event.preventDefault();
}

function handleMouseMoveWrapper(mouseMoveHandler) {
    return function(event) {
        if (!mouseDown) {
            return;
        }

        if (isPinch) {
            isPinch = false;
            mouseDown = false;
            return;
        }

        var newX = event.clientX || event.touches[0].clientX;
        var newY = event.clientY || event.touches[0].clientY;

        var deltaX = newX - lastMouseX
        var deltaY = newY - lastMouseY;

        mouseMoveHandler({deltaX: deltaX, deltaY: deltaY});

        lastMouseX = newX
        lastMouseY = newY;

        event.preventDefault();
    };
}
function handleMouseDownWrapper(checkDrawingStatus){
    return function(e){
        let is_drawing = checkDrawingStatus().isDrawing.processing;
        if(is_drawing>0){
            handleMouseDown(e);
        }
    }
}
export default class DragManager {
    static register(domRef, mouseMoveHandler, onDrawing) {
        domRef.addEventListener("mousedown", handleMouseDownWrapper(onDrawing), false);
        // domRef.addEventListener("touchstart", handleMouseDownWrapper(onDrawing), false);

        // doc.addEventListener("touchend", handleMouseUp, false);
        doc.addEventListener("mouseup", handleMouseUp, false);

        var mouseMoveProxy = handleMouseMoveWrapper(mouseMoveHandler);
        // doc.addEventListener("touchmove", mouseMoveProxy, false);
        doc.addEventListener("mousemove", mouseMoveProxy, false);
    }
}