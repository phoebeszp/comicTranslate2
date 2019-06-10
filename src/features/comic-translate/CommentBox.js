import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Button, Input, Icon } from 'antd';
import {ButtonGroup} from 'antd/lib/button';
export class CommentBox extends Component {
  static propTypes = {
    selectedComment: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const {TextArea} = Input;
    return (
      <div className="comic-translate-comment-box">
          <TextArea autosize={{ minRows: 6}} value={this.props.selectedComment.content}/>
          <ButtonGroup>
            <Button size='small' >保存</Button>
            <Button size='small' >取消</Button>
          </ButtonGroup>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    selectedComment: state.comicTranslate.selectedComment,
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
)(CommentBox);
