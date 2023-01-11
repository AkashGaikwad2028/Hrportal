import React,{useState,useEffect} from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    Text
} from "react-native";
import {getPurchaseOrder} from "../../../Redux/Actions/PurchaseOrderAction"
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../../../Constants/Theme";
import { ActivityIndicator } from "react-native";
import PurchaseOrderList from "./PurchaseorderList";
import SearchBox from "../../../Components/SearchBox";


const PurchaseOrder = ({ navigation }) => {
    const dispatch = useDispatch();
    const reducerData = useSelector(state => state.PurchaseOrderReducer)
console.log("reducerdatap----",reducerData.purchaseorderData)

    const [purchaseOrder, setpurchaseOrder] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [filterPurchaseData, setFilterPurchaseData] = useState(null);


    useEffect(() => {
        const unSubscribe = navigation.addListener('focus', () => {
            dispatch(getPurchaseOrder())
        });
        return unSubscribe;
    }, [navigation]);

    
//   useEffect(() => {
//     const unsubscribe = navigation.addListener('blur', () => {
//       setLoading(true);
//       setpurchaseOrder(null);
//       setError(null);
//     });
//     return unsubscribe;
//   }, [navigation]);

    useEffect(() => {
        console.log("-------------------",reducerData.purchaseorderData)
       setpurchaseOrder(reducerData.purchaseorderData)
       setFilterPurchaseData(reducerData.purchaseorderData)
    }, [reducerData.purchaseorderData])

    useEffect(() => {
        getPurchaseOrderFilterData();
      }, [search])
    

    const getPurchaseOrderFilterData = () => {
        const filterValue = purchaseOrder?.filter(data => {
            if (search.length === 0) {
            return data;
          } 
         else if (
            (data.clients !== null ) &&
            (data.resources[0] !==undefined )
           )
         {
           if(
            data.clients.client_name.includes(search)||
            data.resources[0].fname.toLowerCase().includes(search.toLowerCase())||
             data.resources[0].lname.toLowerCase().includes(search.toLowerCase())||
             data.order_number.includes(search)
           )
           return data
         }
        });
        setFilterPurchaseData(filterValue);
      }
      
    const setSearchValue = value => {
        setSearch(value);
      };

      // const ViewPdf=()=>{
      //   console.log("viewpdfpresss")
      //   navigation.navigate('ViewPdf')
      // }

    console.log("purchase----",purchaseOrder) 
    return (
        <View style={styles.container}>
      <SearchBox
       setSearchValue={setSearchValue}
      />
       {/* {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue} />
        </View>
      )}

      {!loading && error (
        <View style={styles.loadingContainer}>
          <Text> Something Went Wrong</Text>
        </View>
      )} */}

      {/* { search && (
        <View style={styles.loadingContainer}>
          <Text> purchase order Information is not found </Text>
        </View> 
     )}  */}
      {purchaseOrder && purchaseOrder.length>0 && (
       <View style={styles.listContainer}>
          <PurchaseOrderList
            data={filterPurchaseData}
          //  ViewPdf={ViewPdf}
          />
        </View>
     )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      listContainer: {
        flex: 1,
        marginVertical: 8,
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
})

export default PurchaseOrder




 // data.clients.client_name.toLowerCase().includes(search.toLowerCase()) ||
                // data.resources[0].fname.toLowerCase().includes(search.toLowerCase()) ||
                // data.resources[0].lname.toLowerCase().includes(search.toLowerCase()) ||