import {
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
  GETCLIENT_SUCCESS,
  DELETEPURCAHSEORDER_PROGRESS,
  DELETEPURCAHSEORDER_SUCCESS,
  DELETEPURCAHSEORDER_FAIL,
  EDITURCHASEORDER_PROGRESS,
  EDITPURCHASEORDER_SUCCESS,
  EDITPURCHASEORDER_FAIL
} from '../ActionConstant';
import request from '../../Util/request';
import Toast from 'react-native-simple-toast';
import requestformData from '../../Util/requestFormData';

export function getPurchaseOrder(error) {
  return async dispatch => {
    dispatch(
      purchaseOrderDispatch({isLoading: true}, FETCHPURCHASEORDER_PROGRESS),
    );
    try {
      const res = await request({url: '/purchase', method: 'GET'});
      console.log('Project Target Response', res.data.data);
      dispatch(
        purchaseOrderDispatch(
          res.data.data.purchase,
          FETCHPURCHASEORDER_SUCCESS,
        ),
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
      dispatch(purchaseOrderDispatch(data.data.resources, GETRESOURCE_SUCCESS));
    } catch (error) {
      dispatch(purchaseOrderDispatch(error, GETRESOURCE_FAIL));
      console.log('getResources error', error);
    }
  };
}

export function getClients() {
  return async dispatch => {
    dispatch(purchaseOrderDispatch({}, GETCLIENT_PROGRESS));
    try {
      const {data} = await request({url: '/client', method: 'GET'});
      console.log('getResources client response', data.data.clients);
      dispatch(purchaseOrderDispatch(data.data.clients, GETCLIENT_SUCCESS));
    } catch (error) {
      dispatch(purchaseOrderDispatch(error, GETCLIENT_FAIL));
      console.log('getResources error', error);
    }
  };
}

export function addPurchaseOrder(values, navigation) {
  console.log('addPurchaseOrder : ', values);
  const newData =new FormData();
  newData.append('resource_id', '341');
  newData.append('client_id', '2');
  newData.append('order_number','968963');
  newData.append('start_date', '2022-14-02');
  newData.append('end_date', '2022-19-02');
  newData.append('title', 'Slang');
  newData.append('description', 'A Unseen Gamer');
  newData.append('pdf_file','http://144.91.79.237:8905/uploads/docs/purchase/1669368232302_NMP794518.pdf');
  // var data = new FormData();
  // data.append('resource_id', '162');
  // data.append('client_id', '2');
  // data.append('order_number', 98676988);
  // data.append('start_date', '2022-14-02');
  // data.append('end_date', '2022-19-02');
  // data.append('title', 'Slang');
  // data.append('description', 'A Unseen Gamer');
  // data.append('pdf_file','http://144.91.79.237:8905/uploads/docs/purchase/1669368232302_NMP794518.pdf');
  // console.log('newData at action', newData);
  return async dispatch => {
    dispatch(purchaseOrderDispatch({}, ADDPURCHASEORDER_PROGRESS));
    try {
      const {data} = await requestformData({
        url: '/purchase',
        method:'POST',
        data:{newData},
      });
      console.log('addPurchaseOrder response', data);
      if (data.message) {
        dispatch(purchaseOrderDispatch(data,ADDPURCHASEORDER_SUCCESS));
        Toast.show(data.message);
      }
      navigation.goBack();
      // console.log('GO BACK REACHED!!!!!!!');
    } catch (err) {
      console.log('addPurchaseOrder error', err);
      dispatch(purchaseOrderDispatch(err, ADDPURCHASEORDER_FAIL));
      Toast.show('Purchase Order Not Added Successfully');
    }
  };
}

export function deletePurchaseOrders(values) {
  console.log('valuesssssssssssss=>>>>>>>>>>>', values);
  return async dispatch => {
    dispatch(purchaseOrderDispatch({}, DELETEPURCAHSEORDER_PROGRESS));
    try {
      const data = await request({
        url: `/purchase/${values}`,
        method: 'DELETE',
      });
      console.log('DELETEPURCAHSEORDER=>>>>>>>>>>>', data.data.message);
      if (data.data.message) {
        dispatch(purchaseOrderDispatch(data.url, DELETEPURCAHSEORDER_SUCCESS));
        Toast.show('DELETEPURCAHSEORDER deleted Successfully');
      }
    } catch (err) {
      console.log('DELETEPURCAHSEORDER err', err);
      dispatch(purchaseOrderDispatch(err, DELETEPURCAHSEORDER_FAIL));
      Toast.show('DELETEPURCAHSEORDER Not deleted Successfully');
    }
  };
}


export function updatePurchaseOrder(formData, id, navigation) {
  console.log("id for purchase daat",id)
  console.log("purcahseedit",formData)

  const ReFormdata =new FormData();
  ReFormdata.append('resource_id', '341');
  ReFormdata.append('client_id', '2');
  ReFormdata.append('order_number','986769');
  ReFormdata.append('start_date', '2022-14-02');
  ReFormdata.append('end_date', '2022-19-02');
  ReFormdata.append('title', 'Slang');
  ReFormdata.append('description', 'A Unseen Gamer');
  ReFormdata.append('pdf_file','http://144.91.79.237:8905/uploads/docs/purchase/1669368232302_NMP794518.pdf')
  return async dispatch => {
      dispatch(purchaseOrderDispatch({}, EDITURCHASEORDER_PROGRESS))
      console.log("Form data", formData)
      try {
          const data = await requestformData({
              url: `/purchase/${id}`,
              method: 'PUT',
              data: ReFormdata,
          });
          console.log('updateEDITURCHASEORDER response', data.data);
          if (data.message) {
              dispatch(purchaseOrderDispatch(data, EDITPURCHASEORDER_SUCCESS));
              Toast.show('EDITURCHASEORDER Updated Successfully');
          }
          navigation.goBack();

      } catch (err) {
          console.log('updateVendor error', err.data);
          dispatch(purchaseOrderDispatch(err,EDITPURCHASEORDER_FAIL));
          Toast.show('EDITURCHASEORDER Not Updated Successfully');
      }
  }
}

const purchaseOrderDispatch = (data, actionType) => {
  return {
    payload: data,
    type: actionType,
  };
};
