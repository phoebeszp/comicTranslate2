import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Button, Upload, Icon, Row, Col } from 'antd';

export class DetailInfo extends Component {
  static propTypes = {
    comicTranslate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    // const {bookNO, bookName, chapterNO, chapterNumber, resourceNo, progross} = this.props.comicTranslate;
    const bookNO = '仙剑奇侠传';
    return (
      <div className="comic-translate-detail-info">
        <div className = 'resourceDetail'>
          <Row gutter={16}>
          <Col className="gutter-row" span={8}>
            <div>Booke Number:{bookNO}</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div >Booke Name:</div>
          </Col>
          </Row>
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <div>Chapter Number:</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div>Chapter Name:</div>
            </Col>
            </Row>
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <div>Resource Number:</div>
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
    comicTranslate: state.comicTranslate,
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
