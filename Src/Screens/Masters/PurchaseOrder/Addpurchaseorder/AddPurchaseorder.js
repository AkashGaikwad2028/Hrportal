import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomNavigationBar from '../../../../Components/CustomNavigationBar';
import {GLOBALSTYLE} from '../../../../Constants/Styles';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../../../../Constants/Theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../../../Components/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getResources } from '../../../../Redux/Actions/PurchaseOrderAction';
import {addPurchaseOrder} from '../../../../Redux/Actions/PurchaseOrderAction';

export default function AddPurchaseorder({navigation}) {
  const dispatch = useDispatch();
  const reducerdata = useSelector(state => state.PurchaseOrderReducer);
  // console.log('reducerDataAdd', reducerdata.getResorceData);
  console.log('reducerDataAdd', reducerdata.getClientData)
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [resourcevalue, setResourcevalueValue] = useState(null);
  const [resourceItem, setResourceItem] = useState([]);
  const [date, setDate] = useState({
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
  });
  const [displayDate, setDisplayDate] = useState({
    startDate: 'Start Date',
    endDate: 'End Date',
  });

  const [datePicker, setDatePicker] = useState({
    startDatePicker: false,
    endDatePicker: false,
  });


  const ResourceList = () => {
   console.log("resffsdg",reducerdata.getResorceData)
   if (reducerdata.getResorceData != null) {
    let newArray = [];
    for ( var i of reducerdata.getResorceData) {
      console.log("i=>>>>>>>>>>>>>>>>>>",i)
        let item;
        if(i.fname || i.lname ){
          if (i.fname && i.lname !== null) {
            console.log("ifname,lname",i.fname,i.lname)
             item = { id: i.id, label: `${i.fname} ${i.lname}`, value: i.id };
         }
         newArray.push(item);
        }  
    }
    setItems(newArray); 
}
  }
  useEffect(() => {
    ClientList();
  }, [reducerdata.getClientData]);

  useEffect(() => {
    ResourceList();
  }, [reducerdata.getResorceData]);

  // console.log(' ResourceList ',  ResourceList() );

  const ClientList = () => {
    if (reducerdata.getClientData !== null) {
      let newArray1 = [];
      console.log("jdhfuiiiiiiiii=????????",reducerdata.getClientData);
      for ( var i of reducerdata.getClientData) {
        console.log("i=>>>>>>>>>>>>>>>>>>",i)
          let item;
          if(i.client_name ){
            if (i.client_name  !== null) {
              console.log("i.client_name",i.client_name)
               item = { id: i.id, label: `${i.client_name }`, value: i.id };
           }
           newArray1.push(item);
          }  
      }
      setResourceItem(newArray1); 
  };
  }
  // console.log("open",open1)

  const convertDate = value => {
    const currentDate = value || date;
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getMonth() +
      1 +
      '/' +
      tempDate.getDate() +
      '/' +
      tempDate.getFullYear();
    //console.log(fDate)
    return fDate;
  };

  function onStartDateSelected(event, value) {
    setDatePicker(prevDatePickers => {
      return {...prevDatePickers, startDatePicker: false};
    });
    setDate(prevDates => {
      return {...prevDates, startDate: value};
    });
    setDisplayDate(prevDates => {
      return {...prevDates, startDate: convertDate(value)};
    });
  }

  function onEndDateSelected(event, value) {
    setDatePicker(prevDatePickers => {
      return {...prevDatePickers, endDatePicker: false};
    });
    setDate(prevDates => {
      return {...prevDates, endDate: value};
    });
    setDisplayDate(prevDates => {
      return {...prevDates, endDate: convertDate(value)};
    });
  }

  function showStartDatePicker() {
    setDatePicker(prevDatePickers => {
      return {...prevDatePickers, startDatePicker: true};
    });
  }

  function showEndDatePicker() {
    setDatePicker(prevDatePickers => {
      return {...prevDatePickers, endDatePicker: true};
    });
  }

  const submitResource = values => {
    dispatch(addPurchaseOrder(values, navigation));
  };
  return (
    <SafeAreaView style={[GLOBALSTYLE.safeAreaViewStyle]}>
      <CustomNavigationBar
        back={true}
        headername="Add purchase order"></CustomNavigationBar>
      <View style={[GLOBALSTYLE.mainContainer, {margin: 10}]}>
        <DropDownPicker
           onPress={ ClientList}
          style={[style.dropdownViewStyle,{marginTop:25}]}
          placeholder="Client Name*"
          dropDownContainerStyle={style.dropDownContainerStyle}
          listMode="FLATLIST"
          renderListItem={({item}) => {
            console.log('rendderCliennnt', item);
            return (
              <TouchableOpacity
                onPress={() => {
                  setValue(item.value);
                  setOpen(false);
                }}
                style={style.cellStyle}>
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
          style={[style.dropdownViewStyle,{marginTop:25}]}
          onPress={ResourceList}
          placeholder="resources Name*"
          dropDownContainerStyle={style. dropDownContainerStyle}
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
          style={[GLOBALSTYLE.TextInputStyle, {marginTop: 25}]}
          //  value={nickname}
          //  onChangeText={data => setnickname(data)}
          keyboardType="default"
          maxLength={25}
        />

        <TouchableOpacity style={[style.btnStyle,{marginTop:25}]} onPress={showStartDatePicker}>
          <Text style={{color: COLORS.black}}>{displayDate.startDate}</Text>
          <FontAwesome
            name="calendar-o"
            size={20}
            style={{alignSelf: 'center', right: 30}}
          />
        </TouchableOpacity>
        {datePicker.startDatePicker === true ? (
          <DateTimePicker
            value={date.startDate}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onStartDateSelected}
          />
        ) : null}

        <TouchableOpacity style={[style.btnStyle,{marginTop:25}]} onPress={showEndDatePicker}>
          <Text style={{color: COLORS.black}}>{displayDate.endDate}</Text>
          <FontAwesome
            name="calendar-o"
            size={20}
            style={{alignSelf: 'center', right: 30}}
          />
        </TouchableOpacity>
        {datePicker.endDatePicker === true ? (
          <DateTimePicker
            value={date.endDate}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onEndDateSelected}
          />
        ) : null}

        {/* <TouchableOpacity style={style.btnStyle}>
          <Text style={{color: COLORS.black}} placeholder="choose-file">
            choose file
          </Text>
          <Entypo
            name="attachment"
            size={20}
            style={{alignSelf: 'center', right: 30}}
          />
        </TouchableOpacity> */}
 <TouchableOpacity
              style={[style.btnStyles,{marginTop:25}]}
             > 
                <>
                  <AntDesign name="upload" color={COLORS.blue} size={24} />
                  <Text style={style.uploadBtnTextStyle}>Upload Pan Card</Text>
                </>
            </TouchableOpacity> 
            <View style={{marginTop:25}}>
        <CustomButton
          title="Submit"
          onPressFunction={() => submitResource({resources: value, date:date})}
        />
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  dropdownViewStyle: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 10,
    alignSelf: 'center',
    borderColor: '#fff',
    zIndex:100
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
    padding: 15,
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
    backgroundColor:  '#fff',
  },
  uploadBtnTextStyle: {
    color: COLORS.blue,
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 4,
  },
   btnStyles: {
    width:"100%",
    height: 48,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

