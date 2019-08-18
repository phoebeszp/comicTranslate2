import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from 'antd';
import './TodoItem.less'

const { Text } = Typography;

export class TodoItem extends Component {
  static propTypes = {
    previlege: PropTypes.object.isRequired
  };
  render () {
    const {updatetime, tr_content, selected, ed_content} = this.props.item;
    const showContent = this.props.previlege.showTr_content ? tr_content:ed_content;
    return (
      <div className="item-container" onClick={this.props.selectItem} style={{cursor: 'pointer', 
      backgroundColor: selected?'#e1e1ff':''}}>
        <Text>{updatetime}</Text>
        <p>{showContent}</p>
      </div>
    )
  }
}
/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    previlege: state.comicTranslate.previlege
  };
}
export default connect(
  mapStateToProps
)(TodoItem);