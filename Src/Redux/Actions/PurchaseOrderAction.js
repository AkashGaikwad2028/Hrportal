import{
    FETCHPURCHASEORDER_PROGRESS,
    FETCHPURCHASEORDER_FAIL,
    FETCHPURCHASEORDER_SUCCESS,
} from "../ActionConstant"

import request from "../../Util/request"

export function getPurchaseOrder() {
    return async dispatch => {
      dispatch(
        purchaseOrderDispatch({isLoading: true},  FETCHPURCHASEORDER_PROGRESS),
      );
      try {
        const res = await request({url:'/purchase', method: 'GET'});
        console.log('Project Target Response', res.data.data);
        dispatch(
          purchaseOrderDispatch(res.data.data.purchase, FETCHPURCHASEORDER_SUCCESS),
        );
      } catch (error) {
        console.log('Purchase error', error);
        dispatch(error, FETCHPURCHASEORDER_FAIL);
      }
    };
  }

  
 const purchaseOrderDispatch = (data,actionType) => {
    return {
      payload: data,
      type: actionType,
    };
  };