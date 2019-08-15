import axios from 'axios';
import {
  COMIC_FETCH_DATA_BEGIN,
  COMIC_FETCH_DATA_SUCCESS,
  COMIC_FETCH_DATA_FAILURE,
  COMIC_FETCH_DATA_ERROR,
  COMIC_OTHER_SUCCESS,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchData(args = {}) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: COMIC_FETCH_DATA_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = axios.post('/comicworkshop/staffwork/getResourceContentInfo',args);
      doRequest.then(
        res => {
          dispatch({
            type: COMIC_FETCH_DATA_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        err => {
          dispatch({
            type: COMIC_FETCH_DATA_FAILURE,
            data: { error: err },
          });
          reject(err);
        }
      );
    });

    return promise;
  };
}

export function updateItem(args = {}){
  return dispatch => {
    dispatch({
      type: COMIC_FETCH_DATA_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post('/comicworkshop/staffwork/editResourceContent',args);
      doRequest.then(
        res => {
          dispatch({
            type: COMIC_OTHER_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: COMIC_FETCH_DATA_FAILURE,
            data: { error: err },
          });
          reject(err);
        }
      );
    });
    return promise;
  };
}
export function saveItem(args = {}){
  return dispatch => {
    dispatch({
      type: COMIC_FETCH_DATA_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post('/comicworkshop/staffwork/saveResourceContent',args);
      doRequest.then(
        res => {
          dispatch({
            type: COMIC_OTHER_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: COMIC_FETCH_DATA_FAILURE,
            data: { error: err },
          });
          reject(err);
        }
      );
    });
    return promise;
  };
}
export function deleteItem(args = {}){
  return dispatch => {
    dispatch({
      type: COMIC_FETCH_DATA_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.post('/comicworkshop/staffwork/deleteResourceContent',args);
      doRequest.then(
        res => {
          dispatch({
            type: COMIC_OTHER_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: COMIC_FETCH_DATA_FAILURE,
            data: { error: err },
          });
          reject(err);
        }
      );
    });
    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
// export function dismissFetchRedditListError() {
//   return {
//     type: COMIC_FETCH_DATA_ERROR,
//   };
// }

export function reducer(state, action) {
  switch (action.type) {
    case COMIC_FETCH_DATA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchRedditListPending: true,
        fetchRedditListError: null,
      };

    case COMIC_FETCH_DATA_SUCCESS:
      // The request is success
      console.log("backend returned list"+ JSON.stringify(action.data));
      return {
        ...state,
        comment: {
          ...state.comment,
          list: action.data.data
        }
        // fetchRedditListPending: false,
        // fetchRedditListError: null,
      };

    case COMIC_FETCH_DATA_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchRedditListPending: false,
        fetchRedditListError: action.data.error,
      };

    case COMIC_FETCH_DATA_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchRedditListError: null,
      };

    default:
      return state;
  }
}
