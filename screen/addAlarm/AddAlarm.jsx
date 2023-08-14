import { useEffect , useState} from 'react';
import { Image, StyleSheet, View , Text, TouchableOpacity, KeyboardAvoidingView, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {requireFont} from '../../dataApp/HomePage/Home';
import {textDataInstructions} from '../../dataApp/AlarmPage/AlarmData';
import { BlurView } from 'expo-blur';
import DataPicker from 'react-native-modern-datepicker';
import { useDispatch } from 'react-redux';
import { addAlarm } from '../../reducers/alarm';
import {transformHourToDate} from '../../dataApp/AlarmPage/calculAlarm';

export default function AddAlarm(){

    const dispatch = useDispatch();  // initialise dispatch

    const [time, setTime] = useState('');   // the value of hour choice
    const [text, setText] = useState('');   // the value of text write

    const [modal, setModal] = useState(false);          // the modal value to open or close it
    const [modalHour, setModalHour] = useState(false);  // the hour modal value to open or close it
    const [modalText, setModalText] = useState(false);  // the modal value to open or close it

    //load font
    requireFont();

    useEffect(()=>{
        
        // if modal is open then modal houre is visible else modal houre is unvisible
        modal ? setModalHour(true) : setModalHour(false), setModalText(false);
        // if a hour is selected then modal houre unvisibale and modal text is visible else null
        time  ? ( setModalHour(false), setModalText(true) ) : null;

    },[time, modal, modalHour, modalText]);

    

    /**
     * Description :
     * loop through textDataInstructions array and store the jsx content in a constant
     * 
     * @return {tag} JSX tag with texts instruction
     */
    const jsxTextInstructions = textDataInstructions.map((textInstructions)=>{
        return (
            <View style={styles.instruction}>
                <Text style={styles.textInstructions}>{textInstructions}</Text>
            </View>
        )
    });

    //When clicked button modal then open or close the modal
    const modalOpenClose =()=> setModal(!modal);
    

    // add an alarm to local storage
    const addAlarmToReducer=async()=>{

            // close modal
            await setModal(!modal);

            // reset all inputs value
            await setTime('');
            await setText('');

            // the selected date time in string format
            const data = transformHourToDate(time).toISOString();

            // add in local storage date, hour, text for to use in HomePage
            await dispatch(addAlarm({ date : data, hour: time, text: text }));
    };

    return(
    <>
        <LinearGradient colors={['#BBDBE4', '#EBF4F8']}  style={styles.container}>
            <Text style={styles.h1}>add an alarm</Text>
            <Image style={styles.imageHead} source={require('../../assets/imageAlarme/robot.png')} />
            {/* button add an alarm => open modal */}
            <TouchableOpacity onPress={()=>modalOpenClose()}>
                <LinearGradient colors={['#37474F', '#93BDCA']}  style={styles.addBtn}>
                    <Image style={styles.plus} source={require('../../assets/imageAlarme/plus.png')} />
                    <Text style={styles.addText}> Add an alarm</Text>
                </LinearGradient>
            </TouchableOpacity>
            {jsxTextInstructions}
            <Image style={styles.imageBottom1} source={require('../../assets/imageAlarme/robotLeft.png')} />
            <Image style={styles.imageBottom2} source={require('../../assets/imageAlarme/robotRight.png')} />
        </LinearGradient>

        {/* MODAL CONTENT */}
        {modal && (
        <BlurView intensity={30} style={styles.modalAdd}>
            {/* button close modal */}
            <TouchableOpacity onPress={()=>modalOpenClose()} style={styles.xMarkPosition}>
                <Image style={styles.xMark} source={require('../../assets/imageAlarme/xMark.png')} />
            </TouchableOpacity>
            {/* MODAL HOUR */}
            {modalHour&&(
            <DataPicker 
                style={styles.dataPicker}
                mode='time'
                minuteInterval={1}
                onTimeChange={ selectedTime => {setTime(selectedTime) }}
            />
            )}
            {/* MODAL TEXT */}
            {modalText&&(
            <KeyboardAvoidingView style={styles.boxInput} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
                <Text style={styles.label}>text written for the alarm :</Text>
                <TextInput 
                    value={text}
                    onChangeText={(value)=>setText(value)}
                    multiline
                    numberOfLines={5}
                    textAlignVertical='top'
                    style={styles.input} 
                />
                <TouchableOpacity onPress={addAlarmToReducer}>
                    <Text>Add an Alarm</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            )}
        </BlurView>
    )}
    </>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000',
        display:'flex',
        alignItems:'center',
        justifyContent:'start',
        flexDirection: 'column',
    },
    h1:{
        color:'#2A88A6',
        marginTop: '15%',
        fontSize: 30,
        textTransform :'uppercase',
        textShadowColor: '#325F6E',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 3,
        fontFamily :'DS-DIGI',
    },
    imageHead:{
        height : 200,
        width: 200,
    },
    addBtn:{
        width: 264,
        height: 62,
        borderRadius: 10,
        display :'flex',
        alignItems:'center',
        justifyContent:'start',
        flexDirection:'row',
        marginTop:'5%',
    },
    addText:{
        fontSize: 30,
        textTransform :'uppercase',
        color:'#fff',
        fontFamily :'DS-DIGI',
        marginLeft : '3%',
    },
    plus:{
        height:30,
        width:30,
        marginLeft : '6%',
    },
    instruction:{
        height: 30,
        width:'70%',
        borderWidth :1,
        borderColor :'#4899B2',
        marginTop: '10%',
        display:'flex',
        alignItems:'start',
        justifyContent:'center',
    },
    textInstructions:{
        fontSize: 23,
        textTransform :'uppercase',
        color:'#1F7C9A',
        fontFamily :'DS-DIGI',
        marginLeft : '2%',
        textTransform :'uppercase',
        textShadowColor: '#325F6E',
        textShadowOffset: { width: 4, height: 4 },
    },
    imageBottom1:{
        height:120,
        width: 120,
        position:'absolute',
        left:0,
        bottom:0
    },
    imageBottom2:{
        height:120,
        width: 120,
        position:'absolute',
        right:0,
        bottom:0
    },
    modalAdd:{
        height:'100%',
        width: '100%',
        position:'absolute',
        backgroundColor:'rgba(0,0,0, 0.3)',
    },
    dataPicker:{
        height:'100%',
        width: '100%',
    },
    xMarkPosition:{
        position:'absolute',
        top:0,
        right:0,
        zIndex:14,
        marginRight : 20,
        marginTop : 50,
    },
    xMark:{
        height:30,
        width:30,
    },
    boxInput:{
        height : '100%',
        width  : '100%',
        backgroundColor : '#fff',
        position:'absolute',
        display:'flex',
        alignItems:'flex-start',
        justifyContent:'center',
    },
    input:{
        borderWidth:1,
        borderColor : '#000',
        paddingBottom : '20%',
        paddingTop : '2%',
        paddingLeft : '1%',
        width:'70%',
        height : '30%',
        marginLeft: '15%',
    },
    label:{
        marginLeft: '15%',
        fontSize : 15,
        textTransform : 'uppercase',
        marginBottom: '5%',
    },
  })