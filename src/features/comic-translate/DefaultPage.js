import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {SidePanel, OperationPanel, PictureDisplayer} from './';
import 'antd/dist/antd.css'; 

export class DefaultPage extends Component {
  static propTypes = {
    comicTranslate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="comic-translate-default-page">
        <div className='headerInfo'><OperationPanel/></div>
        <div className='contentInfo'><PictureDisplayer/><SidePanel/></div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    comicTranslate: state.comicTranslate,
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
)(DefaultPage);
