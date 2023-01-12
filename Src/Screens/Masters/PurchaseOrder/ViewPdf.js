import React, { useState } from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Pdf from 'react-native-pdf';
import {SafeAreaView} from 'react-native-safe-area-context';

const ViewPdf = ({pdfdata}) => {
// const [pdfs,setPdfs]=useState('')
//     console.log("pdfData-----------",pdfdata)
//     if(pdfdata!==undefined){
//         setPdfs(pdfdata)
//     }

    // console.log("pdfssss-----------------",pdfs)
  const source = {
    uri:[pdfdata],
    cache: true,
  };

  return (
    <SafeAreaView  style={styles.container}>
      <View style={styles.container}>
        <Pdf
          trustAllCerts={false}
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewPdf;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 65,
  },

  color:{
    color:"red"
  },
  pdf: {
    flex: 1,
    width:"80%",
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    backgroundColor:"yellow"
  },
});