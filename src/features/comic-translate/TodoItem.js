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
  getLineFeed (str){
		if(typeof str  === 'string' ){
		  let strs = str.replace(/\&nbsp\;/g, ' ').split('<br/>');
			return strs;
		}else{
			return [str];
		}
	}
  render () {
    const {updatetime, tr_content, selected, ed_content, id} = this.props.item;
    let showContent = this.props.previlege.showTr_content ? tr_content:ed_content;
    showContent = this.getLineFeed(showContent); 
    return (
      <div  key={id} className="item-container" onClick={this.props.selectItem} style={{cursor: 'pointer', 
      backgroundColor: selected?'#e1e1ff':''}}>
        <div className="title">{updatetime}</div>
        <div className="content">
        {showContent.map(ele=>
          <p>{ele}</p>
        )}
        </div>
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