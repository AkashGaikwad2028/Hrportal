import request from "../../Util/request"
import{
    INVOICEHISTORY_FAIL,
    INVOICEHISTORY_PROGRESS,
    INVOICESTATUS_SUCCESS,
    INVOICEHISTORYHISTORYMONTHDATA_FAIL,
    INVOICEHISTORYHISTORYMONTHDATA_PROGRESS,
    INVOICEHISTORYHISTORYMONTHDATA_SUCCESS
} from "../ActionConstant"


export const GetInvoiceHistoryData=()=>{
    return async dispatch=>{
        dispatch(InvoiceHistory({isLoading:true},INVOICEHISTORY_PROGRESS,))
        try{
            const res = await request({url:"/internal-invoice-history?type=forExternalInvoiceHistory", method: 'GET'})
            console.log("ressssssssssss",res.data.data)
            dispatch(InvoiceHistory(res.data,INVOICESTATUS_SUCCESS,))
        }
        catch (error){
            dispatch(error, INVOICEHISTORY_FAIL);
        }
    }
}

export function GetInvoiceHistoryDataMonthlyData(getyearvalue,getMonthvalue) {
    console.log("INTERNALForm data=>>>>>>>>>>>>>>>>>>>>>>>>", getyearvalue,getMonthvalue)
    const year=getyearvalue
    const month = getMonthvalue
    return async dispatch => {
        // console.log("Form data dispatch=>>>>>>>>>>>>>>>>>>>>>>>>", MonthData)
        dispatch(InvoiceHistory({}, INVOICEHISTORYHISTORYMONTHDATA_PROGRESS))
        // console.log("INTERNALForm data after=>>>>>>>>>>>>>>>>>>>>>>>>", MonthData)
        try {
            const data = await request({
                url: `internal-invoice-history?type=forInternalInvoiceHistory&month=${month}&year=${year}`,
                method:'GET',
            });
            console.log('internal-invoice response=>>>>>>>>>>>>>>', data.data.data);
            dispatch(InvoiceHistory(data.data.data, INVOICEHISTORYHISTORYMONTHDATA_SUCCESS,))

        } catch (err) {
            console.log('internal-invoice error', err);
            dispatch(InvoiceHistory(err, INVOICEHISTORYHISTORYMONTHDATA_FAIL));
            // Toast.show('internal-invoice added Successfully');
        }
    }
}



const InvoiceHistory = (data, actionType) => {
    return {
      payload: data,
      type: actionType,
    };
  };