import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, Dimensions, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import CustomNavigationBar from '../../../../Components/CustomNavigationBar'
import { GLOBALSTYLE } from '../../../../Constants/Styles'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS } from '../../../../Constants/Theme'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import CustomButton from '../../../../Components/CustomButton'
import Entypo from "react-native-vector-icons/Entypo"
import { addPurchaseOrder } from "../../../../Redux/Actions/PurchaseOrderAction"

export default function AddPurchaseorder() {
  // const dispatch = useDispatch()
  const reducerdata = useSelector(state => state.PurchaseOrderReducer)
  console.log('reducerDataAdd',reducerdata.purchaseorderData)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  console.log('addditem=>>>>>>>>>>>>>>',items)

  useEffect(()=>{
    if(reducerdata.purchaseorderData !==null){
      let newArray=[];
      for (i of reducerdata.purchaseorderData){
        // console.log("i of purchase ", i)
        let item;
        if (i.clients!==null || undefined){
          // console.log("iiiiii",i.clients.client_name)
          item= {id:i.clients.id,label:`${i.clients.client_name}`}
          console.log('itemAdddd',item)
        }
          newArray.push(item)
      }
     console.log('newArray',newArray)
     setItems(newArray)
    }
  },[reducerdata.purchaseorderData])

  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <CustomNavigationBar back={true} headername="Add purchase order"></CustomNavigationBar>
      <View style={[GLOBALSTYLE.mainContainer, { margin: 10 }]}>
        <Text>hello</Text>
        <DropDownPicker
          style={style.dropdownViewStyle}
          placeholder="Client Name*"
          dropDownContainerStyle={style.dropDownContainerStyle}
          listMode="FLATLIST"
          renderListItem={({items})=>{
            console.log("rendderlistad",items)
            // return(
            //   <TouchableOpacity
            //   onPress={()=>{
            //     setValue(item.value)
            //     setOpen(false)
            //   }}
            //   style={style.cellStyle}
            //   >
            //     <Text style={style.cellTextStyle}>{item.label}</Text>
            //   </TouchableOpacity>
            // );
          }}
          open={open}
          items={items}
          setOpen={setOpen}
          setItems={setItems}
         
        />

        {/* <DropDownPicker
          style={style.dropdownViewStyle}
          placeholder="Resources Name*"
          open={open}
          dropDownContainerStyle={style.dropDownContainerStyle}
          setOpen={setOpen}
     
        /> */}

        <TextInput
          placeholder="Order Number*"
          style={[GLOBALSTYLE.TextInputStyle,{marginTop:15}]}
          //  value={nickname}
          //  onChangeText={data => setnickname(data)}
          keyboardType="default"
          maxLength={25}
        />

        <TouchableOpacity style={style.btnStyle}

        >
          <Text style={{ color: COLORS.black }}>12/12/22</Text>
          <FontAwesome
            name="calendar-o"
            size={20}
            style={{ alignSelf: 'center', right: 30 }}
          />
        </TouchableOpacity>


        <TouchableOpacity style={style.btnStyle}
        >
          <Text style={{ color: COLORS.black }}>12/12/22</Text>
          <FontAwesome
            name="calendar-o"
            size={20}
            style={{ alignSelf: 'center', right: 30 }}
          />
        </TouchableOpacity>

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
  dropDownContainerStyle: {
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