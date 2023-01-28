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
    GETCLIENT_SUCCESS,
    DELETEPURCAHSEORDER_PROGRESS,
    DELETEPURCAHSEORDER_SUCCESS,
    DELETEPURCAHSEORDER_FAIL
} from "../ActionConstant"
import axios from "axios";
import request, { client } from "../../Util/request"
import requestformData from "../../Util/requestFormData";
import Toast from 'react-native-simple-toast';

export function getPurchaseOrder(error) {
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
        dispatch(error, FETCHPURCHASEORDER_FAIL );
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



  export function  addPurchaseOrder(ReFormdata,navigation) {
  console.log("reFormdatataat",ReFormdata)
    return async dispatch => {
      dispatch(purchaseOrderDispatch({isLoading:true},  ADDPURCHASEORDER_PROGRESS));
      try {
        console.log("in try block");
        const {data}= await 
        //client.post("/purchase" , ReFormdata)
        request(ReFormdata)
          
          // {
          
          // url: `/purchase`,
          // method:'POST',
          // data:ReFormdata
        //})
        console.log("ReformDataonline87",data)
        if (data.message) {
          console.log("dataaintryblock",data.data)
          dispatch(data, ADDPURCHASEORDER_SUCCESS);
          Toast.show('purchaseOrderDispatch  Successfully');
        }
        navigation.goBack();
      } catch (err) {
        console.log('purchaseOrderDispatch error', err);
        dispatch( purchaseOrderDispatch(err,ADDPURCHASEORDER_FAIL));
        Toast.show(' purchaseOrderDispatch Not Added Successfully');
      }
    };
  }

  // export function addPurchaseOrder(values, navigation) {
  //   console.log('addPurchaseOrder : ', values);
  //   const newData = {
  //     "client_id":337,
  //      "resource_id":318,
  //      "order_number":"1234668",
  //      "start_date":"12/28/2021",
  //      "end_date":"12/28/2021",
  //      "pdf_file":"http://144.91.79.237:8905/uploads/docs/purchase/1669368232302_NMP794518.pdf"
  //   };
  
  //   return async dispatch => {
  //     // dispatch(clientAgreementDispatch({}, ADDCLIENTAGREEMENT_PROGRESS));
  //     try {
  //       const {data} = await request({
  //         url: '/purchase',
  //         method: 'POST',
  //         data: newData,
  //       });
  //       console.log('addPurchaseOrder response', data);
  //       if (data.message) {
  //         // dispatch(data, ADDCLIENTAGREEMENT_SUCCESS);
  //         Toast.show(data.message);
  //       }
  //       navigation.goBack();
  //       // console.log('GO BACK REACHED!!!!!!!');
  //     } catch (err) {
  //       console.log('addPurchaseOrder error', err);
  //       dispatch(purchaseOrderDispatch(err, ADDPURCHASEORDER_FAIL));
  //       Toast.show('Purchase Order Not Added Successfully');
  //     }
  //   };
  // }



//   export const addPurchaseOrder=(ReFormdata)=>{
//     console.log("REFORMDATA",ReFormdata)
//     return (dispatch) =>{
//       console.log("Reformdataatata",ReFormdata)
//         dispatch(purchaseOrderDispatch({loading: true},ADDPURCHASEORDER_PROGRESS))
//         console.log("progresssssss",getstate)
//         axios
//         .post('/purchase',ReFormdata)
//          .then(res =>{
//             console.log("dataaaaaaa",res)
//             // dispatch(fetchUserSuccessDispatch(data),FETCH_USERS_SUCCESS)
//             // dispatch(purchaseOrderDispatch(data,ADDPURCHASEORDER_SUCCESS))
//          })
//         .catch((error)=>{
//             console.log('error', error);
//             dispatch(error,ADDPURCHASEORDER_FAIL)
//         })
    
//     }
// }
  export function deletePurchaseOrders(values) {
    console.log("valuesssssssssssss=>>>>>>>>>>>",values)
    return async dispatch => {
        dispatch(purchaseOrderDispatch({}, DELETEPURCAHSEORDER_PROGRESS));
        try {
            const data = await request({
                url: `/purchase/${values}`,
                method: 'DELETE',
            });
            console.log('DELETEPURCAHSEORDER=>>>>>>>>>>>', data.data.message);
            if (data.data.message) {
                dispatch(purchaseOrderDispatch( data.url, DELETEPURCAHSEORDER_SUCCESS));
                Toast.show('DELETEPURCAHSEORDER deleted Successfully');
            }
        } catch (err) {
            console.log('DELETEPURCAHSEORDER err', err);
            dispatch(purchaseOrderDispatch(err, DELETEPURCAHSEORDER_FAIL));
            Toast.show('DELETEPURCAHSEORDER Not deleted Successfully');
        }
    }

}
  
 const purchaseOrderDispatch = (data,actionType) => {
    return {
      payload: data,
      type: actionType,
    };
  };