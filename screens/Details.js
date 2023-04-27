import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';

import {getMovie, imageUrl} from '../services/services';
import Error from '../components/Error';
import PlayButton from '../components/PlayButton';
import Video from '../components/Video';
import Colors from '../theme/Colors';

const placeholderImage = require('../assets/images/poster-placeholder.png');
const height = Dimensions.get('screen').height;

const Details = ({route}) => {
  const {movieId} = route.params;
  const [movieDetails, setMovieDetails] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const toggleShowVideoModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    getMovie(movieId)
      .then(movieData => {
        setMovieDetails(movieData);
      })
      .catch(err => setError(err))
      .finally(() => setLoaded(true));
  }, [movieId]);
  return (
    <>
      {loaded && !error && (
        <>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                movieDetails.poster_path
                  ? {uri: `${imageUrl}${movieDetails.poster_path}`}
                  : placeholderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={toggleShowVideoModal} />
              </View>
              <Text style={styles.title}>{movieDetails.title}</Text>
              {movieDetails?.genres && (
                <View style={styles.genresContainer}>
                  {movieDetails.genres.map(genre => {
                    return (
                      <Text key={genre.id} style={styles.genre}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <StarRating
                maxStars={5}
                starSize={25}
                rating={movieDetails.vote_average / 2}
                fullStarColor={Colors.rating}
                emptyStarColor={Colors.rating}
                disabled={true}
              />
              <Text style={styles.overview}>{movieDetails.overview}</Text>
              <Text style={styles.release}>{`Release date: ${dateFormat(
                movieDetails.release_date,
                'dS mmmm, yyyy',
              )}`}</Text>
            </View>
          </ScrollView>
          <Modal
            animationType="slide"
            visible={modalVisible}
            supportedOrientations={['portrait', 'landscape']}>
            <View style={styles.videoModal}>
              <Video onClose={toggleShowVideoModal} />
            </View>
          </Modal>
        </>
      )}
      {!loaded && <ActivityIndicator size="large" />}
      {error && (
        <Error
          errorText1="Oops! Something went wrong"
          errorText2="Make sure you are online and restart the application"
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height / 1.7,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  genresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  genre: {
    fontWeight: 'bold',
  },
  overview: {
    padding: 15,
  },
  release: {
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -30,
    right: 10,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Details;
