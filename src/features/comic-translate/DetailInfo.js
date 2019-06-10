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
            <div>书籍编号：{bookNO}</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div >书籍名称：</div>
          </Col>
          </Row>
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <div>章节编号：</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div>章节名称：</div>
            </Col>
            </Row>
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <div>资源编号：</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div>当前进度：</div>
            </Col>
          </Row>
        </div>
        <div >
          <Upload className = 'uploadBtnStyle'>
            <Button size='small'>
              <Icon type="upload" /> 上传设计图
            </Button>
          </Upload >
          <Button className = 'vocabularyBtnStyle' size='small'>词汇表</Button>
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
