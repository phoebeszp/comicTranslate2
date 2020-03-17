import React, { Component } from 'react';
import { List, Button, Input, Tabs,Modal, message } from 'antd';
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
    newComment: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    previlege: PropTypes.object.isRequired
  };
  
  state = { visible: false, selectedItem: null};
	setLineFeed (str){
		if(typeof str  === 'string' ){
		  let str1 = str.replace(/\r{0,}\n/g, '<br/>').replace(/\s/g, '&nbsp;');
			return str1;
		}else{
			return '';
		}
  }
  getLineFeed (str){
		if(typeof str  === 'string' ){
		let str1 = str.replace(/<br\/>/g, '\n').replace(/\&nbsp\;/g, ' ');
			return str1;
		}else{
			return '';
		}
	}
	
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
      this.props.actions.deleteItem({
        "id":this.state.selectedItem.id,
        "tasktype":this.props.params.tasktype
      }).then(()=>{
        message.success('Save successfully!');
        this.props.actions.removeComment(this.state.selectedItem.recdata);
        this.setState({visible: false, selectedItem: null});
        this.props.actions.fetchData({
            "chapterid": this.props.params.chapterid,
            "resourceid": this.props.params.resourceid
        });
      });
    }else{
      this.setState({visible: false});
    }
  }
  selectItem(item){
    this.props.actions.showSelectedRect(item);
    this.setState({ selectedItem: item });
  }

  saveItem(){
    const that = this;
    function refresh(oResult){
      if(oResult.status === 'error') {
        message.error(oResult.message);
        return;
      }
      message.success('Save successfully!');
      that.props.actions.saveComment();
      that.props.actions.fetchData({
            "chapterid": that.props.params.chapterid,
            "resourceid": that.props.params.resourceid
        });
    }
    function reject(e) {
      message.error(e.message);
    }
    const newComment = this.props.newComment;
    const parsedContent = this.setLineFeed(newComment.tr_content);
    if(newComment.id){ //edit
      console.log("edit item, id="+newComment.id);
      this.props.actions.updateItem({
            "id": newComment.id,
            "tasktype": this.props.params.tasktype,
            "content": parsedContent,
      }).then(refresh, reject);
    }else {
      this.props.actions.saveItem({
        "tasktype": this.props.params.tasktype,
        "content": parsedContent,
        "chapterid": this.props.params.chapterid,
        "resourceid": this.props.params.resourceid,
        "recdata":JSON.stringify(newComment.recdata),
      }).then(refresh, reject);
    }
  }
  
  render() {
    message.config({
      top: 80,
      duration: 2,
      maxCount: 3,
    });
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
        <Modal
          title="Info"
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
              value={this.getLineFeed(tr_content)}
              onChange={this.changeComment.bind(this)}
              ></TextArea>
                <Button size='small' type="primary" onClick={() => this.saveItem()}>Save</Button>
                <Button size='small' onClick={this.props.actions.cancelComment}>Cancel</Button>
          </TabPane>
          <TabPane tab="List" key="2" >
            <div>
            <ButtonGroup>
              {this.props.previlege.editable && (
              <Button icon='edit' onClick={() => this.editComment()} disabled={!this.state.selectedItem} 
              >Edit</Button>)}
              {this.props.previlege.editable && (
              <Button icon="delete" onClick={() => this.removeComment()} 
              disabled={!this.state.selectedItem}>Delete</Button>)}
              <Button icon='select' onClick={() => this.deselectComment()} disabled={!this.state.selectedItem}>Show All</Button>
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
    newComment: state.comicTranslate.comment.newComment,
    comments: state.comicTranslate.comment.list,
    params: state.comicTranslate.params,
    previlege: state.comicTranslate.previlege
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

