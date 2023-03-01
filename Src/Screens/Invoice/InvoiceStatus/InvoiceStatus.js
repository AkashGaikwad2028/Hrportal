import React, { useEffect, useState } from "react";
import {
    View,
    SafeAreaView,
    StyleSheet
} from "react-native";
import { GLOBALSTYLE } from "../../../Constants/Styles";
import SearchBox from "../../../Components/SearchBox";
import InvoiceStatuCard from "./InvoiceComponents/InvoiceStatuCard";
import { InvoiceStaus } from "../../../Redux/Actions/InvoiceStatusAction";
import { useDispatch,useSelector} from "react-redux";
import dayjs from "dayjs"

const InvoiceStatus = ({ navigation }) => {

    const [InvoiceData ,setInvoiceData]=useState([])
    const [FilterInvoiceData,setFilterInvoiceData]=useState([])
    const [FilterSearchInvoiceData,setFilterSearchInvoiceData]=useState([])
    const [search, setSearch]=useState()
    const[MonthCount,setMonthCount]=useState([])
    const [Year,setYear]=useState([])
    const currentDate = dayjs(); 

const dispatch=useDispatch()
   const reducerData =useSelector(state=>state.InvoiceStatusReducer.InvoicestatesData)
  //  console.log("reducerdatata=>>>>>>>>>>",reducerData)


   useEffect(() => {
    const unSubscribe = navigation.addListener('focus', () => {
      dispatch(InvoiceStaus())
    });
    return unSubscribe;
  }, [navigation]);

  useEffect(()=>{
    if(reducerData && reducerData.data){
      setInvoiceData(reducerData.data)
      // setFilterInvoiceData(reducerData.monthlyRecords)
      // getInvoiceData()
    }
  },[ reducerData.data])


  // console.log("InvoiceData=>>>>>>>>>>>>>>",InvoiceData)

  // console.log( "InvoiceData=>>>>>>>>>>>>>>",InvoiceData["2023-03"][0].client_name)

// useEffect(()=>{
//   getInvoiceData()
// },[search, FilterInvoiceData])

 const setSearchValue = value => {
  console.log(value)
  setSearch(value);
};

// const MonthYear =()=>{
//   const YearArray=[]
//   const MonthCounts=[]
//   for (let i =0; i <=4; i++) {
//     const prevMonth = currentDate.subtract(i, 'month'); // Subtract i months from the current date
//     const MonthCount= prevMonth.format('M')
//     const year = prevMonth.format('YYYY'); // Get the year in YYYY format
//     console.log("MonthCount",MonthCount)
//     YearArray.push(year)
//    MonthCounts.push(MonthCount)
//   }
//   setYear(YearArray)
//   setMonthCount(MonthCounts)
// }
// useEffect(()=>{
//   MonthYear()
// },[])



// console.log("MonthCount=>>>>>>>>>>>>>>>>>",Year)

// const getFilterInvoicedata=(data)=>{
// var NewFilterValue=[]
// if(data){
//   let filter = data.map((res)=>{
//  if ((res.month==MonthCount[0]||res.month==MonthCount[1]||res.month==MonthCount[2]||res.month==MonthCount[3])&&(res.year==Year[0]||res.year==Year[1]||res.year==Year[2]||res.year==Year[3])){
//           console.log("ressssssssssssss",res)
//           NewFilterValue.push(res)
//     }  
//   })
// }
// setFilterInvoiceData(NewFilterValue)
// }

// useEffect(()=>{
//   getFilterInvoicedata(InvoiceData)
// },[InvoiceData])

// console.log("filterrrrrrrrrrrrrrrrrrrrrr=",FilterInvoiceData)
console.log(search==null)

  

  // const getInvoiceData = () => {
  //   if (Array.isArray(FilterInvoiceData)) {
  //     const filterValue = FilterInvoiceData?.filter(data => {
  //       console.log("dataa", data)
  //       if (typeof search === "undefined" || search.length === 0) {
  //         return data
  //       }
  //       else if (data.client.client_name.toLowerCase().includes(search.toLowerCase())) {
  //         return data
  //       }
  //     })
  //     console.log("filtervalue--------------", filterValue)
  //     setFilterSearchInvoiceData(filterValue)
  //   }
  // }

  console.log(FilterSearchInvoiceData)

    return (
       <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
       <SearchBox setSearchValue={setSearchValue} />
       <InvoiceStatuCard data={InvoiceData}/>
       </SafeAreaView>
    );
};

const styles = StyleSheet.create({

})

export default InvoiceStatus