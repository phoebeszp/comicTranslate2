import React, { Component } from 'react';
import { Typography, Button } from 'antd';
import './TodoItem.less'

const { Text } = Typography;

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    const {id, title, tr_content, selected} = this.props.item;
    const showSelected = this.props.onlyShowSelected && selected;
    return (
      <div className="item-container" onDoubleClick={this.props.selectItem} style={{cursor: 'pointer', 
      backgroundColor: showSelected?'#e1e1ff':''}}>
        <Text>{title}</Text>
        <p>{tr_content}</p>
        <div>
        <Button  icon="delete" onClick={this.props.deleteItem}></Button>
        <Button icon='edit' onClick={this.props.changeItem} ></Button></div>
      </div>
    )
  }
}
