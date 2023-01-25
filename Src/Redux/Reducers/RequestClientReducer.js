import {
FETCHREQUESTCLIENT_FAILURE,
FETCHREQUESTCLIENT_PROGRESS,
FETCHREQUESTCLIENT_SUCCESS
} from "../ActionConstant"

const initalState = {
    isLoading: false,
    RequestClientReducerData: {},
};

const RequestClientReducer = (state = initalState, action) => {

    // console.log("ReasonReducer", action)
    switch (action.type) {
        case FETCHREQUESTCLIENT_PROGRESS:
        return {
          ...state,
          isLoading: true,
        };
      case FETCHREQUESTCLIENT_SUCCESS:
        // console.log("fetchSuccesclient",action.payload)
        return {
          ...state,
          isLoading: false,
          RequestClientReducerData: action.payload,
        };
      case FETCHREQUESTCLIENT_FAILURE:
        return {
          ...state,
          isLoading: false,
          RequestClientReducerData: action.payload,
        };
        default:
            return state;
    }
}
export default RequestClientReducer 