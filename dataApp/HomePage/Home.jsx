import {useFonts} from 'expo-font';
import { useEffect, useState } from 'react';
import * as Speech from 'expo-speech';
import * as SplashScreen from 'expo-splash-screen';
import { voiceData } from '../VoiceSettings/VoiceSettings';

/**
 * Description :
 * load the font
 * 
 */
function requireFont(){

    // GET the font DS-DIGI
    const [fontsLoaded] = useFonts ({
        'DS-DIGI': require('../../assets/fonts/DS-DIGI.ttf')
    });
    
    // prepare the font 
    useEffect(()=>{
        async function prepare(){
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    },[fontsLoaded])

    // if font is loaded then load the font else show ( the font doesn't exists )
    fontsLoaded ? fontsLoaded : console.log('the font doesn\'t exists'); ;
}

/**
 * Description :
 * GET current hour (hours, minutes, seconds)
 * 
 * @return current hour, minutes, seconds
 */
function houreToday(){

    // current date 
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // every second, update currentTime
        const interval = setInterval(() => { setCurrentTime(new Date()) }, 1000);
        // clear the interval
        return () => clearInterval(interval);
    }, []);

    const hours = currentTime.getHours();     // Store the current hour
    const minutes = currentTime.getMinutes(); // Store the current Minutes
    const seconds = currentTime.getSeconds(); // Store the current Seconds

    // return current hour
    return `${hours} : ${minutes} : ${seconds}`
}


/**
 * Description :
 * pronounces the text
 * 
 * @param {string} text is the text
 * @param {number} index is used to find the voice to voice array
 */
const pronouncesText = (text, index) => {

      // check if the text haves data
      if(text){
        // create the speech option
        const option = {
          voice: index ? voiceData[index] : 'com.apple.ttsbundle.Thomas-compact',
          speech: 1,
          rate: 1.1
        };
        // pronounces the text
        Speech.speak(text, option);

        const voices = Speech.getAvailableVoicesAsync();
      }else{
        console.log('the world doesn\'t exists');
      }
};

// export functions of this page
module.exports = { requireFont ,houreToday, pronouncesText};
