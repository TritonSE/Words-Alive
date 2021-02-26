import React, { useState } from 'react';
import { TextInput, Keyboard, Text, View, StyleSheet } from 'react-native';
import { Book } from '../models/Book';
import { LoadingCircle } from './LoadingCircle';
import { PaginationBookList } from './PaginationBookList';

type SearchProps = { allBooks: Book[], loading: boolean};

/**
 *
 */
export const SearchAllBooks: React.FC<SearchProps> = ({ allBooks, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = searchTerm === '' ? allBooks : allBooks.filter(bookItem => {
    return bookItem.title.toUpperCase().includes(searchTerm.toUpperCase());
  });

  return (

    <View>

      <View style={styles.inputPadding} >
        <TextInput
          style={styles.textInput}
          clearButtonMode="always"
          placeholder="Search for a book by title or author"
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
          onBlur={Keyboard.dismiss}
        />
        <Text>{searchTerm}</Text>
        <Text>{JSON.stringify(filteredBooks.map(b => b.title))}</Text>
      </View>

      <View>
        { loading ? <LoadingCircle/> : <PaginationBookList books={filteredBooks}/> }
      </View>

    </View>

  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
  },
  container: {
    flex: 1,
  },
  inputPadding: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
});
