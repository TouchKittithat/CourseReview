import React from 'react';
import { View, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


  const Navbar = ({openProfile}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView >
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Image
            style={styles.logopsu}
            source={require('../assets/black-logo.png')}
          />
          <TouchableOpacity style={styles.iconContainer} onPress={openProfile}>
            <Icon name="user-circle" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E4F1FF',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 3,
    paddingVertical: 10,
    paddingTop:30,
  },
  logopsu: {
    height: 35,
    width: 160,
   
  },
  iconContainer: {

    padding: 10,
    marginRight: 10,
  },
});

export default Navbar;
