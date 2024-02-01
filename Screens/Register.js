import React, { useState, useEffect } from 'react';
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

const Register = () => {
  const [signin, setSignin] = useState([]);
  const signinRef = firebase.firestore().collection('Student');
  const [addUsername, setAddUsername] = useState('');
  const [addFirstname, setAddFirstname] = useState('');
  const [addLastname, setAddLastname] = useState('');
  const [addPassword, setAddPassword] = useState('');
  const navigation = useNavigation();
  

  // fetch or read the data from firestore
  useEffect(() => {
    signinRef.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
      const signin = [];
      querySnapshot.forEach((doc) => {
        const { username,name,lastname,password } = doc.data();
       signin.push({
          id: doc.id,
          username,
          name,
          lastname,
          password,
        
        });
      });
      setSignin(signin);
      //console.log(users)
    });
  }, []);

  // add a user
  const addAccount = () => {
    // check if we have a user.
    if (addUsername && addUsername.length > 0 && addFirstname && addFirstname.length >0 &&
        addLastname && addLastname.length > 0 && addPassword && addPassword.length >0
    ) {
      // get the timestamp
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        username: addUsername,
        name:addFirstname,
        lastname: addLastname,
        password: addPassword,
        createdAt: timestamp,
      };
      signinRef
        .add(data)
        .then(() => {
          // release user state
          setAddUsername('');
          setAddFirstname('');
          setAddLastname('');
          setAddPassword('');
          // release keyboard
          Keyboard.dismiss();
          alert('Register successfully');
          navigation.navigate('Login');
        })
        .catch((error) => {
          // show an alert in case of error
          alert(error);
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/white-logo.png')}/> 
    <View style={{borderRadius: 15,backgroundColor: 'white',width:'85%',marginLeft:20}}>
    <Text style={{textAlign: 'center', padding:10,fontSize:30,fontWeight:'Blod'}}>REGISTER</Text>
    <Text style={{marginLeft:10, padding:10,fontSize:14,color:'#27005D',textAlign:'center'}}>Register to get started !!</Text>
      
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
        onChangeText={(name) => setAddFirstname(name)}
        value={addFirstname}
        placeholder="Firstname"
        placeholderTextColor="Black" 
        underlineColorAndroid="transparent" 
        autoCapitalize="none"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={(lastname) => setAddLastname(lastname)}
        value={addLastname}
        placeholder="Lastname"
        placeholderTextColor="Black"
        underlineColorAndroid="transparent" 
        autoCapitalize="none"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={(password) => setAddPassword(password)}
        value={addPassword}
        placeholder="Password"
        placeholderTextColor="Black" 
        underlineColorAndroid="transparent" 
        autoCapitalize="none"
        secureTextEntry={true}
      />
        <TouchableOpacity style={styles.button} onPress={addAccount}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Login')}>
      <Text style={styles.buttonText2} >BACK TO LOG IN</Text>
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
    marginBottom:20,
    width:'60%',
  },
  buttonText: {
    color: 'white', 
    fontSize: 16, 
    textAlign: 'center',
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
    fontSize: 14, // ขนาดตัวอักษรของข้อความ
    textAlign: 'center', // การจัดข้อความในปุ่ม
  },

});

export default Register;
