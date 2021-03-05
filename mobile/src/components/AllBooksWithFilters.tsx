import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

import { LoadingCircle } from './LoadingCircle';
import { PaginationBookList } from './PaginationBookList';
import { Book } from '../models/Book';
import { TextStyles } from '../styles/TextStyles';
import { LangFilter } from './LangFilter';
import { useBookSearchFilter } from './BookSearchFilter';

// constant for how many books to display per page
const booksPerPage = 9;

const { width } = Dimensions.get('window');

type AllBooksWithFiltersProps = { allBooks: Book[], loading: boolean};

/**
 *  Renders the All Books section with a search filter and displays the paginated books.
 */
export const AllBooksWithFilters: React.FC<AllBooksWithFiltersProps> = ({ allBooks, loading }) => {
  const [filteredBooks, searchFilterComponent] = useBookSearchFilter(allBooks);

  return (

    <View>

      <LangFilter/>

      <View style={styles.searchFilterPadding}>
        {searchFilterComponent}
        <Text>{JSON.stringify(filteredBooks.map(b => (`{Title: ${b.title} | Author: ${b.author}}`)))}</Text>
      </View>

      <View>
        { loading ? <LoadingCircle/> : <PaginationBookList books={filteredBooks} booksPerPage={booksPerPage}/> }
      </View>

      <View>
        <View style={loading ? styles.loading : filteredBooks.length === 0 ? styles.loading : null}>
          { !loading && filteredBooks.length === 0 ? <Text style={styles.noResult}>No results</Text> : null }
        </View>
      </View>

    </View>

  );
};

const styles = StyleSheet.create({
  searchFilterPadding: {
    paddingHorizontal: 17,
    marginBottom: 19,
  },
  loading: {
    height: (0.28 * width * booksPerPage / 3) + (12 * booksPerPage / 3),
  },
  noResult: {
    ...TextStyles.c2,
    textAlign: 'center',
  },
});
