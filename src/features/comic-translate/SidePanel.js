import React, { Component } from 'react';
import { List, Button, Input, Tabs } from 'antd';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
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
          <TabPane tab="New" key="1" >
            <TextArea placeholder="input here"
              className="custom"
              autosize={{ minRows: 6}}
              style={{ height: 100 }}
              value={this.props.tr_content}
              onChange={this.changeComment.bind(this)}
              ></TextArea>
                <Button size='small' type="primary" onClick={this.props.actions.saveComment}>Save</Button>
                <Button size='small' onClick={this.props.actions.cancelComment}>Cancel</Button>
          </TabPane>
          <TabPane tab="List" key="2" >
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

