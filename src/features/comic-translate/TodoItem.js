import React, { Component } from 'react';
import { Typography, Button } from 'antd';
import './TodoItem.less'

const { Text } = Typography;

export default class TodoItem extends Component {

  render () {
    let {id, title, tr_content} = this.props
    return (
      <div className="item-container" onDoubleClick={this.props.selectItem} style={{cursor: 'pointer'}}>
        <Text>{title}</Text>
        <p>{tr_content}</p>
        <div>
        <Button  icon="delete" onClick={this.props.deleteItem}></Button>
        <Button icon='edit' onClick={this.props.changeItem} ></Button></div>
      </div>
    )
  }
}
