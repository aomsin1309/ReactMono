import React, {useState} from 'react';
import {View, Text, Button, Alert, StyleSheet, TextInput, Image} from 'react-native';
import Color from '../constants/color'
import {firedb} from '../components/firebase'
import {auth} from '../components/firebase'

var highscore =89
var BP
function storeHR(userId,Type,BP_value){
    firedb.ref('uid/'+userId).set(Type+{ BP_value});
    firedb.ref('uid/'+userId).update({Sys: BP_value});
  }

function setupHighscoreListener(userId) {
  firedb.ref('uid/'+userId).on('value',(snapshot) =>{
    BP = snapshot.val().BP_value;
    
  });
}


const Fillin = props => {
  const signout = e => {
    auth.signOut().then(()=>{
      props.onLogout();
     // Alert.alert('logout succussful','Please check spelling or register new account' , [{text:'Okay',style: 'destructive'}])
  }).catch(()=>{
      Alert.alert('logout unsuccussful','Please check spelling or register new account' , [{text:'Okay',style: 'destructive'}])
  })
  }
    const [Highscore,setHighscore] = useState();
    const [BP_Value,setBP] = useState();
    return (
        <View style={styles.screen}>
            <Text>{props.uid_ID}</Text>
          <Button title = 'plus1' onPress = {()=>storeHR(props.uid_ID,'Hello',highscore)} /> 
          <Button title = 'test' onPress = {()=>{
            setupHighscoreListener(props.uid_ID);
            setBP(BP);
            }} />
          <Button title = 'update' onPress ={()=>{setHighscore(highscore)}} />
          <Button title = 'signout' onPress = {signout} />
          <Button title = 'Back' onPress = {()=>{}} />
          <Text>{Highscore}</Text>
          <Text>{BP_Value}</Text>
        </View>
      );
};

const styles = StyleSheet.create({
    screen: {
      flex: 1
    }
  });
export default Fillin;