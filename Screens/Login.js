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

const Login = () => {
  const [account, setAccount] = useState([]);
  const accountRef = firebase.firestore().collection('Student');
  const [addUsername, setAddUsername] = useState('');
  const [addPassword, setAddPassword] = useState('');
 
  const navigation = useNavigation();


  const checkUsernames = () => {
    const accountRef = firebase.firestore().collection('Student');
    accountRef
      .where('username', '==', addUsername) 
      .where('password', '==', addPassword) 
      .get()
      .then((querySnapshot) => {
         if (!querySnapshot.empty) {

           // พบข้อมูลที่ตรงกัน
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            console.log('User Data:', userData);
            alert('Login successful');
            navigation.navigate('Home',{userData});
            console.log('OK');
          });  
        } else {
          alert('Invalid login, please try again');
          console.log('error');
        }
        setAddUsername('');
        setAddPassword('');
        Keyboard.dismiss();
      })
      .catch((error) => {
        console.error('Error searching for login:', error);
      });
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/white-logo.png')}/> 
    <View style={{borderRadius: 15,backgroundColor: 'white',width:'85%',marginLeft:20}}>
    <Text style={{textAlign: 'center', padding:10,fontSize:30,fontWeight:'Blod'}}>LOG IN</Text>
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
        onChangeText={(password) => setAddPassword(password)}
        value={addPassword}
        placeholder="Password"
        secureTextEntry={true} 
        placeholderTextColor="Black" // สีของตัวอักษร placeholder
        underlineColorAndroid="transparent" // ให้ขอบข้างล่างโดนสีใส
      />
        
      <TouchableOpacity onPress={() => navigation.navigate('ForgetPW')}>
        <Text style={{marginLeft:10,marginBottom:10, padding:10,fontSize:12,color:'#27005D'}}>Forget Password?</Text>
      </TouchableOpacity>
        <TouchableOpacity style={styles.button}  onPress={ checkUsernames }>
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>
        <Text style={{marginLeft:10, padding:10,fontSize:14,color:'#27005D',textAlign:'center'}}>or</Text>
    <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Register')}>
      <Text style={styles.buttonText2} >REGISTER</Text>
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
    backgroundColor: '#27005D', // สีพื้นหลังของปุ่ม
    borderRadius: 20, // ความโค้งของมุมของปุ่ม
    padding: 10,
    marginLeft:50 ,// ระยะห่างของข้อความภายในปุ่ม
    width:'60%',
    
  },
  buttonText: {
    color: 'white', // สีข้อความภายในปุ่ม
    fontSize: 16, // ขนาดตัวอักษรของข้อความ
    textAlign: 'center', // การจัดข้อความในปุ่ม
  },
  button2: {
    backgroundColor: 'White', // สีพื้นหลังของปุ่ม
    borderRadius: 20, // ความโค้งของมุมของปุ่ม
    padding: 10,
    marginLeft:50 ,
    marginBottom:20,
    // ระยะห่างของข้อความภายในปุ่ม
    width:'60%',
    borderColor:'#27005D',
    borderWidth: 1.5,
    
  },
  buttonText2: {
    color: '#27005D', // สีข้อความภายในปุ่ม
    fontSize: 16, // ขนาดตัวอักษรของข้อความ
    textAlign: 'center', // การจัดข้อความในปุ่ม
  },

});

export default Login;
