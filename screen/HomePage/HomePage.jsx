import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View , Text, ImageBackground, ScrollView, TouchableOpacity} from 'react-native';
import {requireFont, houreToday, pronouncesText} from '../../dataApp/HomePage/Home';
import { useSelector } from 'react-redux';
import {countdown} from '../../dataApp/AlarmPage/calculAlarm';
import Alarm from './Alarm/Alarm';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Vibration } from 'react-native';

export default function HomePage({ navigation }){

    const dataAlarm = useSelector((state)=>state.alarm.value);  // GET data of alarm local storage

    const houre = houreToday();  // GET hour today, each secondes

    const [textSpeech, setTextSpeech] = useState('');  // state to hold the text that will be pronounced by pronouncesText

    const [ringer, setRinger] = useState(false);  // state to activate or deactivate the ringer with boolean

    requireFont();  //load font for text

    // JSX tag, button add alarm to navigate to alarm page
    const btnRedirectToAddAlarm = (
        <TouchableOpacity style={styles.btnChangePage} onPress={()=>navigation.navigate('ALARMS')} >
            <Text>Add Alarm</Text>
        </TouchableOpacity>
    );

    // loop in alarm data array and sends data to the child component with (props)
    const alarms = dataAlarm.map((data, i)=> { return <Alarm index={i+1} hour={data.hour} date={data.date} /> });


// Effect hook that runs when the component is mounted or when dataAlarm and ringer are updated
useEffect(() => {
    // Set up an interval to execute the following functions every second
    const interval = setInterval(() => {
        // Loop through alarm data
        dataAlarm.map((data) => {
            // Check if the countdown value is 0:0:0
            if (countdown(data.date) === '0 : 0 : 0') {
                // Set the text to be pronounced
                setTextSpeech(data.text);

                // Activate the ringer for vibration
                setRinger(true);

                // If ringer is false, clear the interval
                !ringer && clearInterval(interval);
            }

            // If ringer is true, pronounce the text
            ringer && pronouncesText(textSpeech);
        });

        // Activate vibration if the ringer is true, else cancel it
        ringer ? Vibration.vibrate(200) : Vibration.cancel();
    }, 1000);

    // Clear the interval when the component is unmounted or when dataAlarm and ringer are updated
    return () => clearInterval(interval);
}, [dataAlarm, ringer]);


    return(
        <View style={styles.container}>
            {ringer&&(
            <BlurView intensity={50} style={styles.desactiveAlarm}>
                <TouchableOpacity onPress={()=>setRinger(false)}>
                    <LinearGradient colors={['#eb5a5a', '#f0c1c1']}  style={styles.StopBtn}>
                        <Image style={styles.StopBtnIcon} source={require('../../assets/imageHomePage/stop.png')} />
                        <Text style={styles.StopBtnText}> Stop the alarm</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </BlurView>
            )}
            <ImageBackground resizeMode="cover" style={styles.bakcgroundImage} source={require('../../assets/chargementPage/BackgroundHome.png')} >
                <Text style={styles.h1}>Clock</Text>
                <View style={styles.boxHoureToday}>
                    <Text style={styles.houreToday}>{houre}</Text>
                </View>
                <Text style={styles.h4}>My next alarms</Text>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.boxAlarmes}>
                    {/* if data Alarm array == 0 return button redirect to AddAlarm else return my alarms */}
                    { dataAlarm.length == 0 ? btnRedirectToAddAlarm : alarms }
                </ScrollView>
                <View pointerEvents='none' style={styles.boxAndroid}>
                    <Image style={styles.android} source={require('../../assets/imageHomePage/Android.png')} />
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#A9CBD6',
    },
    bakcgroundImage:{
        position:'absolute',
        height:'100%',
        width:'100%',
        zIndex:1,
        flex:1,
        alignItems:'center',
        justifyContent:'start',
        flexDirection:'column'
    },
    h1:{
        color: 'rgba(42, 136, 166, 1)',
        fontSize: 70,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '10%',
        marginBottom: '10%',
        fontFamily :'DS-DIGI',
        textTransform :'uppercase',
        textShadowColor: '#325F6E', // Ombre noire
        textShadowOffset: { width: 3.5, height: 3.5 }, // Décalage de l'ombre
        textShadowRadius: 3, // Rayon de l'ombre
    },
    boxHoureToday:{
        height :'10%',
        width : '70%',
        borderWidth : 2,
        borderColor : '#77AABA',
        borderRadius : 10,
        margin: 'auto',
        backgroundColor: 'rgba(217,217,217, 0.2)',
        alignItems:'center',
        justifyContent: 'center',
        textShadowColor: 'rgba(0,0,0, 0.3)', // Ombre noire
        textShadowOffset: { width: 4, height: 4 }, // Décalage de l'ombre
        textShadowRadius: 3, // Rayon de l'ombre
    },
    houreToday:{
        fontSize: 50,
        color: '#fff',
        fontFamily :'DS-DIGI',
        textShadowColor: 'rgba(0,0,0, 0.3)',
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 3,
    },
    h4:{
        fontSize: 23,
        color: 'rgba(28, 98, 120, 1)',
        fontFamily :'DS-DIGI',
        textShadowColor: '#82ACB9',
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 3,
        marginTop: 50,
        marginRight: 120,

    },
    boxAndroid:{
        height:200,
        width: 200,
        position: 'absolute',
        right: 0,
        bottom: 0,
        // backgroundColor: 'green',
        marginLeft: 500,
    },
    android:{
        height:'100%',
        width: '100%',
    },
    btnChangePage:{
        padding: 30,
        backgroundColor: 'red'
    },
    boxAlarmes:{
        width : '95%',
    },
    desactiveAlarm :{
        position: 'absolute',
        height:'100%',
        width : '100%',
        backgroundColor: 'rgba(255,255,255, 0.5)',
        zIndex : 50,
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center',
        flexDirection:'row'
    },
    StopBtn:{
        width: 274,
        height: 62,
        borderRadius: 10,
        display :'flex',
        alignItems:'center',
        justifyContent:'start',
        flexDirection:'row',
        marginTop:'5%',
    },
    StopBtnText:{
        fontSize: 24,
        textTransform :'uppercase',
        color:'#fff',
        fontFamily :'DS-DIGI',
        marginLeft : '3%',
    },
    StopBtnIcon:{
        height:30,
        width:30,
        marginLeft : '6%',
    },
  })