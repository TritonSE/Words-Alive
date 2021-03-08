import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

import { LoadingCircle } from './LoadingCircle';
import { PaginationBookList } from './PaginationBookList';
import { Book } from '../models/Book';
import { TextStyles } from '../styles/TextStyles';
import { LangFilter } from './LangFilter';
import { useBookSearchFilter } from './BookSearchFilter';
import { Languages } from '../models/Languages';

// constant for how many books to display per page
const booksPerPage = 9;

const { width } = Dimensions.get('window');

type AllBooksWithFiltersProps = { allBooks: Book[], loading: boolean};


const test = {
  arr: [
    {lang: 'en', isActive: false},
    {lang: 'es', isActive: false},
    {lang: 'fr', isActive: false},
  ]
};

const activeLanguages = []

test.arr.map(item=> {
  if (item.isActive){
    activeLanguages.push(item.lang);
  }
})

/**
 *  Renders the All Books section with a search filter and displays the paginated books.
 */
export const AllBooksWithFilters: React.FC<AllBooksWithFiltersProps> = ({ allBooks, loading }) => {
  const [filteredBySearch, searchFilterComponent] = useBookSearchFilter(allBooks);

  const filteredByLang = [];
  if (activeLanguages.length != 0) {
    for (let i = 0; i < filteredBySearch.length; i++){
      const bookItemLangs = filteredBySearch[i].languages;
      if (bookItemLangs.some(l => activeLanguages.includes(l))){
        filteredByLang.push(filteredBySearch[i]);
      }
    }
  } 

  const filteredBooks = activeLanguages.length === 0 ? filteredBySearch : filteredByLang;

  return (

    <View>


      <View style={styles.filters}>
        <LangFilter/>
        {searchFilterComponent}
      </View>

      {/* <View style={{marginHorizontal: 17, paddingBottom: 19}}>
        <Text>{JSON.stringify(filteredBooks.map(b => (`{Title: ${b.title} | Author: ${b.author}}`)))}</Text>
      </View> */}


      <View>
        { loading ? <LoadingCircle/> : <PaginationBookList books={filteredBySearch} booksPerPage={booksPerPage}/> }
      </View>

      <View>
        <View style={loading ? styles.loading : filteredBySearch.length === 0 ? styles.loading : null}>
          { !loading && filteredBySearch.length === 0 ? <Text style={styles.noResult}>No results</Text> : null }
        </View>
      </View>

    </View>

  );
};

const styles = StyleSheet.create({
  filters: {
    marginHorizontal: 17,
    marginBottom: 19,
    flexDirection: 'row',
  },
  loading: {
    height: (0.28 * width * booksPerPage / 3) + (12 * booksPerPage / 3),
  },
  noResult: {
    ...TextStyles.c2,
    textAlign: 'center',
  },
});
