import{
    INVOICESTATUS_FAIL,
    INVOICESTATUS_PROGRESS,
    INVOICESTATUS_SUCCESS
} from "../ActionConstant"
import request from "../../Util/request"

export function InvoiceStaus() {
    return async dispatch => {
      dispatch(
        invoicestatusDispatch({isLoading: true},  INVOICESTATUS_PROGRESS),
      );
      try {
        const res = await request({url:"/invoice-master/invoice-details?type=forInternalInvoiceStatus", method: 'GET'});
        console.log('invoice-details Response', res);
        dispatch(
            invoicestatusDispatch(
            res.data,
            INVOICESTATUS_SUCCESS
          ),
        );
      } catch (error) {
        console.log('invoice-details error', error);
        dispatch(error, INVOICESTATUS_FAIL);
      }
    };
  }
  



const invoicestatusDispatch = (data, actionType) => {
    return {
      payload: data,
      type: actionType,
    };
  };