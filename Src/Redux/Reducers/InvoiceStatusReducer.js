import {
    INVOICESTATUS_FAIL,
    INVOICESTATUS_PROGRESS,
    INVOICESTATUS_SUCCESS
}from "../ActionConstant"

const initialstate={
    isLoading:false,
    InvoicestatesData:{}
}

const InvoiceStatusReducer =(state=initialstate,action)=>{
    switch(action.type){

    case INVOICESTATUS_PROGRESS:
    return {
        ...state,
        isLoading:true,
        InvoicestatesData:action.payload,
    };
    case INVOICESTATUS_SUCCESS:
    return {
        ...state,
        isLoading:false,
        InvoicestatesData:action.payload,
    }
    case INVOICESTATUS_FAIL:
        return {
            ...state,
            isLoading:false,
            InvoicestatesData:action.payload,
        }
        default:
            return state;
    };
}

export default InvoiceStatusReducer