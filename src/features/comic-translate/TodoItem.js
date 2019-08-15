import React, { Component } from 'react';
import { Typography } from 'antd';
import './TodoItem.less'

const { Text } = Typography;

export default class TodoItem extends Component {
  render () {
    const {updatetime, tr_content, selected} = this.props.item;
    return (
      <div className="item-container" onClick={this.props.selectItem} style={{cursor: 'pointer', 
      backgroundColor: selected?'#e1e1ff':''}}>
        <Text>{updatetime}</Text>
        <p>{tr_content}</p>
      </div>
    )
  }
}
