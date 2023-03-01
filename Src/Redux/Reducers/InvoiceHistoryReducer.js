import{
    INVOICEHISTORY_FAIL,
    INVOICEHISTORY_PROGRESS,
    INVOICESTATUS_SUCCESS,
    INVOICEHISTORYHISTORYMONTHDATA_FAIL,
    INVOICEHISTORYHISTORYMONTHDATA_SUCCESS,INVOICEHISTORYHISTORYMONTHDATA_PROGRESS
} from "../ActionConstant"

const initialstate={
    isLoading: false,
    getInvoiceHistorydata:{},
    getInternalInvoiceMonthdata:{}
}

  const InvoiceHistoryReducer=(state=initialstate,action)=>{
    switch(action.type){
        case  INVOICEHISTORY_PROGRESS:
            return {
                ...state,
              isLoading:true
            };
            case INVOICESTATUS_SUCCESS:
                return {
                    ...state,
                    getInvoiceHistorydata:action.payload
                };
                case  INVOICEHISTORY_FAIL:
                    return {
                        ...state,
                        getInvoiceHistorydata:action.payload
                    };
                    case  INVOICEHISTORYHISTORYMONTHDATA_PROGRESS:
                        return {
                            ...state,
                          isLoading:true
                        };
                        case INVOICEHISTORYHISTORYMONTHDATA_SUCCESS:
                            return {
                                ...state,
                                getInternalInvoiceMonthdata:action.payload
                            };
                            case   INVOICEHISTORYHISTORYMONTHDATA_FAIL:
                                return {
                                    ...state,
                                    getInternalInvoiceMonthdata:action.payload
                                };
                    default:
                        return state;            
    }
}
export default InvoiceHistoryReducer;