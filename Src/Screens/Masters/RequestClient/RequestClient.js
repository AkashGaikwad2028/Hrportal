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
import SearchBox from "../../../Components/SearchBox";

const RequestClient = ({ navigation }) => {
    const [requestClient, setrequestClient] = useState()
    const dispatch = useDispatch()
    // const navigation=useNavigation()


    const reducerData = useSelector(state => state.RequestClientReducer.RequestClientReducerData)
    console.log("rediucedfjd=>>>>>>>>>>>>>",reducerData)

    // console.log("reducer+>>>>>>>>>>>>>>>>>>>",reducerData.data.client_request)

    // if(reducerData){
    //     console.log("idreddjdj",reducerData.client_request[0]
    //     )
    // }

    useEffect(() => {
        const unSubscribe = navigation.addListener('focus', () => {
     dispatch(getRequetsClient()) 
        });
        return unSubscribe;
      }, [navigation]);

console.log("requestclient",requestClient)

// const clientRequest=(reducerData)=>{
//     console.log("first",reducerData)
// for(let i=0;i<=reducerData.length;i++)
// }

// clientRequest(reducerData)

      useEffect(()=>{
            setrequestClient(reducerData.client_request)
      },[reducerData.client_request])

      console.log("requestclient",requestClient)
    
    return (
        <View style={styles.container}>
             <SearchBox
        // setSearchValue={setSearchValue}
      />
            <RequestClientList data={requestClient} />
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

})

export default RequestClient