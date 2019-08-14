import React, { Component } from 'react';
import { Typography, Button } from 'antd';
import './TodoItem.less'

const { Text } = Typography;

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    const {id, updatedTime, tr_content, selected} = this.props.item;
    return (
      <div className="item-container" onClick={this.props.selectItem} style={{cursor: 'pointer', 
      backgroundColor: selected?'#e1e1ff':''}}>
        <Text>{updatedTime}</Text>
        <p>{tr_content}</p>
      </div>
    )
  }
}
