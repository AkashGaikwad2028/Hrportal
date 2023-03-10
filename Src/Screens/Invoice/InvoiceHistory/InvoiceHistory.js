import React,{useEffect, useState} from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    Text,
    Modal,
    TouchableOpacity,Dimensions
} from "react-native";
import SearchBox from "../../../Components/SearchBox";
import { COLORS } from "../../../Constants/Theme";
import InvoiceHistoryCard from "./InvoiceHistoryCard";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Export from "../Export";
import dayjs from "dayjs";
import DropDownPicker from "react-native-dropdown-picker";
import { GLOBALSTYLE } from "../../../Constants/Styles";
import {GetInvoiceHistoryDataMonthlyData,SendInvoiceHistoryData,GetInvoiceHistoryDataMonthlySearchData} from "../../../Redux/Actions/InvoiceHistoryAction"
// import {} from "../../../Redux/Actions/InvoiceHistoryAction"
import { ActivityIndicator } from "react-native";

const InvoiceHistory = ({ navigation }) => {
    const [InovoiceInternalData,setInovoiceInternalData]=useState([])
    const[InternalinvoicehistoryMonthdata,setInternalinvoicehistoryMonthdata]=useState(null)
    const dispatch=useDispatch()
    const reducerdata=useSelector(state=>state.InvoiceHistoryReducer.getInvoiceHistorydata)
    const reducerdMonthdata=useSelector(state=>state.InvoiceHistoryReducer.getInternalInvoiceMonthdata)
    const reducerdMonthSearchdata=useSelector(state=>state.InvoiceHistoryReducer.SearchInvoicehistoryData)
    const [modalVisible, setModalVisible] = useState(false)
    console.log("reducerdatatainvoce xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=>>>>>>",reducerdMonthSearchdata)
    // console.log("reducerdatatainvoceFirst =>>>>>>",reducerdata)
    const [openYear,setOpenyear]=useState(false)
    const [getyearvalue,setGetYearvalue]=useState()
    const [getyearitem,setgetyearitem]=useState([])
    const [openMonth,setopenMonth]=useState(false)
    const [getMonthvalue,setGetMonthvalue]=useState([])
    const [getMonthitem,setgetMonthitem]=useState([])
    const [search, setSearch] = useState('');
    const [FilterInvoiceData, setFilterInvoiceData] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [MergedData,setMergedData]=useState([])


    console.log("mergedata",getMonthvalue,"getmonth===========",getyearvalue)



    useEffect(() => {
      const unSubscribe = navigation.addListener('focus', () => {
        setLoading(true)
        let month ="march"
        let year="2023"
        if(month!==undefined || year !== undefined){
          dispatch(GetInvoiceHistoryDataMonthlyData(month,year))
        }    
      });
      return unSubscribe;
    }, [navigation]);



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

    console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmm",InternalinvoicehistoryMonthdata)

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
      if(getyearvalue !==null && getMonthvalue !==null){
        // console.log("GetInvoiceHistoryDataMonthlyData",getMonth,getyear)
        dispatch(GetInvoiceHistoryDataMonthlyData(getyearvalue,getMonthvalue))
      }
    }
   
      useEffect(()=>{
        setLoading(true)
        SendMonthData()
      },[getMonthvalue])

      useEffect(()=>{
        if(reducerdMonthdata){
          setInternalinvoicehistoryMonthdata(reducerdMonthdata)
          setFilterInvoiceData(reducerdMonthdata)
            setLoading(false)
        }
      },[reducerdMonthdata])

      // useEffect(()=>{
      //   if(reducerdMonthSearchdata){
      //     setInternalinvoicehistoryMonthdata(reducerdMonthSearchdata)
      //       setLoading(false)
      //   }
      // },[reducerdMonthSearchdata])




      console.log()

      useEffect(()=>{
        if(search !==null){
         dispatch( GetInvoiceHistoryDataMonthlySearchData(getyearvalue,getMonthvalue,search))
        }
      },[search])

      useEffect(()=>{
        if(reducerdMonthSearchdata){
          setInternalinvoicehistoryMonthdata(reducerdMonthSearchdata)
            setLoading(false)
        }
      },[reducerdMonthSearchdata])

    

console.log("InternalinvoicehistoryMonthdata=>>>>>>>>",InternalinvoicehistoryMonthdata)



      const setSearchValue = value => {
        setSearch(value);
      };
      
  const ModalOpen=()=>{
    setModalVisible(true)
  }

const Handelcancel=(data)=>{
  console.log("onpresssssssssssssssssss","closeModal")
  setModalVisible(false)
  console.log(data)
}

const HandelSend=(data)=>{
dispatch(SendInvoiceHistoryData(data,navigation))
}


          console.log("setionvoicedattaa->>>>>>>>>>>>",FilterInvoiceData)
    return (
      <>
         <Modal
       animationType="slide"
       transparent={true}
       visible={modalVisible}
      >
      <Export Onpress={Handelcancel} ondatatSend={HandelSend}/>
    </Modal>
        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
       <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginHorizontal: 20,
          }}>
          <SearchBox setSearchValue={setSearchValue} />
          <TouchableOpacity
          onPress={()=>ModalOpen()}
            style={{
              flexDirection: 'column',
              shadowColor: '#000',
              borderRadius:10,
              backgroundColor:COLORS.white,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 1.84,
              elevation:20
            }}>
            <Text
              style={{
                paddingHorizontal: 19,
                paddingVertical: 19,
                borderRadius: 10,
                flexDirection: 'column',
              }}>
              <AntDesign name="export" size={25} color="black" />
            </Text>
          </TouchableOpacity>
        </View>

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
      
            <View style={style.listContainer}>
            <InvoiceHistoryCard data={InternalinvoicehistoryMonthdata}/>
            </View>
        </SafeAreaView>
        </>
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