import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import ShetchManager from './manager/ShetchManager';
import DragManager from './manager/DragManager';
import { findDOMNode } from 'react-dom';
// import ImageLoader from './manager/ImageLoader';

export class PictureDisplayer extends React.PureComponent {
  static propTypes = {
    scaleInt: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    isDrawing: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    rectList: PropTypes.array.isRequired,
    onlyShowSelected: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    // previlege: PropTypes.object.isRequired,
    selectedImage: PropTypes.object.isRequired,
  };
  calculatePosition(deltaX, deltaY, screenHeight,screenWidth, translateX, translateY) {
    let newX = translateX, newY = translateY;
    const scaleInt = this.props.scaleInt;
      if(scaleInt !== 1){
          newX = translateX + deltaX ;
          newY = translateY + deltaY;
      }
      return {translateX: newX,translateY: newY};
  } 

  onComponentDragMove(param) {
      let changedTranslate = this.calculatePosition(param.deltaX, param.deltaY, 
        this.screenHeight, this.screenWidth,
        this.props.isDrawing.translateX,
        this.props.isDrawing.translateY );
      this.props.actions.dragMove(changedTranslate);
    }

  returnDrawingStatus(){
      return this.props;
  }
  componentDidUpdate() {
      //let recdata = {"id":"a16165f9-fa24-41e2-91a4-a1f2b82efa82","tool":"rectangle","color":"#ff8040","size":5,"fill":"","start":{"x":60.763885498046875,"y":47},"end":{"x":196.76388549804688,"y":207}};
      if(this.props.isDrawing.processing !== 1){
        ShetchManager.clearRect();
        const list = this.props.rectList;
        const onlyShowSelected = this.props.onlyShowSelected;
        this.props.selectedImage === this.props.params.pic &&
        list.forEach(item => {
          if(item.recdata && (!onlyShowSelected || item.selected)){
            let recdata = item.recdata;
            if(typeof recdata === 'string'){
              recdata = JSON.parse(recdata);
            }
            ShetchManager.draw(recdata);
            if(item.selected) {
              const scaleInt = this.props.scaleInt;
              ShetchManager.changeScrollbar(recdata.start.y*scaleInt, recdata.start.x*scaleInt);
            }
          }
        });
      }
      this.screenHeight = this.refs["picContainerParent"].offsetHeight;
      this.screenWidth = this.refs["picContainerParent"].offsetWidth;
  }
  componentDidMount() {
    DragManager.register(this.refs["container"], this.onComponentDragMove.bind(this), this.returnDrawingStatus.bind(this));
    ShetchManager.register(findDOMNode(this.refs["canvas"]), this.returnDrawingStatus.bind(this), this._callbackOfFinishDrawing.bind(this));
    this.props.actions.fetchData({
      "chapterid": this.props.params.chapterid,
      "resourceid": this.props.params.resourceid
    });
  }
  _callbackOfFinishDrawing(recdata) {
    this.props.actions.addComments(recdata);
  }
  render() {
    const scaleInt = this.props.scaleInt;
    const {height, width, url} = this.props.selectedImage;
    const path = `url('${url}')`;
    const {translateX, translateY} = this.props.isDrawing;
    const isDrawing = this.props.isDrawing.processing < 1;
    let picStyle = {
        backgroundImage: path,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scaleInt})`,
        width: `${width}px`,
        cursor: isDrawing?`pointer`:`move`
    };
    return (
      <div ref="picContainerParent" className="comic-translate-picture-displayer">
        <div ref="container" className='picContrainer' style={picStyle}>
            <canvas ref="canvas" width={width} height={height}/>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    scaleInt: state.comicTranslate.scaleInt,
    color: state.comicTranslate.color,
    isDrawing: state.comicTranslate.isDrawing,
    rectList : state.comicTranslate.comment.list,
    onlyShowSelected : state.comicTranslate.comment.onlyShowSelected,
    params: state.comicTranslate.params,
    selectedImage: state.comicTranslate.selectedImage,
    // previlege: state.comicTranslate.previlege
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
//   ImageLoader.init((param)=>{
//     // imageResource = param;
//     // dispatch(Actions.changeImage({pic:imageResource[INITIAL_SELECTED_VALUE]}));
// });
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PictureDisplayer);
