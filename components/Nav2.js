import React from 'react';
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';




  const Navbar2 = () => {
  
  return (
    <SafeAreaView >
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Image
            style={styles.logopsu}
            source={require('../assets/black-logo.png')}
          />
          
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
 
    alignItems: 'center',
    paddingHorizontal: 3,
    paddingVertical: 10,
    paddingTop:30,
  },
  logopsu: {
    height: 35,
    width: 160,
   
  },
 
});

export default Navbar2;
