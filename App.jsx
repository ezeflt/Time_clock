import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//import screen component
import LoadPage from './screen/HomePage/LoadPage';
import HomePage from './screen/HomePage/HomePage';
import Alarm from './screen/addAlarm/AddAlarm';
import Timer from './screen/timerPage/Timer';
import VoiceSettings from './screen/voiceSettings/VoiceSettings'

//import reducer
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import alarm from './reducers/alarm';
import timer from './reducers/timer';
import voiceSettings from './reducers/voiceSettings';

// ignore all logs
import { LogBox } from 'react-native';

export default function App() {

  LogBox.ignoreAllLogs();//Ignore all log notifications
  
  //create store reducer
  const store = configureStore({
    reducer: { user , alarm, timer, voiceSettings},
  });

  // creates a navigation to components
  const Stack = createNativeStackNavigator();

  // navigate from page to page with Tab Navigator
  const Tab = createBottomTabNavigator();

  /**
   * Description :
   * creates a navigation tab to move from page to page
   * 
   * @return return to icons tabs
   */
  const TabNavigator =()=>{
    return(
    <Tab.Navigator screenOptions={({ route }) => ({ 
      
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        // if route name = x return her icon
        if (route.name === 'CLOCK') {
          iconName = 'clock-o';

        } else if (route.name === 'TIMER') {
          iconName = 'hourglass-1';

        }else if (route.name === 'ALARMS') {
          iconName = 'bed';

        }else if (route.name === 'VOICESETTING') {
          iconName = 'gear';
          
        }
        return <FontAwesome name={iconName} size={size} color={color} /> // navigation icon
      },
      
      tabBarActiveTintColor: '#2B7487', // if the icon is selected, it has this color
      tabBarInactiveTintColor: '#19444F', // if the icon is not selected, it has this color
      headerShown: false,
    })}>
      {/* creation of navigation tabs associated with each component */}
      <Tab.Screen name='CLOCK' component={HomePage} /> 
      <Tab.Screen name='TIMER' component={Timer} />
      <Tab.Screen name='ALARMS' component={Alarm} />
      <Tab.Screen name='VOICESETTING' component={VoiceSettings} />
    </Tab.Navigator>

  )}


  return (
    //local storage
    <Provider store={store}> 
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* all components */}
          <Stack.Screen name="LoadPage" component={LoadPage} />
          <Stack.Screen name="VOICESETTING" component={Timer} />
          <Stack.Screen name="TIMER" component={Timer} />
          <Stack.Screen name="AlarmPage" component={Alarm} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

