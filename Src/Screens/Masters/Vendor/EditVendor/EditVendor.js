import React, { useState, useEffect } from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from "react-native";
import CustomNavigationBar from "../../../../Components/CustomNavigationBar";
import { GLOBALSTYLE } from "../../../../Constants/Styles";
import { COLORS } from "../../../../Constants/Theme";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Upload from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker'
import CustomButton from "../../../../Components/CustomButton";
import DocumentPicker from 'react-native-document-picker';

const Editvendor = ({ navigation, route }) => {
    const params = route.params.newData;
    console.log("Params", params)

    const [company, setCompany] = useState(params.company_name);
    const [nickname, setnickname] = useState(params.nick_name);
    const [person, setPerson] = useState(params.contact_person);
    const [address, setAddress] = useState(params.company_address);
    const [number, setNumber] = useState(params.contact_number);
    const [email, setEmail] = useState(params.contact_email);
    const [pan, setPan] = useState(params.pan);
    const [panFileName, setPanFileName] = useState(null);
    const [gst, setGst] = useState(params.gst);
    const [gstFileName, setGstFileName] = useState(null);
    const [aggrementFileName, setAggrementFileName] = useState(null);
    const [panLink, setPanLink] = useState(null);
    const [gstLink, setGstLink] = useState(null);
    const [aggrementLink, setAggrementLink] = useState(null);
    const [creditperiod, setcreditperiod] = useState(params.credit_period);
    const [invoicedate, setinvoicedate] = useState(null);
    const [date, setDate] = useState(new Date(Date.now()));
    const [datePicker, setDatePicker] = useState(false);

    const getFileName = (value) => {
        let newArray = value.split('/');
        const fileName = newArray.pop();
        return fileName;
    }
    const convertDate = (value) => {
        const currentDate = value || date;
        let tempDate = new Date(currentDate);
        let fDate = (tempDate.getMonth() + 1) + '/' + tempDate.getDate() + '/' + tempDate.getFullYear();
        //console.log(fDate)
        return (fDate)
    }
    function onDateSelected(event, value) {
        setDatePicker(false);
        setDate(value);
        setinvoicedate(convertDate(value))
    };

    function showDatePicker() {
        setDatePicker(true);
    };

    useEffect(() => {
        setPanFileName(getFileName(params.pan_link));
        setGstFileName(getFileName(params.gst_link));
        setAggrementFileName(getFileName(params.agreement_link));
        setinvoicedate(convertDate(params.invoice_date));
    }, [])

    return (
        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
            <CustomNavigationBar back={true} headername="Edit Vendor" />
            <ScrollView>
                <View style={[GLOBALSTYLE.mainContainer, { margin: 10 }]}>

                    <TextInput
                        placeholder="Company Name"
                        style={GLOBALSTYLE.TextInputStyle}
                        value={company}
                        onChangeText={data => setCompany(data)}
                        keyboardType="default"
                    />
                    <TextInput
                        placeholder="Nick Name"
                        style={GLOBALSTYLE.TextInputStyle}
                        value={nickname}
                        onChangeText={data => setnickname(data)}
                        keyboardType="default"
                    />
                    <TextInput
                        placeholder="Contact Person*"
                        style={GLOBALSTYLE.TextInputStyle}
                        value={person}
                        onChangeText={data => setPerson(data)}
                    />
                    <View style={GLOBALSTYLE.uploadRowView}>
                        <View style={GLOBALSTYLE.iconBackgroundView}>
                            <FontAwesome
                                color={COLORS.lightBlue}
                                name="phone"
                                size={30}
                                style={{ right: 10, marginStart: 20 }}
                            />
                        </View>
                        <TextInput
                            placeholder="Mobile*"
                            value={number}
                            maxLength={10}
                            onChangeText={data => setNumber(data)}
                        />
                    </View>
                    <View style={GLOBALSTYLE.uploadRowView}>
                        <View style={GLOBALSTYLE.iconBackgroundView}>
                            <FontAwesome
                                color={COLORS.lightBlue}
                                name="envelope-o"
                                size={30}
                                style={{ right: 10, marginStart: 20 }}
                            />
                        </View>
                        <TextInput
                            placeholder="Email Id*"
                            value={email}
                            onChangeText={data => setEmail(data)}
                        />
                    </View>
                    <TextInput
                        placeholder="Company Address"
                        style={GLOBALSTYLE.TextInputStyle}
                        value={address}
                        onChangeText={data => setAddress(data)}
                    />
                    <TextInput
                        placeholder="PAN Number"
                        style={GLOBALSTYLE.TextInputStyle}
                        value={pan}
                        onChangeText={data => setPan(data)}
                    />
                    <TouchableOpacity style={GLOBALSTYLE.uploadRowView}>
                        <View style={GLOBALSTYLE.iconBackgroundView}>
                            <Upload
                                name="upload"
                                size={25}
                                style={{ right: 12, marginStart: 25 }}
                            />
                        </View>
                        <TextInput
                            placeholder="Upload PAN*"
                            editable={false}
                            value={panFileName}
                        />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="GST Number"
                        style={GLOBALSTYLE.TextInputStyle}
                        value={gst}
                        onChangeText={data => setGst(data)}
                    />
                    <TouchableOpacity style={GLOBALSTYLE.uploadRowView}>
                        <View style={GLOBALSTYLE.iconBackgroundView}>
                            <Upload
                                name="upload"
                                size={25}
                                style={{ right: 12, marginStart: 25 }}
                            />
                        </View>
                        <TextInput
                            placeholder="Upload GST*"
                            editable={false}
                            value={gstFileName}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={GLOBALSTYLE.uploadRowView}>
                        <View style={GLOBALSTYLE.iconBackgroundView}>
                            <Upload
                                name="upload"
                                size={25}
                                style={{ right: 12, marginStart: 25 }}
                            />
                        </View>
                        <TextInput
                            placeholder="Upload Agreement*"
                            editable={false}
                            value={aggrementFileName}
                        />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Credit Period"
                        style={GLOBALSTYLE.TextInputStyle}
                        value={creditperiod.toString()}
                        onChangeText={data => setcreditperiod(data)}
                        keyboardType="numeric"
                        maxLength={5}
                    />
                    <TouchableOpacity style={styles.btnStyle}
                        onPress={showDatePicker}
                    >
                        <Text style={{ color: COLORS.black }}>{invoicedate}</Text>
                        <FontAwesome
                            name="calendar-o"
                            size={25}
                        />
                    </TouchableOpacity>
                    {datePicker === true ?
                        <DateTimePicker
                            value={date}
                            mode={'date'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={true}
                            onChange={onDateSelected}
                        />
                        : null}

                </View>
            </ScrollView>
            <CustomButton
                title="Update"
            />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    btnStyle: {
        width: Dimensions.get('screen').width - 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        margin: 10,
        padding: 15
    },

})

export default Editvendor