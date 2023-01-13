import{
    FETCHPURCHASEORDER_PROGRESS,
    FETCHPURCHASEORDER_FAIL,
    FETCHPURCHASEORDER_SUCCESS,
    ADDPURCHASEORDER_SUCCESS,
    ADDPURCHASEORDER_PROGRESS,
    ADDPURCHASEORDER_FAIL
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

  export function addPurchaseOrder(values, navigation) {
    return async dispatch => {
      dispatch( purchaseOrderDispatch({},  ADDPURCHASEORDER_PROGRESS));
      try {
        const {data} = await request({
          url: '/purchase',
          method: 'POST',
          data: values,
        });
        //console.log('addProjectTarget response', data);
        if (data.data.message) {
          dispatch(data.data,  ADDPURCHASEORDER_SUCCESS);
          Toast.show(' purchaseOrderDispatch  Successfully');
        }
        navigation.goBack();
      } catch (err) {
        console.log('addProjectTarget error', err);
        dispatch( purchaseOrderDispatch(err,  ADDPURCHASEORDER_FAIL));
        Toast.show(' purchaseOrderDispatch Not Added Successfully');
      }
    };
  }
  
 const purchaseOrderDispatch = (data,actionType) => {
    return {
      payload: data,
      type: actionType,
    };
  };