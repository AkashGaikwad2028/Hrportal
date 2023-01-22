// import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    Text
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { getRequetsClient } from "../../../Redux/Actions/RequestCllientAction";
import RequestClientList from "./RequestClientList"

const RequestClient = ({ navigation }) => {
    const [requestClient, setrequestClient] = useState()
    const dispatch = useDispatch()
    // const navigation=useNavigation()


    const reducerData = useSelector(state => state.RequestClientReducer)

    console.log("reducer+>>>>>>>>>>>>>>>>>>>",reducerData)

    useEffect(() => {
        const unSubscribe = navigation.addListener('focus', () => {
     dispatch(getRequetsClient()) 
        });
        return unSubscribe;
      }, [navigation]);
    
    return (
        <View style={styles.container}>
            <RequestClientList data={"Akash"} />
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

})

export default RequestClient