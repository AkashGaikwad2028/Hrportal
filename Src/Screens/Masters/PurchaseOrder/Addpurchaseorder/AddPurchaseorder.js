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
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import {addPurchaseOrder} from '../../../../Redux/Actions/PurchaseOrderAction';

export default function AddPurchaseorder({navigation}) {
  const dispatch = useDispatch();
  const reducerdata = useSelector(state => state.PurchaseOrderReducer);
  console.log('reducerDataAdd', reducerdata.purchaseorderData);
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

  const ClientList = () => {
    if (reducerdata.purchaseorderData !== null) {
      let newArray = [];

      let newIdsList = [];
      for (let i of reducerdata.purchaseorderData) {
        // console.log(i.client_id);
        if (i.clients) {
          if (!newIdsList.some(o => o.client_id === i.client_id)) {
            newIdsList.push({...i});
          }
        }
      }

      console.log('nelist', newIdsList);
      for (var i of newIdsList) {
        let item;
        if (i.clients) {
          if (i.clients !== null) {
            item = {
              id: i.clients.id,
              label: `${i.clients.client_name}`,
              value: i.clients.id,
            };
            // console.log("itemAddpur=>>>>>>>>>",item)
          }
          newArray.push(item);
        }
      }
      setItems(newArray);
    }
  };

  useEffect(() => {
    ClientList();
  }, [reducerdata.purchaseorderData.clients]);

  useEffect(() => {
    Resourcelist();
  }, [reducerdata.purchaseorderData.resources]);

  console.log('itemmmmmmmmmmmmmmmmm', resourceItem);

  const Resourcelist = () => {
    if (reducerdata.purchaseorderData !== null) {
      let newArray1 = [];
      // console.log(reducerdata.purchaseorderData);

      let newIdsList1 = [];
      for (let i of reducerdata.purchaseorderData) {
        // console.log(i.client_id);
      if(i.resources[0]){
        if ((!newIdsList1.some(r=>r.resources[0].id === i.resources[0].id) )) {
          newIdsList1.push({...i});  
      }
      }
      }
      console.log("new104",newIdsList1)

      for (var i of newIdsList1 ) {
        console.log("iiiiiiiiiiiiiiiiihcjhd",i)
        if (i.resources[0]) {
          let item;
          if (i.resources[0] !== null) {
            item = {
              id: i.resources[0].id,
              label: `${i.resources[0].fname} ${i.resources[0].lname}`,
              value: i.resources[0].id,
            };
            console.log('resource', item);
          }
          newArray1.push(item);
          console.log("newarry1",newArray1)
        }
        // console.log(' newArray1', newArray1)
      }
      setResourceItem(newArray1);
    }
  };

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
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <CustomNavigationBar
        back={true}
        headername="Add purchase order"></CustomNavigationBar>
      <View style={[GLOBALSTYLE.mainContainer, {margin: 10}]}>
        <DropDownPicker
           onPress={ClientList}
          style={style.dropdownViewStyle}
          placeholder="Client Name*"
          dropDownContainerStyle={style.dropDownContainerStyle}
          listMode="FLATLIST"
          renderListItem={({item}) => {
            console.log('rendderlistad>>>>>>>>>>', item);
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
         onPress={Resourcelist}
          style={style.dropdownViewStyle}
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
          style={[GLOBALSTYLE.TextInputStyle, {marginTop: 15}]}
          //  value={nickname}
          //  onChangeText={data => setnickname(data)}
          keyboardType="default"
          maxLength={25}
        />

        <TouchableOpacity style={style.btnStyle} onPress={showStartDatePicker}>
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

        <TouchableOpacity style={style.btnStyle} onPress={showEndDatePicker}>
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
{/* 
        <TouchableOpacity style={style.btnStyle}>
          <Text style={{color: COLORS.black}} placeholder="choose-file">
            choose file
          </Text>
          <Entypo
            name="attachment"
            size={20}
            style={{alignSelf: 'center', right: 30}}
          />
        </TouchableOpacity> */}

        <CustomButton
          title="Submit"
          onPressFunction={() => submitResource({resources: value, date:date})}
        />
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
});
