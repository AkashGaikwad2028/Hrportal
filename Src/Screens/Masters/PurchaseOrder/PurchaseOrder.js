import React,{useState,useEffect} from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    Text
} from "react-native";
import {getPurchaseOrder} from "../../../Redux/Actions/PurchaseOrderAction"
import { useSelector, useDispatch } from "react-redux";

const PurchaseOrder = ({ navigation }) => {
    const dispatch = useDispatch();
    const reducerData = useSelector(state => state.PurchaseOrderReducer)
console.log("purchase----",reducerData)

    const [purchaseOrder, setpurchaseOrder] = useState([]);

    useEffect(() => {
        const unSubscribe = navigation.addListener('focus', () => {
            dispatch(getPurchaseOrder())
        });
        return unSubscribe;
    }, [reducerData.purchaseorderData]);

    useEffect(() => {
        console.log("-------------------",reducerData.purchaseorderData)
       setpurchaseOrder(reducerData.purchaseorderData)
    }, [reducerData.purchaseorderData])

    console.log("purchase----",purchaseOrder)
    return (
        <View>
        {
            purchaseOrder.map((res)=>{
                console.log("res-----",res)
               return(<Text>{res}</Text>) 
            })
        }
        </View>
    );
};

const styles = StyleSheet.create({

})

export default PurchaseOrder