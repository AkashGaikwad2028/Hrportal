import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {GLOBALSTYLE} from '../../../../Constants/Styles';
import {COLORS} from '../../../../Constants/Theme';
import dayjs from 'dayjs';
import CheckBox from '@react-native-community/checkbox';

function InvoiceStatuCard({data}) {
  // console.log('dattttttttttttttt', data);
  const [getstatus, setgetStatus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [MonthWords,setMonthWords]=useState([])
  const [Month, setMonth] = useState([]);
  const [Year, setYear] = useState([]);

  const getDestructuredData = () => {
    const newdata1 = [];
    for (const key in data) {
      for (let i = 0; i < key.length; i++) {
        if (data[key][i]) {
          let newdata = {
            client_id: data[key][i].client_id,
            client_name: data[key][i].client_name,
            payment: data[key][i].payment,
            invoice: data[key][i].invoice,
            count: data[key][i].count,
          };
          newdata1.push(newdata);
        }
      }
    }
    setgetStatus(newdata1);
  };

  useEffect(() => {
    getDestructuredData();
    getMonth()
    MonthYear(MonthWords)
  }, [data]);

  // console.log('getstatus=>>>>>>>>>>>>>>>>>>>>>>>>>>>>', getstatus);
  const currentDate = dayjs();
  const MonthYear = (month) => {
    // console.log("month=??????????????????",month)
    let Montharray=[]
    for (let i = 0; i <month.length; i++) {
      // console.log("mmmmmmmmmmmmmmmmmmmmmm",month[i].month-1)
      const prevMonth = currentDate.month(month[i].month-1);
      // console.log("prevMonth===============",prevMonth)
      const monthName = prevMonth.format('MMMM'); 
      // console.log("monthName=>>>>>>>>>>>>>>>>>>>>>>>>",monthName)
      Montharray.push(monthName)
    }
    setMonth(Montharray);
  };

 

  // console.log("montharrrrrrrrrrrrrr",Month)

  const getMonth =()=>{
    const MonthinWords=[]
   for (const key in data){
    let year =key.toString().split("").splice(0,4).join("")
    let month =key.toString().split("").splice(5,7).join("")
    let item ={ "month":month,'year':year}
    MonthinWords.push(item)
   }
   setMonthWords(MonthinWords)
  }

  // console.log("monthwodddddddddddddddddddddd",MonthWords[0].year)

  const handelModal = () => {
    setShowModal(true);
  };

  const _renderItem = ({item}) => {
    // const handleOptionSelect=(option)=>{
    //   setisSelected(true)
    //   setSelectedOption(option)
    //   setShowModal(false)
    // }
    // console.log('item=>>>>>>>>>>>>>>>>>>>>>..........................', item);
    return (
      <>
        <View style={[GLOBALSTYLE.cardView]}>
          <View style={GLOBALSTYLE.columnView}>
            <Text
              style={[
                GLOBALSTYLE.rowView,
                GLOBALSTYLE.text,
                {textAlign: 'center',fontWeight:"bold",color:COLORS.blue},
              ]}>
              Client Name :- {item.client_name}
            </Text>
            <View
              style={{
                marginTop: 20,
                borderBottomWidth:1,
               borderTopWidth:1,
               borderBottomColor:"#ccccb3",
               borderTopColor:"#ccccb3",
                paddingHorizontal: 5,
                paddingVertical:10,
                shadowColor: '#ebebe0',
                shadowOffset: {
                  width: 4,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 1,
                elevation:2,
              }}>
             <Text style={[GLOBALSTYLE.text, {textAlign: 'center',fontWeight:"400"}]}>
                {Month[0]}{MonthWords[0].year}
              </Text>
              <View style={[GLOBALSTYLE.rowView, {marginHorizontal: 20}]}>
                <View style={{marginTop: 10}}>
                <Text style={[GLOBALSTYLE.text]}>Count</Text>
                  <Text style={[GLOBALSTYLE.text,{textAlign:"center"}]}>{item.count}</Text>
                  <Modal
                    visible={showModal}
                    animationType="slide"
                    transparent={true}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View style={styles.modal}>
                        <Text
                          onPress={() => handleOptionSelect('white')}
                          style={styles.modaltext}>
                          Not Done
                        </Text>
                        <Text
                          onPress={() => handleOptionSelect('gold')}
                          style={styles.modaltext}>
                          Partially done
                        </Text>
                        <Text
                          onPress={() => handleOptionSelect('teal')}
                          style={styles.modaltext}>
                          Full done
                        </Text>
                      </View>
                    </View>
                  </Modal>
                </View>
                <View>
                  <Text style={[GLOBALSTYLE.text]}>pay</Text>
                  <TouchableOpacity style={styles.CheckBox1}>
                    <Image
                      source={require('../../../../Components/tick.png')}
                      style={{width: 20}}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={[GLOBALSTYLE.text]}>Inv</Text>
                  <TouchableOpacity style={styles.CheckBox1}>
                    <Image
                      source={require('../../../../Components/tick.png')}
                      style={{width: 20}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
               style={{
                marginTop: 20,
               borderBottomWidth:1,
               borderTopWidth:1,
               borderBottomColor:"#ccccb3",
               borderTopColor:"#ccccb3",
                borderRadius:10,
                paddingHorizontal: 5,
                paddingVertical:10,
                shadowColor: '#ebebe0',
                shadowOffset: {
                  width: 4,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 1,
                elevation:2,
              }}>
            <Text style={[GLOBALSTYLE.text, {textAlign: 'center',fontWeight:"400"}]}>
              {Month[1]}{MonthWords[1].year}
              </Text>
              <View style={[GLOBALSTYLE.rowView, {marginHorizontal: 20}]}>
                <View style={{marginTop: 10}}>
                  <Text style={[GLOBALSTYLE.text]}>Count</Text>
                  <Text style={[GLOBALSTYLE.text,{textAlign:"center"}]}>{item.count}</Text>
                </View>
                <View>
                  <Text style={[GLOBALSTYLE.text]}>pay</Text>
                  <TouchableOpacity style={styles.CheckBox1}>
                    <Image
                      source={require('../../../../Components/tick.png')}
                      style={{width: 20}}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={[GLOBALSTYLE.text]}>Inv</Text>
                  <TouchableOpacity style={styles.CheckBox1}>
                    <Image
                      source={require('../../../../Components/tick.png')}
                      style={{width: 20}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
               style={{
                marginTop: 20,
               borderBottomWidth:1,
               borderTopWidth:1,
               borderBottomColor:"#ccccb3",
               borderTopColor:"#ccccb3",
                paddingHorizontal: 5,
                paddingVertical:10,
                shadowColor: '#ebebe0',
                shadowOffset: {
                  width: 4,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 1,
                elevation:2,
              }}>
              <Text style={[GLOBALSTYLE.text, {textAlign: 'center',fontWeight:"400"}]}>
              {Month[2]}{MonthWords[2].year}
              </Text>
              <View style={[GLOBALSTYLE.rowView, {marginHorizontal: 20}]}>
                <View style={{marginTop: 10}}>
                <Text style={[GLOBALSTYLE.text]}>Count</Text>
                  <Text style={[GLOBALSTYLE.text,{textAlign:"center"}]}>{item.count}</Text>
                </View>
                <View>
                  <Text style={GLOBALSTYLE.text}>pay</Text>
                  <TouchableOpacity style={styles.CheckBox1}>
                    <Image
                      source={require('../../../../Components/tick.png')}
                      style={{width: 20}}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={GLOBALSTYLE.text}>Inv</Text>
                  <TouchableOpacity style={styles.CheckBox1}>
                    <Image
                      source={require('../../../../Components/tick.png')}
                      style={{width: 20}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
               borderBottomWidth:1,
               borderTopWidth:1,
               borderBottomColor:"#ccccb3",
               borderTopColor:"#ccccb3",
                paddingHorizontal: 5,
                paddingVertical:10,
                shadowColor: '#ebebe0',
                shadowOffset: {
                  width: 4,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 1,
                elevation:2,
              }}>
              <Text style={[GLOBALSTYLE.text, {textAlign: 'center',fontWeight:"400"}]}>
              {Month[3]}{MonthWords[3].year}
              </Text>
              <View style={[GLOBALSTYLE.rowView, {marginHorizontal: 20}]}>
                <View style={{marginTop: 10}}>
                <Text style={[GLOBALSTYLE.text]}>Count</Text>
                  <Text style={[GLOBALSTYLE.text,{textAlign:"center"}]}>{item.count}</Text>
                </View>
                <View>
                  <Text style={GLOBALSTYLE.text}>pay</Text>
                  <TouchableOpacity style={styles.CheckBox1}>
                    <Image
                      source={require('../../../../Components/tick.png')}
                      style={{width: 20}}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={GLOBALSTYLE.text}>Inv</Text>
                  <TouchableOpacity style={styles.CheckBox1}>
                    <Image
                      source={require('../../../../Components/tick.png')}
                      style={{width: 20}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={getstatus}
        renderItem={_renderItem}
        // keyExtractor={item => item.id}
        edit
      />
    </View>
  );
}

export default InvoiceStatuCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
  },
  nameViewStyle: {
    width: '100%',
  },
  personViewStyle: {
    width: '100%',
    marginTop: 10,
  },
  innerViewStyle: {
    flex: 1,
  },
  upperViewStyle: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  indicatorTextStyle: {
    color: COLORS.grey,
    fontSize: 14,
  },
  contentTextStyle: {
    color: COLORS.black,
    fontSize: 14,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  modaltext: {
    color: 'black',
    textAlign: 'center',
  },
  CheckBox1: {
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    width: 30,
    height: 30,
    // paddingVertical:3,
    paddingBottom: 4,
    paddingHorizontal: 2,
    borderRadius: 5,
    borderRightWidth: 3,
    borderColor: '#ccccb3',
    backgroundColor: 'yellow',
  },
});
