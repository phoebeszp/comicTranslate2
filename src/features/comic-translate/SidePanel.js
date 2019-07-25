import React, { Component } from 'react';
import { List, Button, Input, Tabs } from 'antd';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { stat } from 'fs';
export  class SidePanel extends Component {
  static propTypes = {
    defaultActiveKey: PropTypes.string.isRequired,
    tr_content: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };
  changeComment(e){
    this.props.actions.changeComment(e.target.value);
  }
  render() {
    const { TabPane } = Tabs;
    const { TextArea } = Input;
    return (
      <div className="comic-translate-side-panel">
        <Tabs activeKey={this.props.defaultActiveKey} >
          <TabPane tab="创建中" key="1" >
            <TextArea placeholder="input here"
              className="custom"
              style={{ height: 100 }}
              value={this.props.tr_content}
              onChange={this.changeComment.bind(this)}
              ></TextArea>
              <Button type="primary" onClick={this.props.actions.saveComment}>保存</Button>
              <Button>取消</Button>
          </TabPane>
          <TabPane tab="已标记" key="2" >
            <List
            itemLayout="horizontal"
            dataSource={this.props.comments}
            renderItem={item => (
              <List.Item  actions={[<Button icon='edit'></Button>,
              <Button icon='delete'></Button>]} >
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    defaultActiveKey: state.comicTranslate.comment.defaultActiveTab,
    tr_content: state.comicTranslate.comment.newComment.tr_content,
    comments: state.comicTranslate.comment.list
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
)(SidePanel);

