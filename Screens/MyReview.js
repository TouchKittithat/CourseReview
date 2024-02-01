import React,{useState,useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  Keyboard,

} from 'react-native';
import Navbar2 from '../components/Nav2';
import { useNavigation,useRoute } from '@react-navigation/native';
import { firebase } from '../config';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'; 


const MyReview= ({route}) => {
 const myReviewRef = firebase.firestore().collection('Comments');
 const [allReview, setAllReview] = useState([]);
 const {userData} = route.params;

  const gotoHomeWdata = () => {
    navigation.navigate('Home', { userData });
  };

  const navigation = useNavigation();
    useFocusEffect(
      React.useCallback(() => {
      myReviewRef
      .where('username','==',userData.username)
      .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const allReviewData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllReview(allReviewData);
      } else {
        setAllReview([]);
        Alert.alert('No comments found', 'Please try again later.');
      }
    })
    .catch((error) => {
      console.error('Error fetching comments:', error);
    });
    },[userData])
    );

  const deleteReview = (itemId) => {
  // ต้องใช้ itemId แทน item.id ในการลบข้อมูล
  myReviewRef
    .doc(itemId) // ใช้ itemId ในการอ้างอิงไปยังเอกสารที่ต้องการลบ
    .delete()
    .then(() => {
      // หลังจากลบสำเร็จให้อัพเดท state ของรายการรีวิว
      const updatedReviews = allReview.filter((item) => item.id !== itemId);
      setAllReview(updatedReviews);
      alert('Deleted successfully');
      console.log('Deleted id:', itemId);
    })
    .catch((error) => {
      alert(error);
    });
};


  
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
     <Navbar2  style={{marginBottom: 10}} />
      <View style={styles.container}>
        <Text style={styles.headText}>ประวัติการรีวิว</Text>
        
         <FlatList 
           style = {{alignItems: 'center'}}
           data={allReview}
           keyExtractor={(item) => item.id}
           renderItem={({item}) => (
             <View>
              <TouchableOpacity 
              onPress={() => navigation.navigate('Detail', { item ,userData})}>
                <View style = {styles.inputContainer}>
                
                  <View style = {styles.commentBox}>
                    <Text style={{paddingTop: 5, textAlign: 'center',
                    fontWeight: 'bold',}} >{item.cid}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon name="user-circle" size={20} color="black" 
                      style={{paddingTop: 5,paddingRight: 10}} />
                      <Text style={{paddingTop: 10, textAlign: 'left',}} >
                      {item.username}</Text>
                    </View>
                    <Text style={{paddingBottom: 15, textAlign: 'left',}} >
                    {item.detail}</Text>
    
                  </View>
                  <FontAwesome
                    name="trash-o"
                    color="red"
                    onPress={() => deleteReview(item.id)}
                    style={styles.deleteIcon}
                  />

                </View>
              </TouchableOpacity>
             </View>

           )}
          />
      

        <View style={{alignItems:'center',marginTop: 20}}>
          <View style={{borderRadius: 75,backgroundColor: 'white',
          width:50, height: 50,justifyContent: 'center',alignItems: 'center', }}>
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
    flex: 1,
    backgroundColor: '#27005D',
    justifyContent: 'center',
    alignItems: 'center',

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
 
  buttonHome: {
    backgroundColor: 'white',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  
  commentBox:{
    backgroundColor: '#E4F1FF',
    borderRadius: 10,
    padding: 15,
    margin: 5,
    fontSize: 16,
    height: 90,
    width: '85%',
    justifyContent: 'center',
   
    
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E4F1FF',
    borderRadius: 15,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    padding: 15
    
  },
   deleteIcon: {
    marginTop: 5,
    fontSize: 30,
  
  },
  
 

});

export default MyReview;
