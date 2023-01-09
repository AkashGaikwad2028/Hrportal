import{
    FETCHPURCHASEORDER_PROGRESS,
    FETCHPURCHASEORDER_FAIL,
    FETCHPURCHASEORDER_SUCCESS,
} from "../ActionConstant"

const initalState = {
    isLoading: false,
    purchaseorderData: {}
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
      default:
        return state;
    }
  };
  export default PurchaseOrderReducer;