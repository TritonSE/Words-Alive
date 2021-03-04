import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Keyboard, Dimensions } from 'react-native';

import { Book } from '../models/Book';
import { TextStyles } from '../styles/TextStyles';
import { Colors } from '../styles/Colors';

const { width } = Dimensions.get('window');

type BookSearchFilterProps = { onFilterChange: (searchTerm: string) => void };

const BookSearchFilter = ({ onFilterChange }: BookSearchFilterProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');

  const onChangeSearch = (text: string) => {
    setSearchTerm(text);
    onFilterChange(text);
  };

  return (
    <View>
      <TextInput
        value={searchTerm}
        onChangeText={onChangeSearch}
        placeholder=" Search for a book by title or author"
        onBlur={Keyboard.dismiss}
        clearButtonMode="always"
        style={styles.searchBar}
      />
      <Text>{searchTerm}</Text>
    </View>
  );
};

export const useBookSearchFilter = (allBooks: Book[]): [Book[], JSX.Element] => {
  const [filteredBooks, setFilteredBooks] = useState(allBooks);

  const filterBooks = (searchTerm: string) => {
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
  searchBar: {
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
});
