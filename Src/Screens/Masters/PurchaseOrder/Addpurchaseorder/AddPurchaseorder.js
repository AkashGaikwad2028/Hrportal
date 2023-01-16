import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, Dimensions, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import CustomNavigationBar from '../../../../Components/CustomNavigationBar'
import { GLOBALSTYLE } from '../../../../Constants/Styles'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS } from '../../../../Constants/Theme'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import CustomButton from '../../../../Components/CustomButton'
import Entypo from "react-native-vector-icons/Entypo"
import DateTimePicker from "@react-native-community/datetimepicker"
import { addPurchaseOrder } from "../../../../Redux/Actions/PurchaseOrderAction"

export default function AddPurchaseorder() {
  const dispatch = useDispatch()
  const reducerdata = useSelector(state => state.PurchaseOrderReducer)
  console.log('reducerDataAdd',reducerdata.purchaseorderData)
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [resourcevalue, setResourcevalueValue] = useState(null);
  const [resourceItem,setResourceItem]=useState([])
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [displayDate, setDisplayDate] = useState(
 
  )


const ClientList=()=>{
  if(reducerdata.purchaseorderData !==null){
        let newArray=[];
  
        for(var i of reducerdata.purchaseorderData){
          let item;
          if(i.clients){
          if(i.clients !== null){
            item= {id:i.clients.id,label:`${i.clients.client_name}`, value: i.clients.id }
            // console.log("itemAddpur=>>>>>>>>>",item)
          }
          newArray.push(item)  
        }
      }
        setItems(newArray)  
      }
}


  useEffect(()=>{
    ClientList()
  },[reducerdata.purchaseorderData.clients])

  useEffect(()=>{
       Resourcelist()
  },[reducerdata.purchaseorderData.resources])

  // console.log('itemmmmmmmmmmmmmmmmm',resourceItem)


  const Resourcelist=()=>{
    if(reducerdata.purchaseorderData !==null){
      let newArray1=[]
        console.log(reducerdata.purchaseorderData)
      for(var i of reducerdata.purchaseorderData){
        // console.log("iiiiiiiiiiiiiiiiihcjhd",i)
        if(i.resources[0]){
          let item;
        if(i.resources[0] !== null){
          item= {id:i.resources[0].id,label:`${i.resources[0].fname} ${i.resources[0].lname}`, value: i.resources[0].id }
         console.log("resource",item)
        }
        newArray1.push(item)  
      }
      console.log(' newArray1', newArray1)
    }
    setResourceItem(newArray1)  
    }
  }
  console.log("open",open1)

  const convertDate = (value) => {
    const currentDate = value || date;
    let tempDate = new Date(currentDate);
    let fDate = (tempDate.getMonth() + 1) + '/' + tempDate.getDate() + '/' + tempDate.getFullYear();
    //console.log(fDate)
    return (fDate)
}

function onStartDateSelected(event, value) {
  // console.log("valuedate",value)
  // setDatePicker(false);
  // setDate(value);
  // setDisplayDate(convertDate(value))
  setDisplayDate(preDate=>{
    return{
    ...preDate,
    "startDate":value,
    }
  })
};

// const onSelectedDate=()=>{

// }

function onEndDateSelected(event, value) {
  
  // console.log("valuedate",value)
  // setDatePicker(false);
  // setDate(value);
  // setDisplayDate(convertDate(value))
  setDisplayDate(preDate=>{
    return{
    ...preDate,
   " EndDate":value,
    }
  })
};

console.log("display",displayDate)

  function showDatePicker() {
    setDatePicker(true);
};


const submitResource = (values) => {
  dispatch( addPurchaseOrder(values, navigation))
}
  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <CustomNavigationBar back={true} headername="Add purchase order"></CustomNavigationBar>
      <View style={[GLOBALSTYLE.mainContainer, { margin: 10 }]}>
         <DropDownPicker
        //  onPress={ClientList}
          style={style.dropdownViewStyle}
          placeholder="Client Name*"
          dropDownContainerStyle={style.dropDownContainerStyle}
        listMode="FLATLIST"
          renderListItem={({item})=>{
            console.log("rendderlistad>>>>>>>>>>",item)
            return(
              <TouchableOpacity
              onPress={()=>{
                setValue(item.value)
                setOpen(false)
              }}
              style={style.cellStyle}
              >
                <Text style={style.cellTextStyle}>{item.label}</Text>
              </TouchableOpacity>
            );
          }}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setItems={setItems}

        /> 
   <DropDownPicker
        //  onPress={Resourcelist}
          style={style.dropdownViewStyle1}
          placeholder="resources Name*"
          dropDownContainerStyle={style. dropDownContainerStyle1}
        listMode="FLATLIST"
          renderListItem={({item})=>{
            console.log("rendderlistad>>>>>>>>>>",item)
            return(
              <TouchableOpacity
              onPress={()=>{
                setResourcevalueValue(item.value)
                setOpen1(false)
                setOpen1(false)
              }}
              style={style.cellStyle}
              >
                <Text style={style.cellTextStyle}>{item.label}</Text>
              </TouchableOpacity>
            );
          }}
          open={open1}
          value={resourcevalue}
          items={resourceItem}
          setOpen={setOpen1}
          setItems={setResourceItem}

        /> 
        <TextInput
          placeholder="Order Number*"
          style={[GLOBALSTYLE.TextInputStyle,{marginTop:15}]}
          //  value={nickname}
          //  onChangeText={data => setnickname(data)}
          keyboardType="default"
          maxLength={25}
        />

        <TouchableOpacity style={style.btnStyle}
          onPress={showDatePicker}
        >
          <Text style={{ color: COLORS.black }}>{displayDate}</Text>
          <FontAwesome
            name="calendar-o"
            size={20}
            style={{ alignSelf: 'center', right: 30 }}
          />
        </TouchableOpacity>
        {
          datePicker===true ?
          <DateTimePicker
          name="startDate"
          value={date}
          mode={'date'}
          display={Platform.OS=== 'ios'?"spinner":"default"}
          is24Hour={true}
          onChange={onStartDateSelected}
          />:
          null
        }

        <TouchableOpacity style={style.btnStyle}
        onPress={showDatePicker}
        >
          <Text style={{ color: COLORS.black }}>{displayDate}</Text>
          <FontAwesome
            name="calendar-o"
            size={20}
            style={{ alignSelf: 'center', right: 30 }}
          />
        </TouchableOpacity>
        {
          datePicker===true ?
          <DateTimePicker
          value={date}
          name="EndDate"
          mode={'date'}
          display={Platform.OS=== 'ios'?"spinner":"default"}
          is24Hour={true}
          onChange={onEndDateSelected}
          />:
          null
        }

        <TouchableOpacity style={style.btnStyle}
        >
          <Text style={{ color: COLORS.black }} placeholder="choose-file">choose file</Text>
          <Entypo
            name="attachment"
            size={20}
            style={{ alignSelf: 'center', right: 30 }}
          />
        </TouchableOpacity>

        <CustomButton
                    title="Submit"
                    onPressFunction={() => submitResource({ resources: value, })}
                />
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  dropdownViewStyle: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 10,
    alignSelf: 'center',
    borderColor: '#fff',

  },
  dropdownViewStyle1: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 10,
    alignSelf: 'center',
    borderColor: '#fff',

  },
  dropDownContainerStyle: {
    marginVertical: 10,
    paddingVertical: 4,
    borderColor: '#fff',
  },
  dropDownContainerStyle1: {
    marginVertical: 10,
    paddingVertical: 4,
    borderColor: '#fff',
  },

  btnStyle: {
    width: Dimensions.get('screen').width - 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    margin: 10,
    padding: 15
  },
  cellStyle: {
    padding: 8,
    marginVertical: 4,
},
cellTextStyle: {
    color: '#000',
    fontSize: 14,
    textTransform: 'capitalize',
    fontWeight: '600',
},
})


// for (var i of reducerdata.purchaseorderData){
//   let item;
//     if (i.clients){
//       item= {id:i.clients.id,label:`${i.clients.client_name}`, value: i.clients.id }
//       // console.log('itemAdddd',item)
//     }
//       newArray.push(item)  
//         }
// //  console.log('newArray',newArray)
// setItems(newArray)
// //  console.log("setItemwithenewarary=>>>>>>",newArray)