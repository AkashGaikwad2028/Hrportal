import{
    FETCHPURCHASEORDER_PROGRESS,
    FETCHPURCHASEORDER_FAIL,
    FETCHPURCHASEORDER_SUCCESS,
    ADDPURCHASEORDER_SUCCESS,
    ADDPURCHASEORDER_PROGRESS,
    ADDPURCHASEORDER_FAIL,
    GETRESOURCE_FAIL,
    GETRESOURCE_PROGRESS,
    GETRESOURCE_SUCCESS,
    GETCLIENT_FAIL,
    GETCLIENT_PROGRESS,
    GETCLIENT_SUCCESS
} from "../ActionConstant"
// import { addPurchaseOrder } from "../Actions/PurchaseOrderAction";

const initalState = {
    isLoading: false,
    purchaseorderData: {},
    addPurchaseOrder:{},
    getResorceData:{},
    getClientData:{}
  };

  const  PurchaseOrderReducer= (state = initalState, action) => {
    // console.log("ProjectTargetReducer", action)
    switch (action.type) {
      case FETCHPURCHASEORDER_PROGRESS:
        return {
          ...state,
          isLoading: true,
        };
      case FETCHPURCHASEORDER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          purchaseorderData: action.payload,
        };
      case  FETCHPURCHASEORDER_FAIL:
        return {
          ...state,
          isLoading: false,
          purchaseorderData: action.payload,
        };
        case GETRESOURCE_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case GETRESOURCE_SUCCESS:
      console.log('action.payload',action.payload)
      return {
        ...state,
        isLoading: false,
        getResorceData: action.payload,
      };
    case GETRESOURCE_FAIL:
      return {
        ...state,
        isLoading: false,
        getResorceData: action.payload,
      };
      case GETCLIENT_PROGRESS:
        return {
          ...state,
          isLoading: true,
        };
      case GETCLIENT_SUCCESS:
        console.log('action.payload',action.payload)
        return {
          ...state,
          isLoading: false,
          getClientData: action.payload,
        };
      case  GETCLIENT_FAIL:
        return {
          ...state,
          isLoading: false,
          getClientData: action.payload,
        };
        case   ADDPURCHASEORDER_PROGRESS:
          return {
            ...state,
            isLoading: true,
          };
        case ADDPURCHASEORDER_SUCCESS:
          return {
            ...state,
            isLoading: false,
            addPurchaseOrder: action.payload,
          };
        case  ADDPURCHASEORDER_FAIL:
          return {
            ...state,
            isLoading: false,
            addPurchaseOrder: action.payload,
          };
      default:
        return state;
    }
  };
  export default PurchaseOrderReducer;