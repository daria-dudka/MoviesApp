import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {imageUrl} from '../services/services';

const placeholderImage = require('../assets/images/poster-placeholder.png');

const Card = ({item, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Details', {movieId: item.id})}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={
          item.poster_path
            ? {uri: `${imageUrl}${item.poster_path}`}
            : placeholderImage
        }
      />
      {!item.poster_path && <Text style={styles.movieName}>{item.title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
    marginBottom: 10,
  },
  image: {
    width: 120,
    height: 200,
    borderRadius: 20,
  },
  movieName: {
    position: 'absolute',
    width: 100,
    textAlign: 'center',
    top: 20,
  },
});

export default Card;
