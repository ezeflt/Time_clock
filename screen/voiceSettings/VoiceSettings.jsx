import React, { Fragment } from 'react';
import { useEffect , useState} from 'react';
import { Image, StyleSheet, View , Text, TouchableOpacity, KeyboardAvoidingView, TextInput,ScrollView} from 'react-native';
import {requireFont} from '../../dataApp/HomePage/Home';
import { voiceData } from '../../dataApp/VoiceSettings/VoiceSettings';
import {textToSpeech} from '../../dataApp/HomePage/Home';
import { useDispatch , useSelector} from 'react-redux';
import { addVoice } from '../../reducers/voiceSettings';

export default function VoiceSettings(props){

    const [clickedIndex, setClickedIndex] = useState(null);

    // initialise dispatch
    const dispatch = useDispatch();

    // get voice value from storage
    const voiceStorage = useSelector((state)=>state.voiceSettings.value);

    const handleBoxClick = async(index, data) => {

        await dispatch(addVoice(data));
        await setClickedIndex(index);
        await textToSpeech('regarde il fait beau aujourd\'hui',index);
        await console.log('brrrrr',voiceStorage);
      };
      
    //load font for text
    requireFont();

    const voice = voiceData.map((data, i)=>{
        const isClicked = clickedIndex === i;
        return(
            <TouchableOpacity key={i} onPress={() => handleBoxClick(i, data)}>
                <View style={[styles.voiceBox, isClicked && styles.clickedBox]}>
                    <Text style={styles.voiceText}>Voice {i+1}</Text>
                    <Image style={styles.soundImage} source={require('../../assets/voiceImage/soundOn.png')} />
                </View>
            </TouchableOpacity>
        )
    })
    
    return(
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <Text style={styles.h1}>Voice Settings</Text>
                {voice}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        width : '100%',
        display:'flex',
        alignItems:'center'
    },
    scrollView:{
        flex:1,
        // backgroundColor:'#000',
        width : '80%'
    },
    h1:{
        fontFamily :'DS-DIGI',
        color:'#2A88A6',
        fontSize: 25,
        marginTop: '25%'
    },
    voiceBox:{
        height:50,
        width:'100%',
        backgroundColor:'#F3F8FA',
        marginTop: '15%',
        borderRadius:10,
        display :'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    clickedBox:{
        height:50,
        width:'100%',
        backgroundColor:'#ADE1F5',
        marginTop: '15%',
        borderRadius:10,
        display :'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    soundImage:{
        height: 25,
        width:  25,
        marginRight: '10%'
    },
    voiceText:{
        fontSize: 24,
        marginLeft: '10%',
        fontFamily :'DS-DIGI',
        color:'#2A88A6',
    },
})