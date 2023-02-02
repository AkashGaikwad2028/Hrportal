import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet,Dimensions,Alert,Linking } from 'react-native';
import { GLOBALSTYLE } from '../../../Constants/Styles';
import { COLORS } from '../../../Constants/Theme';
import SmallButton from "../../../Components/SmallButton"


function RequestClientList({ data}) {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [PdfData,setPdfData]=useState('')
//   console.log('modalVisible',modalVisible)
 
//   const onPressPurchaseOrder = url => {
//     if (url === null || url === undefined) {
//       Alert.alert(' ', 'Unable to download the document', [
//         {
//           text: 'OK',
//           style: 'cancel',
//         },
//       ]);
//       return;
//     }
//     Alert.alert('Download', 'Please download document here', [
//       {
//         text: 'Yes, Download',
//         onPress: () => {
//           Linking.canOpenURL(url).then(supported => {
//             console.log(supported);
//             if (supported) {
//               Linking.openURL(url);
//             } else {
//               // console.log("Don't know how to open URI: " + getDownloadLinkSuccess.downloadLink);
//             }
//           });
//         },
//       },
//       {
//         style: 'cancel',
//         text: 'No',
//       },
//     ]);
//   };

  const _renderItem = ({ item }) => {
    console.log("clientrequest item",item)
    // console.log("item-----------",'fname',item.clients.client_name,(item.resources[0].fname.length + item.resources[0].lname.length)>12)
    return (
        <>
      {/* <SafeAreaView style={GLOBALSTYLE.mainContainer}>
      <Modal
animationType="slide"
transparent={true} 
visible={modalVisible}
onRequestClose={() => {
  Alert.alert("Modal has been closed.");
  setModalVisible(!modalVisible);}}
>
<ViewPdf  pdfdata={PdfData} />
<Text onPress={() =>( setModalVisible(false))} style={{color:"red"}}>cancel</Text>
</Modal> */}
{/* </SafeAreaView> */}
      <View style={[GLOBALSTYLE.cardView]}>
          <View style={GLOBALSTYLE.columnView}>
         {item.company_name && ( 
            <View style={ GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Company Name</Text>
              <Text style={GLOBALSTYLE.text}>{item.company_name }</Text>
            </View>
           )}  

           {item.finance_name && (
             <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>Finance Name</Text>
            <Text style={GLOBALSTYLE.text}>{item.finance_name}</Text>
          </View>
         )} 
        </View>
        <View style={GLOBALSTYLE.columnView}>
         {item.finance_email&& (
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Finance Email</Text>
              <Text style={GLOBALSTYLE.text}>{item.finance_email}</Text>
            </View>
           )}  
<View style={GLOBALSTYLE.rowView}>
           {item.finance_contact_number && ( <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>Finance Number</Text>
            <Text style={GLOBALSTYLE.text}>{item.finance_contact_number}</Text>
         </View>
           )} 
      
       
        {item.nationality && ( 
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Nationality</Text>
              <Text style={GLOBALSTYLE.text}>{item.nationality}</Text>
            </View>
           )}  
</View>
<View style={GLOBALSTYLE.columnView}>
           {item.pan && (
            <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>Tan</Text>
            <Text style={GLOBALSTYLE.text}>{item.pan}</Text>
          </View>
       )}
          {item.pan &&(
          <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>Pan</Text>
            <Text style={GLOBALSTYLE.text}>{item.tan}</Text>
          </View>
     )} 
        {item.gst &&(
          <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>gst</Text>
            <Text style={GLOBALSTYLE.text}>{item.gst}</Text>
          </View>
     )} 
        </View>
        <View style={styles.upperViewStyle}>
          <View style={[styles.innerViewStyle]}>
            <SmallButton
              color={COLORS.lightgreen}
              title={'Accept'}
            //   onPressFunction={() => {
            //     editPurchaseOrder(item)
            //   }}
            />
          </View>
          <View style={[styles.innerViewStyle]}>
            <SmallButton color={COLORS.red}
              title={'Reject'}
            //   onPressFunction={() => {
            //   deletePurchaseOrder(item.id)
            // }}
            />
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
        data={data}
        renderItem={_renderItem}
    
        edit
      />
    </View>
  );
}

export default RequestClientList;

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

