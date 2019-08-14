import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Button, Upload, Icon, Row, Col } from 'antd';

export class DetailInfo extends Component {
  static propTypes = {
    comicTranslateDetailInfo: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  
  render() {
    const {booknum, bookname, chapternum, chaptername, resourcenum} = this.props.comicTranslateDetailInfo;
    
    return (
      <div className="comic-translate-detail-info">
        <div className = 'resourceDetail'>
          <Row gutter={16}>
          <Col className="gutter-row" span={8}>
            <div>Booke Number:{booknum}</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div >Booke Name:{bookname}</div>
          </Col>
          </Row>
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <div>Chapter Number:{chapternum}</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div>Chapter Name:{chaptername}</div>
            </Col>
            </Row>
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <div>Resource Number:{resourcenum}</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div>Status:</div>
            </Col>
          </Row>
        </div>
        <div >
          <Upload className = 'uploadBtnStyle'>
            <Button size='small'>
              <Icon type="upload" /> Upload Design
            </Button>
          </Upload >
          <Button className = 'vocabularyBtnStyle' size='small'>Vacabulary</Button>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    comicTranslateDetailInfo: state.comicTranslate.detailInfo,
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
)(DetailInfo);
