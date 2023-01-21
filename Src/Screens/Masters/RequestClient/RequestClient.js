import React from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    Text
} from "react-native";
import  RequestClientList from "./RequestClientList"

const RequestClient = ({ navigation }) => {
    return (   
 <View style={styles.container}>
<RequestClientList data={"Akash"}/>
</View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
      },

})

export default RequestClient