import React, { Fragment } from 'react';
import { useEffect , useState} from 'react';
import { Image, StyleSheet, View , Text, TouchableOpacity, KeyboardAvoidingView, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import DataPicker from 'react-native-modern-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import {requireFont,pronouncesText} from '../../dataApp/HomePage/Home';
import { countdown } from '../../dataApp/AlarmPage/calculAlarm';
import {transformHourToDate} from '../../dataApp/AlarmPage/calculAlarm';
import { addTimer ,resetAll} from '../../reducers/timer';

export default function Timer(){

    const dispatch = useDispatch(); // initialise dispatch

    // get my alarms stocked in local storage
    const dataTimer = useSelector((state)=>state.timer.value);

    const [changeBtn, setChangeBtn] = useState(false);   // variable change button for timer
    const [modalHour, setModalHour] = useState(false);   //Modal hour true | false
    const [modalText, setModalText] = useState(false);   //Modal add text true | false
    const [refresh, setRefresh]     = useState(false);
    const [pause, setPause]         = useState(false);
    const [modal, setModal] = useState(false);           //variable modal open | close 

    //value hour choice
    const [time, setTime] = useState('');
    const [text, setText] = useState('');

    //load font
    requireFont();

    //When clicked then activate and deactivate the modal.
    const modalOpenClose =()=>{
        //modal true|false
        setModal(!modal);
    };

    // add a timer to timer local storage
    const addTimerToReducer=async()=>{
            
            await setModal(!modal);  // close modal

            await setTime('');  // reset selected time value
            await setText('');  // reset selected text value

            await setChangeBtn(!changeBtn); // change button view

            await setPause(false);

            // in constant data, I store the selected time in date format
            const data = transformHourToDate(time).toISOString();

            // add a timer in date format to timer local storage
            await dispatch(addTimer( { date : data, text: text }) );
    }

    useEffect(()=>{
        // if modal is open then modalHoure is visible else modalHoure is unvisible
        modal ? setModalHour(true) : setModalHour(false), setModalText(false);
        // if a hour is selected then modalHoure unvisibale & modalText is visible else null
        time  ? ( setModalHour(false), setModalText(true) ) : null;

    },[time, modal, modalHour, modalText]);

    const timed = dataTimer ? dataTimer.date : null;

    const deleteMdal=()=>{
        setChangeBtn(false);
        dispatch(resetAll());
        setPause(false);
    };

    const pauseTime=()=>{
        setPause(!pause);
    };

    if( countdown(timed) === '0 : 0 : 0'){
        pronouncesText(dataTimer.text);
        dispatch(resetAll());
    }

    /**
     * refresh the page each secondes
     * if pause is true then break the refresh
     */
    useEffect(() => {
        var interval;
        if(!pause){
            interval = setInterval(() => {
                setRefresh(!refresh);
                }, 100);
        }
        return () => clearInterval(interval);
    }, [refresh, pause]);
    
  return (
    <>
    <LinearGradient colors={['#BBDBE4', '#EBF4F8']}  style={styles.container}>
        <View style={styles.boxCountdown}>
            <Image style={styles.countdown} source={require('../../assets/imageTimer/circle.png')} />
            <Text style={styles.Timer}>{ timed ? countdown(timed) : '00 : 00 : 00' }</Text>
        </View>
        <View style={!changeBtn ? styles.boxBtn : styles.boxBtnChange}>
        {/* button add an alarm => open modal */}
            {!changeBtn?
            <>
            <TouchableOpacity onPress={()=>modalOpenClose()}>
                <LinearGradient colors={['#88AEC1', '#85B8C8', '#D5E4EB']} style={styles.addBtn}>
                    <Image style={styles.plus} source={require('../../assets/imageAlarme/plus.png')} />
                    <Text style={styles.addText}> TIMER</Text>
                </LinearGradient>
            </TouchableOpacity>
            </>
            :
            <>
            <TouchableOpacity onPress={()=>pauseTime()}>
                <LinearGradient colors={['#A5C188', '#70C879', 'rgba(255, 255, 255, 0.2)']} style={styles.btnPauseAndDelete}>
                    <Text style={styles.pauseAndDelete}> { !pause ? 'PAUSE' : 'RESUME'}</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>deleteMdal()}>
                <LinearGradient colors={['#C18888', '#C87070',  'rgba(255, 255, 255, 0.2)']} style={styles.btnPauseAndDelete}>
                    <Text style={styles.pauseAndDelete}> DELETE</Text>
                </LinearGradient>
            </TouchableOpacity>
            </>
            }
        </View>
        <View style={styles.boxImage}>
            <Image style={styles.robotTimer} source={require('../../assets/imageTimer/robotTimer.png')} />
        </View>
    </LinearGradient>

    {/* modal content */}
    {modal && (
    <BlurView intensity={30} style={styles.modalAdd}>
        {/* button close modal */}
        <TouchableOpacity onPress={()=>modalOpenClose()} style={styles.xMarkPosition}>
            <Image style={styles.xMark} source={require('../../assets/imageAlarme/xMark.png')} />
        </TouchableOpacity>
        {/* first modal => hour */}
        {modalHour&&(
        <DataPicker 
            style={styles.dataPicker}
            mode='time'
            minuteInterval={1}
            onTimeChange={ selectedTime => {setTime(selectedTime) }}
        />
        )}
        {/* second modal => Text */}
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
            <TouchableOpacity onPress={addTimerToReducer}>
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
        // backgroundColor:'#000',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection: 'column',
    },
    boxCountdown:{
        height: '50%',
        width: '100%',
        // backgroundColor: 'red',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    countdown:{
        height:'60%',
        width:'60%',
        marginTop:'15%',
        position:'absolute',
        zIndex:10,
    },
    robotTimer:{
        height:'80%',
        width:'60%',
        zIndex:10,
    },
    Timer:{
        fontSize: 40,
        color: '#fff',
        fontFamily :'DS-DIGI',
    },
    boxBtn:{
        height: '15%',
        width: '100%',
        // backgroundColor: 'green',
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        zIndex:1,
    },
    boxBtnChange:{
        height: '15%',
        width: '80%',
        // backgroundColor: 'green',
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        zIndex:1,
    },
    boxImage:{
        height: '35%',
        width: '100%',
        // backgroundColor: 'red',
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-end'
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
    addBtn:{
        width: 200,
        height: 62,
        borderRadius: 5,
        display :'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    },
    btnPauseAndDelete:{
        width: 130,
        height: 48,
        borderRadius: 7,
        display :'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    },
    addText:{
        fontSize: 38,
        textTransform :'uppercase',
        color:'#fff',
        fontFamily :'DS-DIGI',
        marginLeft : '3%',
    },
    pauseAndDelete:{
        fontSize: 28,
        textTransform :'uppercase',
        color:'#fff',
        fontFamily :'DS-DIGI',
    },
    plus:{
        height:30,
        width:30,
    },
});
