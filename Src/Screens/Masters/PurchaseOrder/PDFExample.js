
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Pdf from 'react-native-pdf';
import {SafeAreaView} from 'react-native-safe-area-context';

const PDFExample = () => {
  console.log("pdfData")
  const source = {
    uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    cache: true,
  };

  return (
    <SafeAreaView>
    <View style={styles.container}>
    <Pdf
     trustAllcerts={false}
        source={source}
        onLoadComplete={(numberOfPages,filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page,numberOfPages) => {
            console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
            console.log(error);
        }}
        onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}/>
</View>
    </SafeAreaView>
    // <View><Text>Hello Modal</Text></View>
  );
};

export default PDFExample ;

const styles = StyleSheet.create({
  container: {
   width:"100%",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    backgroundColor:"red"
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});