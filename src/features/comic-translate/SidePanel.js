import React, { Component } from 'react';
import { List, Button, Input, Icon } from 'antd';
import {CommentBox} from './';
export default class SidePanel extends Component {
  static propTypes = {

  };
  render() {
    const data = [
      {
        title: '2019-06-08',
        description: 'hello world,hello worldhello worldhello worldhello worldhello worldhello world'
      },
      {
        title: '2019-06-08',
        description: 'hello world'
      },
      {
        title: '2019-06-08',
        description: 'hello world'
      },
      {
        title: '2019-06-08',
        description: 'hello world'
      },
      {
        title: '2019-06-08',
        description: 'hello world'
      },
      {
        title: '2019-06-08',
        description: 'hello world'
      },
      {
        title: '2019-06-08',
        description: 'hello world'
      },
      {
        title: '2019-06-08',
        description: 'hello world'
      },{
        title: '2019-06-08',
        description: 'hello world'
      },{
        title: '2019-06-08',
        description: 'hello world'
      },
    ];
    return (
      <div className="comic-translate-side-panel">
        {/* <CommentBox ></CommentBox> */}
        <List
          header={<div>已标记</div>}
          itemLayout="horizontal"
          dataSource={data}
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
      </div>
    );
  }
}

