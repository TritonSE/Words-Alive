import React, { useState } from 'react';
import { TextInput, Keyboard, Text, View, StyleSheet, Dimensions } from 'react-native';
import { LoadingCircle } from './LoadingCircle';
import { PaginationBookList } from './PaginationBookList';
import { Book } from '../models/Book';

// constant for how many books to display per page
const booksPerPage = 9;

const { width } = Dimensions.get('window');

type AllBooksWithFiltersProps = { allBooks: Book[], loading: boolean};

/**
 *  Renders the All Books section with a search filter and displays the paginated books.
 */
export const AllBooksWithFilters: React.FC<AllBooksWithFiltersProps> = ({ allBooks, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = searchTerm === '' ? allBooks : allBooks.filter((bookItem: Book) => {
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
        { loading ? <LoadingCircle/> : <PaginationBookList books={filteredBooks} booksPerPage={booksPerPage}/> }
      </View>

      <View>
        <View style={loading ? styles.loading : filteredBooks.length === 0 ? styles.loading : null}>
          {!loading && filteredBooks.length === 0 ? <Text style={styles.noResult}>No results for the search &quot;{searchTerm}&quot;</Text> : null}
        </View>
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
  loading: {
    height: (0.28 * width * booksPerPage / 3) + (12 * booksPerPage / 3),
  },
  noResult: {
    textAlign: 'center',
  },
});
