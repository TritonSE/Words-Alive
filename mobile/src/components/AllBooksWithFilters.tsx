import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, Pressable, Image } from 'react-native';

import { LoadingCircle } from './LoadingCircle';
import { PaginationBookList } from './PaginationBookList';
import { Book } from '../models/Book';
import { TextStyles } from '../styles/TextStyles';
import { useBookSearchFilter } from './BookSearchFilter';
import { Languages } from '../models/Languages';
import { Colors } from '../styles/Colors';

// constant for how many books to display per page
const booksPerPage = 9;

const { width } = Dimensions.get('window');

type AllBooksWithFiltersProps = { allBooks: Book[], loading: boolean};

// ISO 639-1 language codes (from the Languages file) and the number of languages
const langCodes = Object.keys(Languages);
const numLangs = langCodes.length;

// array of objects containing the language code and whether the language is "active" (its button is pressed)
// for use in the filter, defaulting to "not active"
const langArray = [];
langCodes.forEach(el => {
  langArray.push({ lang: el, isActive: false });
});

// object containing the array of language objects for use as a state
const langState = {
  arr: langArray,
};

/**
 *  Renders the All Books section with a search filter and displays the paginated books.
 */
export const AllBooksWithFilters: React.FC<AllBooksWithFiltersProps> = ({ allBooks, loading }) => {
  // contains the array of books filtered by the search term and the search filter componenet
  const [filteredBySearch, searchFilterComponent] = useBookSearchFilter(allBooks);

  // state for the dropdown menu pop-up
  const [dropdownVisible, setDropDownVisible] = useState(false);

  // state for the languages in pressable buttons & filter
  const [languages, setLanguages] = useState(langState);

  // toggle the language's isActive value at a given index (active -> not active, not active -> active)
  const onChangeLangFilter = (index: number): void => {
    const temp = langState.arr;
    temp[index].isActive = !temp[index].isActive;
    setLanguages({ arr: temp });
  };

  // store the current active languages in an array
  const activeLanguages = [];
  languages.arr.forEach(item => {
    if (item.isActive) {
      activeLanguages.push(item.lang);
    }
  });

  // filter the books (that were returned by the search filter) by language, adding books to the filteredByLang array
  // if the book's languages array contain any of the languages specified in the language filter (activeLanguages)
  const filteredByLang = [];
  if (activeLanguages.length !== 0) {
    for (let i = 0; i < filteredBySearch.length; i++) {
      const bookItemLangs = filteredBySearch[i].languages;
      if (bookItemLangs.some(l => activeLanguages.includes(l))) {
        filteredByLang.push(filteredBySearch[i]);
      }
    }
  }

  // filteredBooks are the books to be displayed.
  // if no languages are specified, then default to the books that were returned by the search filter
  // otherwise, use the books that were filtered by language (in addition by search term)
  const filteredBooks = activeLanguages.length === 0 ? filteredBySearch : filteredByLang;

  return (

    <View>

      <View style={styles.bookDisplay}>

        <View style={{ marginHorizontal: 17, paddingBottom: 19 }}>
          <Text>{JSON.stringify(filteredBooks.map(b => (`{Title: ${b.title} | Author: ${b.author} | Langs: ${b.languages}}`)))}</Text>
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

      <View style={styles.filters}>

        <View>
          <Pressable
            onPress={() => setDropDownVisible(!dropdownVisible)}
            style={styles.button}
          >
            <Image style={styles.icon} source={require('../../assets/images/bars-solid.png')}/>

            {dropdownVisible ? (
              <View style={styles.dropdown}>

                {languages.arr.map((el, index: number) => (
                  <View key={el.lang} style={styles.nameBoxContainer}>
                    <Text style={{ ...TextStyles.c2, alignSelf: 'center' }}>{Languages[el.lang]}</Text>

                    <Pressable
                      onPress={() => onChangeLangFilter(index)}
                    >
                      <View style={styles.box}>
                        {el.isActive ?
                          <Image style={styles.boxChecked} source={require('../../assets/images/check-square-solid.png')}/>
                          :
                          null}
                      </View>
                    </Pressable>

                  </View>
                ))}

              </View>
            )
              :
              null}

          </Pressable>
        </View>

        {/* <LangFilter/> */}

        {searchFilterComponent}

      </View>

    </View>

  );
};

const styles = StyleSheet.create({
  bookDisplay: {
    marginTop: 59,
  },
  filters: {
    marginHorizontal: 17,
    flexDirection: 'row',
    position: 'absolute',
  },
  loading: {
    height: (0.28 * width * booksPerPage / 3) + (12 * booksPerPage / 3),
  },
  noResult: {
    ...TextStyles.c2,
    textAlign: 'center',
  },
  button: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  icon: {
    height: 40,
    width: 40,
    tintColor: Colors.orange,
  },
  dropdown: {
    height: numLangs * 28 + 14,
    width: 111,
    marginTop: 10,
    paddingTop: 8,
    paddingBottom: 6,
    paddingHorizontal: 5,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.orange,
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 3 },
  },
  nameBoxContainer: {
    flexDirection: 'row',
    marginBottom: 2,
    justifyContent: 'space-between',
  },
  box: {
    height: 24,
    width: 24,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxChecked: {
    height: 22,
    width: 22,
    tintColor: Colors.orange,
  },
});
