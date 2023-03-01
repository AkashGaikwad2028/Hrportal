import React,{useEffect, useState} from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,Dimensions
} from "react-native";
import SearchBox from "../../../Components/SearchBox";
import { COLORS } from "../../../Constants/Theme";
import InvoiceHistoryCard from "./InvoiceHistoryCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import DropDownPicker from "react-native-dropdown-picker";
import { GLOBALSTYLE } from "../../../Constants/Styles";
import {GetInvoiceHistoryData,GetInvoiceHistoryDataMonthlyData} from "../../../Redux/Actions/InvoiceHistoryAction"
// import {} from "../../../Redux/Actions/InvoiceHistoryAction"
import { ActivityIndicator } from "react-native";

const InvoiceHistory = ({ navigation }) => {
    // const [invoicehistorydata,setInvoiceHistorydata]=useState([])
    const [InovoiceInternalData,setInovoiceInternalData]=useState([])
    const[InternalinvoicehistoryMonthdata,setInternalinvoicehistoryMonthdata]=useState(null)
    const dispatch=useDispatch()
    const reducerdata=useSelector(state=>state.InvoiceHistoryReducer.getInvoiceHistorydata)
    const reducerdMonthdata=useSelector(state=>state.InvoiceHistoryReducer.getInternalInvoiceMonthdata)
    console.log("reducerdatatainvoce xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=>>>>>>",reducerdata)
    // console.log("reducerdatatainvoceFirst =>>>>>>",reducerdata)
    const [openYear,setOpenyear]=useState(false)
    const [getyearvalue,setGetYearvalue]=useState()
    const [getyearitem,setgetyearitem]=useState([])
    const [openMonth,setopenMonth]=useState(false)
    const [getMonthvalue,setGetMonthvalue]=useState()
    const [getMonthitem,setgetMonthitem]=useState([])
    const [search, setSearch] = useState('');
    const [FilterInvoiceData, setFilterInvoiceData] = useState([]);
    const [loading, setLoading] = useState(true);





    useEffect(() => {
      const unSubscribe = navigation.addListener('focus', () => {
        setLoading(true)
          dispatch(GetInvoiceHistoryData())
      });
      return unSubscribe;
    }, [navigation,dispatch]);



    const GetYears=()=>{
       const years =new Date().getFullYear()
       const year= []
       for(let i =years ; i>=1900 ; i--){
        // console.log("iiiiiiiiiiiiiiiiii",i)
       let item = { value:i};
        year.push(item)
       }
       setgetyearitem(year)
    }

    // console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmm",InternalinvoicehistoryMonthdata)

    const Getmonth=()=>{
      let Month=[]
      const Months =[
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
      for(let i = 0 ; i<Months.length;i++){
        let item = {value:Months[i]}
        Month.push(item)
      }
      setgetMonthitem(Month)
    }
    useEffect(()=>{
        GetYears()
        Getmonth()
    },[reducerdata])

    // console.log("getyearvalue=>>>>>>>>>>>>>>>>",getMonthitem)

    const SendMonthData=(getyearvalue,getMonthvalue)=>{
      console.log("getyearvalue,getMonthvalue",getyearvalue,getMonthvalue)
      if(getyearvalue!==null && getMonthvalue !==null){
        dispatch(GetInvoiceHistoryDataMonthlyData(getyearvalue,getMonthvalue))
      }
    }
   
      useEffect(()=>{
        setLoading(true)
        dispatch(GetInvoiceHistoryDataMonthlyData())
        // getFliternvoicedata()
      },[getMonthvalue])

      useEffect(()=>{
        if(reducerdMonthdata && reducerdMonthdata.data){
          setInternalinvoicehistoryMonthdata(reducerdMonthdata.data)
            setLoading(false)
        }
      },[reducerdMonthdata.data])
      console.log()

      useEffect(()=>{
        if(reducerdata && reducerdata.data ){
          setInovoiceInternalData(reducerdata.data)
            setFilterInvoiceData( reducerdata.data)
            setLoading(false)
        }
      },[reducerdata.data])

console.log("InternalinvoicehistoryMonthdata=>>>>>>>>",InternalinvoicehistoryMonthdata)

      useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
          setLoading(true);
          setFilterInvoiceData(null)
        });
        return unsubscribe;
      }, [navigation, dispatch]);

      useEffect(()=>{
        getFliternvoicedata()
      },[search])

      const setSearchValue = value => {
        setSearch(value);
      };
      // console.log("searchhhhhhhhhhhhhhhhhhhhhhhhhhh",FilterInvoiceData)

      const getFliternvoicedata=()=>{
        const filterValue = getMonthvalue!==null?InternalinvoicehistoryMonthdata?.filter(data=>{
          if(search.length===0){
            return data
          }
          else if(
          (  data.client_name.toLowerCase().includes(search.toLowerCase()))
          ){
            return data
          }
        }):InovoiceInternalData?.filter(data=>{
          console.log("''''''''''''''",data)
          if(search.length===0){
            return data
          }
          else if(
          (  data.client_name.toLowerCase().includes(search.toLowerCase()))
          ){
            return data
          }
        })
        setFilterInvoiceData(filterValue)    
      }
      console.log("filtervvvvvvvvvvvvvvvvvvvvvvvvvvvvv",FilterInvoiceData)

      // console.log9("")

      // console.log("invoicehistorydata",invoicehistorydata)
      // console.log("FilterInvoiceHistory data=>>>>>>>>",FilterInvoiceData)
      // console.log("FilterInvoiceHistory data=>>>>>>>>",FilterInvoiceData)
          console.log("setionvoicedattaa->>>>>>>>>>>>",InovoiceInternalData)
    return (
        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
        <SearchBox setSearchValue={setSearchValue}/>
        {/* { !loading && search && (
        <View style={style.loadingContainer}>
          <Text> purchase order Information is not found </Text>
        </View> 
     )}  */}

        <View style={{flexDirection:"row",justifyContent:"space-around"}}>
          <View style={{width:"45%",marginHorizontal:10}}>
        <DropDownPicker
          style={[style.dropdownViewStyle]}
          placeholder="select Year*"
          placeholderStyle={{color:COLORS.black,textAlign:"center"}}
          dropDownContainerStyle={style.dropDownContainerStyle}
          listMode="FLATLIST"
          renderListItem={({item}) => {
            // console.log('itemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm=>>>>>>>', item.value)
            return (
              <TouchableOpacity
              onPress={()=>{
                // console.log("itemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",item.value)
                setGetYearvalue(item.value)
                setOpenyear(false)
              }}
                style={style.cellStyle}>
                <Text style={style.cellTextStyle}>{item.value}</Text>
              </TouchableOpacity>
            );
          }}
          open={openYear}
          value={getyearvalue}
          items={getyearitem}
          setOpen={setOpenyear}
          setItems={setgetyearitem}
          />
          </View>
          <View style={{width:"45%",marginHorizontal:10}}>
          <DropDownPicker
           style={[style.dropdownViewStyle]}
           dropDownContainerStyle={style.dropDownContainerStyle}
           listMode="FLATLIST"
           placeholder="select month*"
           renderListItem={({item}) => {
            // console.log('itemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm=>>>>>>>', item.value)
            return (
              <TouchableOpacity
              onPress={()=>{
                setGetMonthvalue(item.value)
                setopenMonth(false)
                SendMonthData(getyearvalue,getMonthvalue)
              }}
                style={style.cellStyle}>
                <Text style={style.cellTextStyle}>{item.value}</Text>
              </TouchableOpacity>
            );
          }}
          open={openMonth}
          value={getMonthvalue}
          items={getMonthitem}
          setOpen={setopenMonth}
          setItems={setgetMonthitem}
          />
          </View>
        </View>
        {loading && (
        <View style={style.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue} />
        </View>
      )}
        {
          !loading && InovoiceInternalData && InovoiceInternalData.length > 0 && (
            <View style={style.listContainer}>
            <InvoiceHistoryCard data={FilterInvoiceData}/>
            </View>
          )
        }
        
        {/* </View> */}
        </SafeAreaView>
    );
};


const style = StyleSheet.create({
    dropdownViewStyle: {
      backgroundColor: '#fff',
      marginTop: 10,
      marginHorizontal:50,
      alignSelf: 'center',
      borderColor: '#fff',
      zIndex:100,
      width:"100%",
      padding:50
    },
    dropDownContainerStyle: {
      width:"100%",
      marginVertical: 10,
      // marginHorizontal:85,
      paddingVertical: 4,
      borderColor: '#fff',
      color:"red"
    },
  
    btnStyle: {
      width: Dimensions.get('screen').width - 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: COLORS.white,
      borderRadius: 10,
      margin: 10,
      padding: 15,
    },
    cellStyle: {
      padding: 8,
      marginVertical: 4,
    },
    cellTextStyle: {
      color: 'black',
      fontSize: 14,
      textTransform: 'capitalize',
      fontWeight: '600',
      backgroundColor:  '#fff',
    },

    listContainer: {
      flex: 1,
      marginVertical: 8,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
 
  })
  
  

export default InvoiceHistory