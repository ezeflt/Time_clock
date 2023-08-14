import React, { useState } from 'react';
import { useEffect } from 'react';
import { Image, StyleSheet, View , Text, ImageBackground, ScrollView, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import {transformHourToDate,countdown} from '../../../dataApp/AlarmPage/calculAlarm';
import { removeAlarm } from '../../../reducers/alarm';
import { Vibration } from 'react-native';
import {textToSpeech} from '../../../dataApp/HomePage/Home';

export default function HomePage(props){

    const [ringer, setRinger] = useState(false);  // activates, deactivates the ringer with hook state
    const dispatch = useDispatch(); // initialise dispatch
    
    return(
        <View style={styles.boxAlarm}>
            <View style={styles.boxIndex}>
                <Text style={styles.index}>0{props.index}</Text>
            </View>
            <LinearGradient colors={['#073C4B', '#99B6C1']} style={styles.alarm}>
                <View style={styles.alarm}>
                    <View style={styles.header}>
                        <Text style={styles.textAlarm}>User</Text>
                        <Text style={styles.textAlarm} >Alarm</Text>
                    </View>
                    <View style={styles.houreAlarm}>
                        <Text style={styles.textAlarmHoure}>{props.hour}</Text>
                        <Text style={styles.textAlarmHoure} >-</Text>
                        <Text style={styles.textAlarmHoure} >
                            {/* if countdown = 0:0:0, display 0:0:0 to avoid display a negative countdown */}
                            {countdown(props.date)=='0 : 0 : 0'?'0 : 0 : 0':countdown(props.date)}
                        </Text>
                    </View>
                    <View style={styles.houreAlarmDate}>
                        <Text style={styles.textAlarmDate} >Day : </Text>
                        <Text style={styles.textAlarmDate} >every day</Text>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.boxLogoHoure}>
                <Image style={styles.logoHorloge} source={require('../../../assets/imageHomePage/logoHorloge.png')} />
            </View>
            <View style={styles.boxDelete}>
                <TouchableOpacity onPress={()=>{dispatch(removeAlarm(props.hour)), setRinger(false), console.log(ringer);}}>
                    <Image style={styles.deleteAlarm} source={require('../../../assets/imageHomePage/delete.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    boxAlarms:{
        width : '95%',
        // marginTop: 30,
        // display: 'flex',
        // flexDirection:'row',
        // borderColor: '#fff',
        // borderWidth: 1,
    },
    boxAlarm:{
        height: 150,
        width : '100%',
        // backgroundColor: 'yellow',
        alignItems:'center',
        display: 'flex',
        flexDirection:'row',
        marginLeft: -0,
        zIndex: 2,
    },
    boxIndex:{
        height: 45,
        width: 45,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    index:{
        fontSize: 40,
        color: 'rgba(28, 98, 120, 1)',
        fontFamily :'DS-DIGI',
        textShadowColor: '#82ACB9',
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 3,
    },
    alarm:{
        height: 120,
        width: 280,
        // backgroundColor: 'blue',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
        borderRadius: 10,
    },
    boxLogoHoure:{
        position: 'absolute',
        height: 40,
        width: 40,
        backgroundColor: 'rgba(0,0,0,0)',
        right: 0,
        zIndex: 10,
        marginRight: '18%',
    },
    logoHorloge:{
        height: '100%',
        width : '100%',
        opacity: 0.2,
        transform: [{ rotate: '-120deg' }], // Passez la propriété de transformation sous forme de tableau
    },
    header:{
        width: '90%',
        height: 25,
        // backgroundColor: 'red',
        display: 'flex',
        alignItems: 'center',
        justifyContent : 'space-between',
        flexDirection:'row'
    },
    textAlarm:{
        color : '#fff',
        fontFamily :'DS-DIGI',
        textShadowColor: '#82ACB9',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
        fontSize: 15,
    },
    textAlarmHoure:{
        color : '#fff',
        fontFamily :'DS-DIGI',
        textShadowColor: '#82ACB9',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
        fontSize: 27,
    },
    textAlarmDate:{
        color : '#fff',
        fontFamily :'DS-DIGI',
        textShadowColor: '#82ACB9',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
        fontSize: 17,
    },
    houreAlarm:{
        width: '80%',
        height: 29,
        // backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent : 'space-between',
        flexDirection:'row',
        marginRight: 20,
    },
    houreAlarmDate:{
        width: '50%',
        height: 25,
        // backgroundColor: 'green',
        display: 'flex',
        alignItems: 'center',
        justifyContent : 'space-between',
        flexDirection:'row',
        marginRight: 90,
    },

    boxDelete:{
        position: 'absolute',
        right: 0,
        height: '100%',
        width : 40,
        display : 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteAlarm:{
        height : 40,
        width: 40,
    },
});