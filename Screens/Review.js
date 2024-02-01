import React,{useState,useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  Keyboard,
  Image,
} from 'react-native';
import Navbar2 from '../components/Nav2';
import { useNavigation,useRoute } from '@react-navigation/native';
import { firebase } from '../config';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarReview from '../components/starReview';


const Review= ({route}) => {
 const [addComment, setAddComment] = useState('');
 const reviewRef = firebase.firestore().collection('Comments');
 const [allReview, setAllReview] = useState([]);
const { selectedSubjectData, allSubjectData,userData,subjectCode } = route.params;

const gotoHomeWdata = () => {
  navigation.navigate('Home', { userData });
};

const navigation = useNavigation();

const addNewComment = () => {
  
    if (addComment && addComment.length > 0 ) {
      const data = {
        cid: selectedSubjectData.cid,
        detail:addComment,
        username: userData.username,
        
      };
      reviewRef
        .add(data)
        .then(() => {
          setAddComment('');
          Keyboard.dismiss();
          setAllReview((prevReviews) => [data, ...prevReviews]);
          alert('Add comment success!!!');
          console.log('insert comment success')
          
        })
        .catch((error) => {
          
          alert(error);
        });
    }else{
      console.log('ไม่สามารถเพิ่มข้อมูลได้');
    }
  };
  useEffect(() => {
    reviewRef
    .where('cid','==',subjectCode)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty){
        const allReviewData = querySnapshot.docs.map((doc) => doc.data());
       setAllReview(allReviewData); 
      } else{
        setAllReview([]);
        Alert.alert('No review found','Please try again later.');

      }
    })
    .catch((error) => {
      console.error('Error fetching review:',error);
    });
  },[]);
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
     <Navbar2  style={{marginBottom: 20}} />
      <View style={styles.container}>
      <View style={{alignItems:'center'}}>
      <View style ={styles.subjectHead}>
        <Text>{selectedSubjectData.cid}</Text>
        <Text>{selectedSubjectData.name}</Text>
      </View>
      </View>
      <View style = {{alignItems: 'center'}}>
      <Text style = {{textAlign: 'center', color: 'white', fontSize: 32, fontWeight: 'bold',padding:30}}>REVIEW</Text>
      
     
       <FlatList 
       style = {{alignItems: 'center'}}
      data={allReview}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
       
        <View style = {styles.commentBox}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="user-circle" size={20} color="black" style={{paddingTop: 10,paddingRight: 10}} />
        <Text style={{paddingTop: 10, textAlign: 'left',}} >
        {item.username}</Text>
        </View>
        <Text style={{paddingBottom: 15, textAlign: 'left',}} >
        {item.detail}</Text>
        </View>
      )}
      />

      <View style={styles.inputContainer}>
      
        <StarReview />
        <View style={{flexDirection: 'row',alignItems: 'center',}}>
        <TextInput 
      style={styles.textInput}
        onChangeText={(comment) => setAddComment(comment)}
        value={addComment}
        placeholder="Write your review"
        placeholderTextColor="#8F8F8F" 
        underlineColorAndroid="transparent" 
        /> 
        <TouchableOpacity onPress={addNewComment}>
      <Icon name="chevron-right" size={30} color="black" />
    </TouchableOpacity>
    </View>
    </View>
      
        <TouchableOpacity style={styles.button} onPress={gotoHomeWdata}>
          <Icon name="home" size={30} color="black" />
        </TouchableOpacity>
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

  },
  subjectHead: {
    height: 70,
    marginTop:20,
    padding: 15,
    backgroundColor: '#E4F1FF',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%'
   
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  textInput: {
    width: '80%', 
    padding: 10, 
    backgroundColor: '#E4F1FF', 
    borderWidth: 0, 
    borderRadius: 10, 
    justifyContent: 'center',
    marginRight:10,
    marginBottom:10,
    marginTop: 10,
    paddingTop:20,
  },
  commentBox:{
    backgroundColor: '#E4F1FF',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    fontSize: 16,
    height: 70,
    width: '80%',
    justifyContent: 'center',
    
    
  },
  inputContainer: {
    backgroundColor: '#E4F1FF',
    borderRadius: 15,
    marginTop: 50,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    padding : 20,
    alignItems: 'center',
    
  },
 

});

export default Review;
