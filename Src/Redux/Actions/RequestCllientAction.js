import {
 FETCHREQUESTCLIENT_FAIL,
 FETCHREQUESTCLIENT_PROGRESS,
 FETCHREQUESTCLIENT_SUCCESS
  } from '../ActionConstant';
  
  const fetchRequestClientRequest = () => {
    return {type: FETCHREQUESTCLIENT_PROGRESS};
  };
  
  const  fetchRequestClientSuccess = request => {
    return {type:FETCHREQUESTCLIENT_SUCCESS, payload:request};
  };
  
  const  fetchRequestClientFailuer = error => {
    return {type: FETCHREQUESTCLIENT_FAIL, payload: error};
  };
  
  const RequestCllientAction = {
    fetchRequestClientFailuer,
    fetchRequestClientRequest,
    fetchRequestClientSuccess,
  };
  
  export default RequestCllientAction;