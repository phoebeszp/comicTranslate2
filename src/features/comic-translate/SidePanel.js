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
    // onlyShowSelected: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
  };
  
  state = { visible: false, selectedItem: null};
  
  changeComment(e){
    this.props.actions.changeComment(e.target.value);
  }
  editComment(item){
    this.props.actions.showSelectedComment(this.state.selectedItem);
  }

  deselectComment(){
    this.props.actions.deSelectAll();
    this.setState({selectedItem: null});
  }

  removeComment(){
    this.setState({ visible: true});
  }
  handleModal(confirmed){
    if(confirmed){
      this.props.actions.removeComment(this.state.selectedItem.rectData);
      this.setState({visible: false, selectedItem: null});
    }else{
      this.setState({visible: true});
    }
  }
  selectItem(item){
    this.props.actions.showSelectedRect(item);
    this.setState({ selectedItem: item });
  }
  
  render() {
    const { TabPane } = Tabs;
    const { TextArea } = Input;
    const {comments, tr_content, defaultActiveKey} = this.props;
    const ButtonGroup = Button.Group;
    return (
      <div className="comic-translate-side-panel">
        <Modal
          title="Warning"
          visible={this.state.visible}
          onOk={()=>this.handleModal(true)}
          onCancel={()=>this.handleModal(false)}
          okText="Confirm"
          cancelText="Cancel"
        >
          <p>Are you sure remove this item?</p>
        </Modal>
        <Tabs activeKey={defaultActiveKey} >
          <TabPane tab="New" key="1" >
            <TextArea placeholder="input here"
              className="custom"
              autosize={{ minRows: 6}}
              style={{ height: 100 }}
              value={tr_content}
              onChange={this.changeComment.bind(this)}
              ></TextArea>
                <Button size='small' type="primary" onClick={this.props.actions.saveComment}>Save</Button>
                <Button size='small' onClick={this.props.actions.cancelComment}>Cancel</Button>
          </TabPane>
          <TabPane tab="List" key="2" >
            <div>
            <ButtonGroup>
              <Button icon='edit' onClick={() => this.editComment()} disabled={!this.state.selectedItem} >Edit</Button>
              <Button icon="delete" onClick={() => this.removeComment()} disabled={!this.state.selectedItem}>Delete</Button>
              <Button icon='select' onClick={() => this.deselectComment()} disabled={!this.state.selectedItem}>Deselect</Button>
            </ButtonGroup>
            </div>
            <List
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={item => (
             <List.Item> 
                <TodoItem item={item} 
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

