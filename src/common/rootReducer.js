import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import comicTranslateReducer from '../features/comic-translate/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage them.

const reducerMap = {
  router: routerReducer,
  comicTranslate: comicTranslateReducer
};

export default combineReducers(reducerMap);
