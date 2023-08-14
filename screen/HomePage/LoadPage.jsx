import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

  export default function LoadPage({ navigation }){
    
    // it's the waiting page

    // after 3 seconds redirects to the home page
    setTimeout(()=>{
      navigation.navigate('TabNavigator');
    },3000);

    
    return(
        <View style={styles.container}>
            <Image style={styles.bakcgroundImage} source={require('../../assets/chargementPage/chargementPage.png')} />
        </View>
    )
  }
  const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'##A9CBD6',
    },
    bakcgroundImage :{
      height : '100%',
      width: '100%',
    }
  })