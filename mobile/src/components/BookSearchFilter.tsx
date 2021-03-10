import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Keyboard, Dimensions, Image } from 'react-native';

import { Book } from '../models/Book';
import { TextStyles } from '../styles/TextStyles';
import { Colors } from '../styles/Colors';

const { width } = Dimensions.get('window');

type BookSearchFilterProps = { onFilterChange: (searchTerm: string) => void };

/**
 * Component that renders a search bar for the user to find books by title or author.
 */
const BookSearchFilter = ({ onFilterChange }: BookSearchFilterProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');

  // When the text inside the search bar is changed, set that text to be the searchTerm
  // and filter the books based on the text.
  const onChangeSearch = (text: string): void => {
    setSearchTerm(text);
    onFilterChange(text);
  };

  return (

    <View style={styles.container}>

      <TextInput
        value={searchTerm}
        onChangeText={onChangeSearch}
        placeholder=" Search for a book by title or author"
        onBlur={Keyboard.dismiss}
        clearButtonMode="always"
        style={styles.searchBar}
      />

      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../../assets/images/search-solid.png')}/>
      </View>

    </View>

  );
};

/**
 * Custom hook that filters books on user input in the search bar and returns the
 * filtered books in an array and the BookSearchFilter component.
 * The filterBooks method does the actual filtering and is passed into the component.
 */
export const useBookSearchFilter = (allBooks: Book[]): [Book[], JSX.Element] => {
  const [filteredBooks, setFilteredBooks] = useState(allBooks);

  const filterBooks = (searchTerm: string): void => {
    setFilteredBooks(
      allBooks.filter((book: Book) => {
        return book.title.toUpperCase().includes(searchTerm.toUpperCase())
                || book.author.toUpperCase().includes(searchTerm.toUpperCase());
      }),
    );
  };

  const searchFilterComponent = BookSearchFilter({ onFilterChange: filterBooks });

  return [filteredBooks, searchFilterComponent];
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: width - 84,
    borderColor: Colors.orange,
    height: 40,
    borderWidth: 2,
    borderRadius: 5,
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 3 },
  },
  searchBar: {
    height: 36,
    width: width - 134,
    ...TextStyles.c3,
  },
  imageContainer: {
    backgroundColor: Colors.orange,
    height: 36,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.orange,
    borderWidth: 2,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  image: {
    height: 20,
    width: 20,
    tintColor: 'white',
  },
});
