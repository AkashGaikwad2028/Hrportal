import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import {GLOBALSTYLE} from "../../../Constants/Styles"
import { COLORS } from '../../../Constants/Theme';
import SmallButton from "../../../Components/SmallButton"
import EvilIcons from "react-native-vector-icons/EvilIcons"

function PurchaseOrderList({ data }) {
  const _renderItem = ({ item }) => {
    console.log("item-----------",item)
    return (
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
            <EvilIcons  color="red" size={25}/>
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
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={_renderItem}
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
});
