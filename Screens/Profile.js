import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
 
} from 'react-native';
import { firebase } from '../config';
import { useNavigation , useRoute} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar2 from '../components/Nav2'
import Icon from 'react-native-vector-icons/FontAwesome';



const Profile = ({route}) => {
  
  const navigation = useNavigation();
  
  const {userData} = route.params;

  const gotoHomeWdata = () => {
  navigation.navigate('Home', { userData });
  };

  const openMyReview = () => {
  navigation.navigate('MyReview', { userData });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <Navbar2 style={{marginBottom: 10}}/>
   <View style ={styles.container}>
   
      <Text style={{ padding:10,fontSize:26,fontWeight:'Blod',color: 'white',marginTop: 40,marginBottom:20,paddingLeft:24,
    paddingRight:24, }}>MY PROFILE</Text>
    <View style={{alignItems:'center'}}>
    <View style={{borderRadius: 15,backgroundColor: '#E4F1FF',width:'90%',marginBottom:70,padding:24,alignItems: 'center'}}>
    <Image style={styles.icon} source={require('../assets/user.png')}/> 

    <Text style={{textAlign: 'center', padding:10,fontSize:24,fontWeight:'Blod'}}>{userData.username}</Text>

    <Text style={{textAlign: 'center', padding:5,fontSize:18,marginBottom:20,}}>{userData.name}   {userData.lastname}</Text>

    <TouchableOpacity onPress={openMyReview}>
      <Text style={{color:'#27005D' ,fontSize: 16,padding: 15,textDecorationLine: 'underline' ,marginBottom: 15}}>ประวัติการรีวิว</Text>
    </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
      <Text style={styles.buttonText}>LOG OUT</Text>
    </TouchableOpacity>
    </View>
    </View>
    <View style={{alignItems:'center'}}>
    <View style={{borderRadius: 75,backgroundColor: 'white',width:50,height: 50,justifyContent: 'center',alignItems: 'center', }}>
    <TouchableOpacity style={styles.buttonHome} onPress={gotoHomeWdata}>
    <Icon name="home" size={30} color="black" />
    </TouchableOpacity>
    </View>
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
   
  },
  icon: {
    height: 95,
    width: 95,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#27005D', 
    borderRadius: 20,
    padding: 10,
   
    marginBottom:20,
    width:'60%',
  },
  buttonText: {
    color: 'white', 
    fontSize: 16, 
    textAlign: 'center',
  },
  buttonHome: {
    backgroundColor: 'white',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  

});

export default Profile;