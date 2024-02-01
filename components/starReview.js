import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function StarReview() {
  const [defaultRating, setDefaultRating] = useState(2);
  const maxRating = 5;
  const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
  const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';

  const CustomRatingBar = () => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          activeOpacity={0.7}
          onPress={() => setDefaultRating(i)}>
          <Image
            style={styles.starImgStyle}
            source={
              i <= defaultRating
                ? { uri: starImgFilled }
                : { uri: starImgCorner }
            }
          />
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.customRatingBarStyle}>
        {stars}
      </View>
    );
  }

  return (
    <View >
      <Text style={{textAlign: 'center'}}>
        <CustomRatingBar /> {defaultRating + ' / ' + maxRating}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
 
  customRatingBarStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starImgStyle: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
});
