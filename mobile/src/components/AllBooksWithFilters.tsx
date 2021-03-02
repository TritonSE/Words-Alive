import React, { useState } from 'react';
import { TextInput, Keyboard, Text, View, StyleSheet, Dimensions } from 'react-native';

import { LoadingCircle } from './LoadingCircle';
import { PaginationBookList } from './PaginationBookList';
import { Book } from '../models/Book';
import { TextStyles } from '../styles/TextStyles';
import { ColumnBookList } from './ColumnBookList';
import { Colors } from '../styles/Colors';

// constant for how many books to display per page
const booksPerPage = 9;

const { width } = Dimensions.get('window');

type AllBooksWithFiltersProps = { allBooks: Book[], loading: boolean};

/**
 *  Renders the All Books section with a search filter and displays the paginated books.
 */
export const AllBooksWithFilters: React.FC<AllBooksWithFiltersProps> = ({ allBooks, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // "filters" books by either title or author based on the searchTerm
  const filteredBooks = searchTerm === '' ? allBooks : allBooks.filter((bookItem: Book) => {
    return bookItem.title.toUpperCase().includes(searchTerm.toUpperCase())
    || bookItem.author.toUpperCase().includes(searchTerm.toUpperCase());
  });

  return (

    <View>

      <View style={styles.inputPadding} >
        <TextInput
          style={styles.textInput}
          clearButtonMode="always"
          placeholder="   Search for a book by title or author"
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
          onBlur={Keyboard.dismiss}
        />
        <Text>{searchTerm}</Text>
        <Text>{JSON.stringify(filteredBooks.map(b => (`{Title: ${b.title} | Author: ${b.author}}`)))}</Text>
      </View>

      <View>
        { loading ? <LoadingCircle/> : <PaginationBookList books={filteredBooks} booksPerPage={booksPerPage}/> }
      </View>

      <View>
        <View style={loading ? styles.loading : filteredBooks.length === 0 ? styles.loading : null}>
          { !loading && filteredBooks.length === 0 ? <Text style={styles.noResult}>No results for &quot;{searchTerm}&quot;</Text> : null }
        </View>
      </View>

    </View>


  );
};

const styles = StyleSheet.create({
  inputPadding: {
    paddingHorizontal: 17,
    marginBottom: 19,
  },
  textInput: {
    height: 40,
    width: width - 34,
    borderColor: Colors.orange,
    borderWidth: 2,
    borderRadius: 5,
    ...TextStyles.c3,
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 3 },
  },
  container: {
    flex: 1,
  },
  loading: {
    height: (0.28 * width * booksPerPage / 3) + (12 * booksPerPage / 3),
  },
  noResult: {
    ...TextStyles.c2,
    textAlign: 'center',
  },
});
