import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';
import Navbar2 from '../components/Nav2';
import StarReview from '../components/starReview';

const Detail = ({ route }) => {
  const commentsRef = firebase.firestore().collection('Comments');
  const [textDetail, onChangeDetailText] = useState(
    route.params.item.detail
  );
  const navigation = useNavigation();
  const {userData} = route.params;

  const updateComments = () => {
    if (textDetail && textDetail.length > 0) {
      commentsRef
        .doc(route.params.item.id)
        .update({
          detail: textDetail,
        })
        .then(() => {
          alert('update successs!!');
          navigation.navigate('MyReview', { userData});
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
   <SafeAreaView style={{ flex: 1 }}>
    <Navbar2 />
    <View style={styles.container}>
 
      <Text style={styles.headText}>แก้ไขรีวิว</Text>
      <View style={{alignItems: 'center'}}>
        <View style={styles.rectangle}>
          <StarReview />
          <TextInput
              style={styles.editcomment}
              placeholder="Update your review" 
              placeholderTextColor="black" 
              onChangeText={onChangeDetailText}
              value={textDetail}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              textAlign="center"
              textAlignVertical="center"
            />
          <TouchableOpacity style={styles.updateButton} onPress={updateComments}>
            <Text style={{color: 'white', fontSize: 16, textAlign: 'center',}}>UPDATE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('MyReview', { userData})}>
            <Text style={{color: '#27005D', fontSize: 16, textAlign: 'center',}}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#27005D',
    justifyContent: 'center',

  },
  headText: {
    fontSize: 36,
    color: 'white',
    textAlign: 'center',
    marginTop: 30,
    fontWeight: 'bold',
    padding: 10,
    marginBottom: 20,
  },
 
  rectangle: {
    borderRadius: 39,
    marginBottom:70,
    padding:24,
    alignItems: 'center',
    width: '80%', 
    backgroundColor: '#FFFFFF',
  },
    
  editcomment: {
    height:100,
    width: 200,
    alignSelf: 'center', 
    backgroundColor: '#AED2FF',
    borderRadius: 20,
    justifyContent: 'center',
    marginBottom:20,
    marginTop:15,

  },
  updateButton: {
    backgroundColor: '#27005D', 
    borderRadius: 20,
    padding: 10,
    marginBottom:20,
    width:'60%',
  },
  backButton: {
    backgroundColor: 'White', 
    borderRadius: 20, 
    padding: 10,
    marginBottom:20,
    width:'60%',
    borderColor:'#27005D',
    borderWidth: 1.5,
     
  },
 
 
});

export default Detail;
