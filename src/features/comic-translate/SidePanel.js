import React, { Component } from 'react';
import { List, Button, Input, Tabs,Modal } from 'antd';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {TodoItem} from './';
export  class SidePanel extends Component {
  static propTypes = {
    defaultActiveKey: PropTypes.string.isRequired,
    tr_content: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };
    state = { visible: false, selectedItem:{} };
  
  changeComment(e){
    this.props.actions.changeComment(e.target.value);
  }
  editComment(item){
    this.props.actions.showSelectedComment(item);
  }
  removeComment(commentItem){
    this.setState({ visible: true, selectedItem: commentItem });
  }

  handleModal(confirmed){
    if(confirmed){
      this.props.actions.removeComment(this.state.selectedItem.rectData);
    }
    this.setState({ visible: false });
  }
  selectItem(item){
    this.props.actions.showSelectedRect(item);
  }
  
  render() {
    const { TabPane } = Tabs;
    const { TextArea } = Input;
    return (
      <div className="comic-translate-side-panel">
        <Modal
          title="Warning"
          visible={this.state.visible}
          onOk={()=>this.handleModal(true)}
          onCancel={()=>this.handleModal(false)}
          okText="确认"
          cancelText="取消"
        >
          <p>Are you sure remove this item?</p>
        </Modal>
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
             <List.Item> 
                <TodoItem {...item} deleteItem={ () => this.removeComment(item)}
                changeItem={ () => this.editComment(item)}
                selectItem={ () => this.selectItem(item)}
                ></TodoItem>
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

