import React, { useState, useEffect } from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    Alert,
    Modal
} from "react-native";
import { GLOBALSTYLE } from "../../../Constants/Styles";
import { useSelector, useDispatch } from "react-redux";
import SearchBox from "../../../Components/SearchBox";
import { getInActiveresources, ActiveResource, deleteInActiveUser } from "../../../Redux/Actions/InActiveResourceAction";
import { COLORS } from "../../../Constants/Theme";
import SmallButton from "../../../Components/SmallButton";
import { ActivityIndicator } from "react-native";
import ViewPdf from "../../../Components/ViewPdf";


const InActiveResources = ({ navigation }) => {
    const dispatch = useDispatch();
    const reducerData = useSelector(state => state.InActiveResourceReducer)
   
    const [resources, setResources] = useState([]);
    const [filterResource, setFilterResources] = useState([]);
    const [search, setSearch] = useState('');
    const [loading,setLoading]=useState(true)
    const [modalVisible, setModalVisible] = useState(false);
    const [PdfData,setPdfData]=useState('')
    console.log("resssssssssssssssssssssss",PdfData)

    useEffect(() => {
        const unSubscribe = navigation.addListener('focus', () => {
            setLoading(true)
            dispatch(getInActiveresources())
        });
        return unSubscribe;
    }, [navigation]);

    const setSearchValue = value => {
        setSearch(value);
    };
    useEffect(() => {
        getAccountFilterData();
    }, [search])
    console.log("filterResource=>>>>>>>>>>>>",filterResource)
    useEffect(() => {
        // console.log("-------------------", reducerData.InActiveResourceData)
        setResources(reducerData.InActiveResourceData)
        setFilterResources(reducerData.InActiveResourceData)
        setLoading(false)
    }, [reducerData.InActiveResourceData])

    const getAccountFilterData = () => {
        const filterValue = resources?.filter(data => {
            if (search.length === 0) {
                return data;
            } else if (
                data.fname.toLowerCase().includes(search.toLowerCase()) ||
                data.lname.toLowerCase().includes(search.toLowerCase()) ||
                data.email.toLowerCase().includes(search.toLowerCase()) ||
                data.passing_year.toLowerCase().includes(search.toLowerCase()) ||
                data.phone.toLowerCase().includes(search.toLowerCase()) ||
                data.resident_address.toLowerCase().includes(search.toLowerCase())
            ) {
                // console.log(data);
                return data;
            }
        });
        setFilterResources(filterValue);

    };

    const handleActive = (item) => {
        console.log("hit archive", item.id)
        dispatch(ActiveResource(item.id))
        dispatch(getInActiveresources())
    }

    const deleteOk = (id) => {
        dispatch(deleteInActiveUser(id))
        setSearch('');
        const remaningData = resources.filter(t => t.id !== id);
        setFilterResources([...remaningData]);
    }

    const handleDelete = (id) => {
        Alert.alert(
            'Are you sure want to Delete?',
            'You wont be able to revert this.',
            [
                {
                    text: 'Yes, Delete it',
                    onPress: () => deleteOk(id),
                },
                {
                    type: 'cancel',
                    text: 'Cancel',
                    onPress: () => console.log("Cancel Pressed"),
                },
            ],
        );

    }

    // const closeModal=()=>{
    //     console.log("useCallback modal")
    //     setDeletmodalVisible(false)
    //   }
    
      const closeModalHandler = () => {
        setModalVisible(!modalVisible);
        // console.log('----MODAL CLOSED!----');
      };
    
      

    return (
      
       <>
       <SafeAreaView>
       <Modal
animationType="fade"
transparent={true} 
visible={modalVisible}
onRequestClose={() => {
  Alert.alert("Modal has been closed.");
  setModalVisible(!modalVisible);}}
>
<ViewPdf
pdfdata={PdfData} 
onCancel={closeModalHandler}
navigation={navigation}
/>
</Modal> 
</SafeAreaView>  

        <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
            <SearchBox
                setSearchValue={setSearchValue}
            />

{loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue} />
        </View>
      )}
       { !loading && search && (
        <View style={styles.loadingContainer}>
          <Text> InActive Resources Information is Not Found </Text>
        </View> 
     )} 
            <View>
                <FlatList
                    data={filterResource}
                    renderItem={({ item }) => (
                        <View style={GLOBALSTYLE.cardView}>
                            <View style={GLOBALSTYLE.rowView}>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Name</Text>
                                    <Text style={GLOBALSTYLE.text}>
                                        {item?.fname === null
                                            ? '-'
                                            : `${item.fname} ${item.lname}`}</Text>
                                </View>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Mobile</Text>

                                    <Text style={GLOBALSTYLE.text}>
                                        {item?.phone === null
                                            ? '-'
                                            : item.phone
                                        }
                                    </Text>
                                </View>
                            </View>
                            <View style={GLOBALSTYLE.rowView}>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}> Offical Email Id</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.email == null ? '-' : item.email}</Text>
                                </View>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}> Alternate Number</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.alternate_no === null ? '-' : item.alternate_no}</Text>
                                </View>
                            </View>
                            <View style={GLOBALSTYLE.rowView}>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Locality</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.resident_address == null
                                        ? '-'
                                        : item.resident_address}</Text>
                                </View>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Interview Level</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.l1 === null ? '-' : item.l1}</Text>
                                </View>
                            </View>
                            <View style={GLOBALSTYLE.rowView}>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Personal Email Id</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.personal_email === null ? '-' : item.personal_email}</Text>
                                </View>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Skills</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.primary_skill === null ? '-' : item.primary_skill}</Text>
                                </View>
                            </View>
                            <View style={GLOBALSTYLE.rowView}>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Status</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.on_bench === null
                                        ? '-'
                                        : item.on_bench === 1
                                            ? 'Bench'
                                            : 'Project'}</Text>
                                </View>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Vendor</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.company_name == null ? '-' : item?.company_name}</Text>
                                </View>
                            </View>
                            <View style={GLOBALSTYLE.rowView}>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>CV</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setModalVisible(true);
                                            setPdfData(item.resume);
                                            
                                          }}
                                    >
                                        <Text style={[GLOBALSTYLE.text, { color: COLORS.lightBlue }]}>View</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Cost</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.cost === null ? '-' : item.cost}</Text>
                                </View>
                            </View>
                            <View style={GLOBALSTYLE.rowView}>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Passing Year</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.passing_year === null ? '-' : item.passing_year}</Text>
                                </View>
                                <View style={GLOBALSTYLE.columnView}>
                                    <Text style={GLOBALSTYLE.label}>Project</Text>
                                    <Text style={GLOBALSTYLE.text}>{item.project === null ? '-' : item.project}</Text>
                                </View>
                            </View>
                            <View style={GLOBALSTYLE.rowView}>
                                <SmallButton
                                    color={COLORS.green}
                                    title={"Active"}
                                    onPressFunction={() => {
                                        handleActive(item)
                                    }}
                                />
                                <SmallButton
                                    color={COLORS.red}
                                    title={"Delete"}
                                    onPressFunction={() => {
                                        handleDelete(item.id)
                                    }}
                                />
                            </View>

                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
})

export default InActiveResources