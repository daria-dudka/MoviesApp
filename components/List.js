import React, {memo} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Card from './Card';

const List = ({title, content, navigation}) => {
  return (
    <View style={styles.list}>
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View>
        <FlatList
          data={content}
          renderItem={({item}) => <Card navigation={navigation} item={item} />}
          keyExtractor={item => item.id}
          horizontal
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 25,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    paddingBottom: 15,
  },
});

export default memo(List);
