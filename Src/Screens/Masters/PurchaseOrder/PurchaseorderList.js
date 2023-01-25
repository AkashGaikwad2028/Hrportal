import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet,Dimensions,Alert,Linking,Modal,TouchableOpacity} from 'react-native';
import {GLOBALSTYLE} from "../../../Constants/Styles"
import { COLORS } from '../../../Constants/Theme';
import SmallButton from "../../../Components/SmallButton"
import ViewPdf from './ViewPdf';
import { SafeAreaView } from 'react-native-safe-area-context';



function PurchaseOrderList({ data,editPurchaseOrder,navigation, deletePurchaseOrder}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [DeletmodalVisible, setDeletmodalVisible] = useState(false);
  const [PdfData,setPdfData]=useState('')
  console.log('modalVisible',modalVisible)
  const [disabel,setDisabel]=useState(false)

const closeModal=()=>{
    console.log(modalVisible,"modalVisible")
    setDeletmodalVisible(false)
  }
  console.log('deletemodalVisible',DeletmodalVisible)
  const closeModalHandler = () => {
    setModalVisible(!modalVisible);
    // console.log('----MODAL CLOSED!----');
  };

  // const closeModalHandler1 = () => {
  //   setDeletmodalVisible(false);
  //   // console.log('----MODAL CLOSED!----');
  // };

  const _renderItem = ({ item }) => {

    console.log(item)
    // console.log("item-----------",'fname',item.clients.client_name,(item.resources[0].fname.length + item.resources[0].lname.length)>12)
    return (
      <>
     <SafeAreaView style={GLOBALSTYLE.mainContainer}>
      <Modal
animationType="slide"
transparent={true} 
visible={modalVisible}
onRequestClose={() => {
  Alert.alert("Modal has been closed.");
  setModalVisible(!modalVisible);}}
>
<ViewPdf  
pdfdata={PdfData} 
onCancel={closeModalHandler}
navigation={navigation}
/>
</Modal> 
</SafeAreaView> 
<Modal
        animationType="fade"
        transparent={true}
       
        visible={DeletmodalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setDeletmodalVisible(!DeletmodalVisible);
        }}>
          <View style={styles.modalContainer}>
        <View  style={styles.modal}>
          <View>
           <Text style={{textAlign:"center",fontSize:25}}>YOU ARE SURE</Text>
          </View>
          <View>
            <Text style={{textAlign:"center",fontSize:25}}>are you sur you want to delete</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={()=>{ deletePurchaseOrder(item.id)}} style={styles.cancelBtn}><Text>Delete</Text></TouchableOpacity>
            <TouchableOpacity onPress={closeModal} style={styles.cancelBtn}><Text>cancel</Text></TouchableOpacity>
          </View>
        </View>
        </View>
      </Modal>

      <View style={[GLOBALSTYLE.cardView]}>
          <View style={(item.resources[0].fname.length + item.resources[0].lname.length)>12 ? GLOBALSTYLE.columnView :GLOBALSTYLE.rowView }>
        {item.clients.client_name && ( 
            <View style={ GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Client Name</Text>
              <Text style={GLOBALSTYLE.text}>{item.clients.client_name}</Text>
            </View>
           )} 

           {item.resources[0].fname && item.resources[0].lname && (
             <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>Resource Name</Text>
            <Text style={GLOBALSTYLE.text}>{`${item.resources[0].fname} ${item.resources[0].lname +','}`}</Text>
          </View>
         )} 
        </View>
        <View style={GLOBALSTYLE.rowView}>
        {item.order_number&& ( 
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Order Number</Text>
              <Text style={GLOBALSTYLE.text}>{item.order_number}</Text>
            </View>
           )} 

           {item.pdf_file && ( <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>Pdf File</Text>
            <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                    setPdfData(item.pdf_file);
                    // console.log('----VIEW CLIKED!----');
                  }}>
                  <Text style={[GLOBALSTYLE.text, {color: COLORS.lightBlue}]}>
                    View
                  </Text>
                </TouchableOpacity>
         </View>
          )}
        </View>
        <View style={GLOBALSTYLE.rowView}>
        {item.start_date && ( 
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Start Date</Text>
              <Text style={GLOBALSTYLE.text}>{item.start_date}</Text>
            </View>
           )} 

           {item.end_date && ( <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>End Date</Text>
            <Text style={GLOBALSTYLE.text}>{item.end_date}</Text>
          </View>
          )}
        </View>
        <View style={styles.upperViewStyle}>
          <View style={[styles.innerViewStyle]}>
            <SmallButton
              color={COLORS.lightBlue}
              title={'Edit'}
              onPressFunction={() => {
                editPurchaseOrder(item)
              }}
            />
          </View>
          <View style={[styles.innerViewStyle]}>
            <SmallButton color={COLORS.red}
              title={'Delete'}
             onPressFunction={() => {
              setDeletmodalVisible(true)
            }}
            />
          </View>
        </View>
      </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={item => item.id}
        edit
      />
    </View>
  );
}

export default PurchaseOrderList;

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
  pdf: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
},
modal:{
  backgroundColor:"red",
  width:"80%",
  paddingHorizontal:30,
  paddingVertical:60,
  borderRadius:5
  },
  cancelBtn:{
    backgroundColor:"white",
    paddingHorizontal:30,
    paddingVertical:10,
    marginHorizontal:10,
    marginVertical:10
  },
  buttonContainer:{
    flexDirection:"row",
    fontSize:25,
    borderRadius:5
  },
  modalContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  
  }
});

// setPdfData(item.pdf_file);

