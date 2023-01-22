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
          <View style={GLOBALSTYLE.rowView }>
        {/* {item.clients.client_name && (  */}
            <View style={ GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Client Name</Text>
              <Text style={GLOBALSTYLE.text}>Akash</Text>
            </View>
           {/* )}  */}

           {/* {item.resources[0].fname && item.resources[0].lname && ( */}
             <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>Resource Name</Text>
            <Text style={GLOBALSTYLE.text}></Text>
          </View>
         {/* )}  */}
        </View>
        <View style={GLOBALSTYLE.rowView}>
        {/* {item.order_number&& (  */}
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Order Number</Text>
              <Text style={GLOBALSTYLE.text}></Text>
            </View>
           {/* )}  */}

           {/* {item.pdf_file && ( <View style={GLOBALSTYLE.columnView}> */}
            <Text style={GLOBALSTYLE.label}>Pdf File</Text>
            {/* <Text  onPress={() => onPressPurchaseOrder(item.pdf_file.toString())}>View</Text> */}
         </View>
          {/* )} */}
      
        <View style={GLOBALSTYLE.rowView}>
        {/* {item.start_date && (  */}
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Start Date</Text>
              <Text style={GLOBALSTYLE.text}>kaksksk</Text>
            </View>
           {/* )}  */}

           {/* {item.end_date &&  */}
            <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>End Date</Text>
            <Text style={GLOBALSTYLE.text}>akakkakskk</Text>
          </View>
        {/* //   )} */}
        </View>
        <View style={styles.upperViewStyle}>
          <View style={[styles.innerViewStyle]}>
            <SmallButton
              color={COLORS.lightBlue}
              title={'Edit'}
            //   onPressFunction={() => {
            //     editPurchaseOrder(item)
            //   }}
            />
          </View>
          <View style={[styles.innerViewStyle]}>
            <SmallButton color={COLORS.red}
              title={'Delete'}
            //   onPressFunction={() => {
            //   deletePurchaseOrder(item.id)
            // }}
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

