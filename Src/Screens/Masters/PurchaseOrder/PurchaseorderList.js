import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet,Dimensions,Modal } from 'react-native';
import {GLOBALSTYLE} from "../../../Constants/Styles"
import { COLORS } from '../../../Constants/Theme';
import SmallButton from "../../../Components/SmallButton"
import ViewPdf from './EditpurchaseOrder/EditPurchaseOrder.js/ViewPdf';
import PDFExample from './PDFExample';
// import PDFExample from './PDFExample';


function PurchaseOrderList({ data}) {
  const [modalVisible, setModalVisible] = useState(false);
 const [PdfData,setPdfData]=useState('')
 

  const _renderItem = ({ item }) => {
    console.log("item-----------",item)
    return (
      <>
      <Modal
animationType="slide"
transparent={true}
visible={modalVisible}
onRequestClose={() => {
  Alert.alert("Modal has been closed.");
  setModalVisible(!modalVisible);}}
>
<PDFExample
// pdfData={PdfData}
/>
</Modal>
      <View style={[GLOBALSTYLE.cardView]}>
          <View style={GLOBALSTYLE.rowView}>
        {item.clients.client_name && ( 
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Client Name</Text>
              <Text style={GLOBALSTYLE.text}>{item.clients.client_name}</Text>
            </View>
           )} 

           {item.resources[0].fname && item.resources[0].lname && (
             <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>Resource Name</Text>
            <Text style={GLOBALSTYLE.text}>{`${item.resources[0].fname} ${item.resources[0].lname}`}</Text>
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
          <Text  onPress={() =>
            {
              setModalVisible(true)
            }
          }
            >View</Text>
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
            />
          </View>
          <View style={[styles.innerViewStyle]}>
            <SmallButton color={COLORS.red}
              title={'Delete'}
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
}
});

// setPdfData(item.pdf_file);