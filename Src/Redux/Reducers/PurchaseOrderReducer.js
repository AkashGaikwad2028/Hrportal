import{
    FETCHPURCHASEORDER_PROGRESS,
    FETCHPURCHASEORDER_FAIL,
    FETCHPURCHASEORDER_SUCCESS,
    ADDPURCHASEORDER_SUCCESS,
    ADDPURCHASEORDER_PROGRESS,
    ADDPURCHASEORDER_FAIL
} from "../ActionConstant"
import { addPurchaseOrder } from "../Actions/PurchaseOrderAction";

const initalState = {
    isLoading: false,
    purchaseorderData: {},
    addPurchaseOrder:{}
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
        case   ADDPURCHASEORDER_PROGRESS:
          return {
            ...state,
            isLoading: true,
          };
        case ADDPURCHASEORDER_SUCCESS:
          return {
            ...state,
            isLoading: false,
            addProjectData: action.payload,
          };
        case  ADDPURCHASEORDER_FAIL:
          return {
            ...state,
            isLoading: false,
            addProjectData: action.payload,
          };
      default:
        return state;
    }
  };
  export default PurchaseOrderReducer;