import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {searchMovieTv} from '../services/services';
import Card from '../components/Card';
import Error from '../components/Error';
import Colors from '../theme/Colors';

const Search = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    if (!searchText.trim()) return;

    setIsLoading(true);

    Promise.all([
      searchMovieTv(searchText, 'movie'),
      searchMovieTv(searchText, 'tv'),
    ])
      .then(([movieData, tvData]) =>
        setSearchResults([...movieData, ...tvData]),
      )
      .catch(err => setError(err))
      .finally(() => {
        setIsLoading(false);
        setSearchText('');
      });
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setSearchText(text);
              }}
              value={searchText}
              placeholder="Search Movie or TV"
            />
          </View>
          <TouchableOpacity onPress={onSubmit}>
            <Icon name={'search-outline'} size={30} color={Colors.black} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchItems}>
          {/* Show search results */}
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResults}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          )}

          {/* When searched but no results */}
          {searchResults && searchResults.length == 0 && (
            <View style={styles.empty}>
              <Text>No results matching your criteria</Text>
              <Text>Try different keywords</Text>
            </View>
          )}

          {/* When nothing is searched */}
          {!searchResults && (
            <View style={styles.empty}>
              <Text>Type something to start searching</Text>
            </View>
          )}

          {/* Error */}
          {error && (
            <Error
              errorText1="Oops! Something went wrong"
              errorText2="Make sure you are online and restart the application"
            />
          )}

          {isLoading && <ActivityIndicator size="large" />}
        </View>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
  },
  input: {
    padding: 10,
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderRadius: 15,
  },
  empty: {
    padding: 20,
  },
});

export default Search;
