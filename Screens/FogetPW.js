import React, { useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
 
} from 'react-native';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChangePW = () => {

  const [addUsername, setAddUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
 
  const navigation = useNavigation();

  const checkUsernames = () => {
    const accountRef = firebase.firestore().collection('Student');
    accountRef
      .where('username', '==', addUsername) 
      .get()
      .then((querySnapshot) => {
         if (!querySnapshot.empty) {
           // พบข้อมูลที่ตรงกัน
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            console.log('Found username');
            console.log('User Data:', userData);
            if (newPassword.length > 0 && newPassword === confirm) {
              accountRef
              .doc(doc.id)
              .update({
                password: newPassword,
               })
             .then(() => {
               console.log('Password updated successfully')
               alert('Password updated successfully')
               setAddUsername('');
               setNewPassword('');
               setConfirm('');
               navigation.navigate('Login');
 
              })
      .catch((error) => {
        console.error('Error updating password:', error);
        alert('Error updating password');
      });
           }else{
          console.log('Passwords do not match or are empty');
              alert('Passwords do not match or are empty');
            }
        });
         }else {
    console.log('Username not found');
          alert('Username not found');
          }
    Keyboard.dismiss();
      })
      .catch((error) => {
        console.error('Error searching for username:', error);
        alert('Error searching for username');
      });
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/white-logo.png')}/> 
    <View style={{borderRadius: 15,backgroundColor: 'white',width:'85%',marginLeft:20}}>
    <Text style={{textAlign: 'center', padding:10,fontSize:20,fontWeight:'Blod'}}>Change Password</Text>
    <Text style={{marginLeft:10, padding:10,fontSize:9,color:'#27005D',textAlign:'center'}}>Enter a different password with the previous</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          placeholderTextColor="Black"
          onChangeText={(username) => setAddUsername(username)}
          value={addUsername}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
         <TextInput
        style={styles.textInput}
        onChangeText={(password) => setNewPassword(password)}
        value={newPassword}
        placeholder="New Password"
        secureTextEntry={true} 
        placeholderTextColor="Black" // สีของตัวอักษร placeholder
        underlineColorAndroid="transparent" // ให้ขอบข้างล่างโดนสีใส
      />
      <TextInput
        style={styles.textInput}
        onChangeText={(password) => setConfirm(password)}
        value={confirm}
        placeholder="Comfirm Password"
        secureTextEntry={true} 
        placeholderTextColor="Black" 
        underlineColorAndroid="transparent"
      />
      
        <TouchableOpacity style={styles.button}  onPress={ checkUsernames }>
          <Text style={styles.buttonText}>CHANGE</Text>
        </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{marginLeft:10,marginBottom:10, padding:10,fontSize:14,color:'#27005D',textAlign: 'center'}}>BACK</Text>
      </TouchableOpacity>
     
  
      </View>
      </View>
    </SafeAreaView>

    
  );
};

const styles = StyleSheet.create({
   container: {
     flex:1,
    justifyContent: 'center',
    backgroundColor: '#27005D', 
    padding:24
  },
   logo: {
    height: 128,
    width: 200,
    marginLeft:50,
  },
 
 textInput: {
    width: '80%', 
    padding: 10, 
    backgroundColor: '#AED2FF', 
    borderWidth: 0, 
    borderRadius: 10,
    opacity: 0.56, 
    justifyContent: 'center',
    marginLeft:20,
    marginBottom:10,
  },
 button: {
    backgroundColor: '#27005D', 
    borderRadius: 20, 
    padding: 10,
    marginLeft:50 ,
    width:'60%',
    marginBottom:10,
    marginTop: 20,
    
  },
  buttonText: {
    color: 'white', 
    fontSize: 14, 
    textAlign: 'center', 
  }

});

export default ChangePW;
