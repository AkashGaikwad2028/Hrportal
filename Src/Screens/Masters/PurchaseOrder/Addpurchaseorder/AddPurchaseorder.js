import React from 'react'
import { View,Text, SafeAreaView, ScrollView } from 'react-native'
import CustomNavigationBar from '../../../../Components/CustomNavigationBar'
import { GLOBALSTYLE } from '../../../../Constants/Styles'

export default function AddPurchaseorder() {
  return (
  <SafeAreaView>
    <CustomNavigationBar back={true}  headername="Add Purchase order"></CustomNavigationBar>
 <ScrollView>
    <View style={GLOBALSTYLE.mainContainer}>
   
    </View>
 </ScrollView>
  </SafeAreaView>
  )
}
