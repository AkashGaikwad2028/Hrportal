import {
 FETCHREQUESTCLIENT_FAILURE,
 FETCHREQUESTCLIENT_PROGRESS,
 FETCHREQUESTCLIENT_SUCCESS,
  } from '../ActionConstant';
  import request from '../../Util/request';
  
  export function getRequetsClient() {
    return async dispatch => {
      dispatch(
        RequetsClientDispatch({isLoading: true},  FETCHREQUESTCLIENT_PROGRESS),
      );
      try {
        const res = await request({url:'/client-request', method: 'GET'});
        console.log('client-request Response', res.data);
        dispatch(
          RequetsClientDispatch(res.data,  FETCHREQUESTCLIENT_SUCCESS),
        );
      } catch (error) {
        console.log('client-request', error);
        dispatch(error,FETCHREQUESTCLIENT_FAILURE);
      }
    };
  }

   
 const RequetsClientDispatch = (data,actionType) => {
  return {
    payload: data,
    type: actionType,
  };
};