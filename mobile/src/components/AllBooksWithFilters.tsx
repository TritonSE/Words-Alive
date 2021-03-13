import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

import { LoadingCircle } from './LoadingCircle';
import { PaginatedBookList } from './PaginatedBookList';
import { useBookFilter } from './BookFilter';
import { Book } from '../models/Book';
import { TextStyles } from '../styles/TextStyles';
import { Language, Languages } from '../models/Languages';
import { Colors } from '../styles/Colors';

// how many books to display per page (in the Paginated Booklist)
const booksPerPage = 9;

const { width } = Dimensions.get('window');

type AllBooksWithFiltersProps = { allBooks: Book[], loading: boolean};

// ISO 639-1 2-letter language codes (from the Languages file) and the number of languages
const langCodes = Object.keys(Languages);
const numLangs = langCodes.length;

// max length of a language, to adjust sizing in the language filter pop-up
const maxLength = Object.values(Languages).sort((a, b) => b.length - a.length)[0].length;

// array of Languages containing the language code for use in displaying all the languages in the filter
const languages = [];
langCodes.forEach(el => { languages.push(el); });

/**
 *  Renders the All Books section with a search filter and displays the paginated books.
 */
export const AllBooksWithFilters: React.FC<AllBooksWithFiltersProps> = ({ allBooks, loading }) => {
  // contains the array of books filtered by the search term and the search filter componenet
  const [filteredBySearch, searchFilterComponent] = useBookFilter(allBooks);

  // state for the dropdown menu pop-up
  const [dropdownVisible, setDropDownVisible] = useState(false);

  // state for the which of the language filter's pressable buttons are "selected"
  const [selectedLangs, setSelectedLangs] = useState(new Set<Language>());

  // when a new language is selected or deselected,
  // if the language already exists in the set of selected languages, then delete that language from the set
  // else, it doesn't exist, and add the new language to the set
  const onChangeLangFilter = (newLang: Language): void => {
    selectedLangs.has(newLang) ?
      setSelectedLangs((prevLangs) => {
        const temp = new Set<Language>(prevLangs);
        temp.delete(newLang);
        return temp;
      })
      :
      setSelectedLangs((prevLangs) => new Set<Language>(prevLangs).add(newLang));
  };

  // filter the books (that were returned by the search filter) by language, adding books to the filteredByLang array
  // if the book's languages array contain any of the (selected) languages specified through the language filter buttons
  const filteredByLang = [];
  if (selectedLangs.size !== 0) {
    for (let i = 0; i < filteredBySearch.length; i++) {
      const bookItemLangs = filteredBySearch[i].languages;
      if (bookItemLangs.some(l => selectedLangs.has(l))) {
        filteredByLang.push(filteredBySearch[i]);
      }
    }
  }

  // filteredBooks are the resulting books to be displayed.
  // if no languages are specified, then default to the books that were returned by the search filter
  // else, use the books that were filtered by language (in addition to by search term)
  const filteredBooks = selectedLangs.size === 0 ? filteredBySearch : filteredByLang;

  return (

    <View>

      <View style={styles.bookDisplay}>

        <View style={{ marginHorizontal: 17, paddingBottom: 19 }}>
          <Text>{JSON.stringify(filteredBooks.map(b => (`{Title: ${b.title} | Author: ${b.author} | Langs: ${b.languages}}`)))}</Text>
        </View>

        <View>
          { loading ? <LoadingCircle/> : <PaginatedBookList books={filteredBooks} booksPerPage={booksPerPage}/> }
        </View>

        <View style={loading ? styles.loading : filteredBooks.length === 0 ? styles.loading : null}>
          { !loading && filteredBooks.length === 0 ? <Text style={styles.noResult}>No results</Text> : null }
        </View>

      </View>

      {/* <View style={styles.filters}>

        <View>
          <Pressable
            onPress={() => setDropDownVisible(!dropdownVisible)}
            style={styles.button}
          >
            <Image style={styles.icon} source={require('../../assets/images/bars-solid.png')}/>

            {dropdownVisible ? (
              <View style={styles.dropdown}>

                {languages.map((lang: Language) => (
                    <Pressable
                      key={`button${lang}`}
                      onPress={() => onChangeLangFilter(lang)}
                    >
                      <View key={`nameBox${lang}`} style={styles.nameBoxContainer}>
                      <Text key={`name${lang}`} style={{ ...TextStyles.c4, alignSelf: 'center' }}>{Languages[lang]}</Text>

                        <View key={`box${lang}`} style={styles.box}>
                          {selectedLangs.has(lang) ?
                            <Image key={`check${lang}`} style={styles.boxChecked} source={require('../../assets/images/check-square-solid.png')}/>
                            :
                            null}
                        </View>

                      </View>
                    </Pressable>
                ))}

              </View>
            )
              :
              null}

          </Pressable>
        </View> */}
      {searchFilterComponent}

      {/* </View> */}

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
    // width: 140,
    width: maxLength * 14,
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
