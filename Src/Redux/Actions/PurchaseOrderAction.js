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

import request from "../../Util/request"
import Toast from 'react-native-simple-toast';

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


  export function getResources() {
    return async dispatch => {
      dispatch(purchaseOrderDispatch({}, GETRESOURCE_PROGRESS));
      try {
        const {data} = await request({url: '/resource', method: 'GET'});
       console.log('getResources response', data.data.resources);
        dispatch(
          purchaseOrderDispatch(data.data.resources, GETRESOURCE_SUCCESS),
        );
      } catch (error) {
        dispatch(purchaseOrderDispatch(error, GETRESOURCE_FAIL));
        console.log('getResources error', error);
      }
    };
  }

  export function getClients() {
    return async dispatch => {
      dispatch(purchaseOrderDispatch({},  GETCLIENT_PROGRESS));
      try {
        const {data} = await request({url: '/client', method: 'GET'});
       console.log('getResources client response', data.data.clients);
        dispatch(
          purchaseOrderDispatch(data.data.clients,GETCLIENT_SUCCESS),
        );
      } catch (error) {
        dispatch(purchaseOrderDispatch(error,  GETCLIENT_FAIL));
        console.log('getResources error', error);
      }
    };
  }

  export function addPurchaseOrder(value, navigation) {
    console.log("aadjfdfjudjnjnfc=>>>>>>>>>>>>>>>>>>>",value)
    return async dispatch => {
      dispatch( purchaseOrderDispatch({},  ADDPURCHASEORDER_PROGRESS));
      try {
        const data = await request({
          url: '/purchase',
          method: 'POST',
          data: value,
        });
        console.log('purchaseOrderDispatch=>>>>>>>>>> ', data);
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