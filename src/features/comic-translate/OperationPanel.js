import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Button, Icon, Row, Col,Radio } from 'antd';

const SCALE_REATES=[10, 25, 50, 75, 100];
const COLORS =['#ffffff', '#000000','#0000ff', '#00ff00', '#ff0000']
export class OperationPanel extends Component {
  static propTypes = {
    scaleInt: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    isDrawing: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    previlege: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  };
  state = {
    selectedOption:0
  }
  onChangeSelection = e => {
    let selectedValue = e.target.value;
    this.setState({
      selectedOption: e.target.value,
    });
    let selectedPic = this.props.params.params.pic;
    if(selectedValue ===1){
      selectedPic = this.props.params.designPic;
    }
    this.props.actions.changeDisplayImage({pic:selectedPic})
  };
  componentDidMount(){
    this.props.actions.changeDisplayImage({pic: this.props.params.pic});
  }
  render() {
    let scaleInt = this.props.scaleInt;
    let isDrawing = this.props.isDrawing.processing < 1;
    let disableBtn = this.props.isDrawing.processing === 1;
    return (
      <div className="comic-translate-operation-panel">
            <Row gutter={16}>
              <Col span={8}>
                {
                  SCALE_REATES.map(item => 
                    <Button onClick={()=>this.props.actions.changeScale(item/100)} key={item+'key'}
                    type={item/100===scaleInt?'primary':''} size='small'>{item}%</Button>
                  )
                }
              </Col>
              {this.props.previlege.editable && (
              <Col span={8} >
                <Button type={isDrawing?'primary':''} style={{backgroundColor: (!isDrawing&&this.props.color === '#ffffff')&&'#333'}}
                onClick={this.props.actions.clickDrawPen} 
                disabled = {disableBtn}
                size='small'>
                  <Icon type='edit' style={{color:this.props.color}} theme='filled'/>
                </Button>
                {
                  COLORS.map(ele => <Button shape='circle' style={{backgroundColor: ele}} 
                  disabled = {disableBtn} 
                  key={ele+'key'} 
                  size='small'
                  onClick={()=> this.props.actions.changeColor(ele)}
                   ></Button>
                  )
                }
              </Col>)}
              {this.props.previlege.showDesignPic && (
                <Col span={8}>
                      <Radio.Group onChange={this.onChangeSelection} value={this.state.selectedOption}>
                        <Radio value={0}>Raw</Radio>
                        <Radio value={1}>Design</Radio>
                      </Radio.Group>
                </Col>
              )}
            </Row>
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
    previlege: state.comicTranslate.previlege,
    params: state.comicTranslate.params
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OperationPanel);
