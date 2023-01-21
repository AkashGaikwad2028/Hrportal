import {
FETCHREQUESTCLIENT_FAIL,
FETCHREQUESTCLIENT_PROGRESS,
FETCHREQUESTCLIENT_SUCCESS
} from "../ActionConstant"

const initalState = {
    RequestClientRequest:false,
   RequestClientSuccess: null,
   RequestClientError: null,
}

const RequestClientReducer = (state = initalState, action) => {

    // console.log("ReasonReducer", action)
    switch (action.type) {
        case FETCHREQUESTCLIENT_PROGRESS:
            return {
                ...state,
                RequestClientRequest: true,
            };
        case FETCHREQUESTCLIENT_SUCCESS:
            return {
                ...state,
                RequestClientSuccess: action.payload,
                RequestClientRequest: false,
                RequestClientError: null,
            };
        case FETCHREQUESTCLIENT_FAIL:
            return {
                ...state,
                RequestClientRequest: false,
                RequestClientSuccess: null,
                RequestClientError: action.payload,
            };
        default:
            return state;
    }
}
export default RequestClientReducer 