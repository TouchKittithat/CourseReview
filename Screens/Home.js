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
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from '../components/Nav';
import { useNavigation,useRoute } from '@react-navigation/native';
import { firebase } from '../config';



const Home= () => {
  const [subject, setSubject] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const subjectsRef = firebase.firestore().collection('Course');
  const [allSubject, setAllSubject] = useState([]);

  const route = useRoute();
  const userData = route.params?.userData;
  const navigation = useNavigation();
  const openProfile = () => {
  navigation.navigate('Profile', { userData });
};

  const handleCardClick = (selectedSubject) => {
    navigation.navigate('Review',{
      selectedSubjectData: selectedSubject,
      allSubjectData: allSubject,
      subjectCode: selectedSubject.cid,
      userData: userData,
      
    });
  };
  useEffect(() => {
    subjectsRef
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty){
        const allSubjectData = querySnapshot.docs.map((doc) => doc.data());
       setAllSubject(allSubjectData); 
      } else{
        setAllSubject([]);
        Alert.alert('No subject found','Please try again later.');

      }
    })
    .catch((error) => {
      console.error('Error fetching subjects:',error);
    });
  },[]);

  const handleSearch = () => {
    subjectsRef
      .where('name', '==', subject)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const results = querySnapshot.docs.map((doc) => doc.data());
          setSearchResults(results);
          console.log('found');
        } else {
          setSearchResults([]);
          Alert.alert('No results found', 'Please try a different subject.');
          console.log('not found');
        }
      })
      .catch((error) => {
        console.error('Error searching for subjects:', error);
      });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
      <Navbar openProfile={openProfile} />
      <View style={styles.inputContainer}>
      
      <TextInput
            style={styles.input}
            placeholder="Search for a subject"
            onChangeText={(text) => setSubject(text)}
            value={subject}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholderTextColor="#27005D"
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
      <Icon name="search" size={20} color="#27005D"  />
      </TouchableOpacity>
          
     
      </View>
  
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
            <TouchableOpacity onPress={() => handleCardClick(item)}>
            <Text style={styles.resultText}>{item.cid}-{item.name}</Text>
            </TouchableOpacity>
              
            </View>
          )}
        />
        <FlatList 
      data={allSubject}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({item}) => (
        <TouchableOpacity 
        style={styles.subjectButton}
        onPress={() => handleCardClick(item)}>
        <Text style={styles.subjectText}>
        {item.cid}
        </Text>
        <Text style={styles.subjectText}>
        {item.name}
        </Text>
        </TouchableOpacity>
      )}
      />
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 50,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    
  },
  subjectButton: {
    flex: 1,
    margin: 10,
    padding: 15,
    backgroundColor: '#E4F1FF',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27005D',
    textAlign: 'center',
  },
 
  input: {
    flex: 1,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
    color: '#000',
    width: '80%'
  },
  searchButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft:60,
    width: '30%',
    height: '50%'
  },

  resultItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    opacity: 0.88,
    justifyContent: 'center',
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
