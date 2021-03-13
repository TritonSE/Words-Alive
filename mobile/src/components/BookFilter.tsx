import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Keyboard, Dimensions, Image, Pressable, Text } from 'react-native';

import { Book } from '../models/Book';
import { Language, Languages } from '../models/Languages';
import { TextStyles } from '../styles/TextStyles';
import { Colors } from '../styles/Colors';

const { width } = Dimensions.get('window');

// ISO 639-1 2-letter language codes (from the Languages file) and the number of languages
const langCodes = Object.keys(Languages);
const numLangs = langCodes.length;

// max length of a language, to adjust sizing in the language filter pop-up
const maxLength = Object.values(Languages).sort((a, b) => b.length - a.length)[0].length;

// array of Languages containing the language code for use in displaying all the languages in the filter
const languages = [];
langCodes.forEach(el => { languages.push(el); });

type BookFilterProps = { onSearchLangChange: (text: string, langSet: Set<Language>) => void };

/**
 * Component that renders a search bar for the user to find books by title or author.
 */
const BookFilter = ({ onSearchLangChange }: BookFilterProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');

  // when the text inside the search bar or the set of active languages are changed,
  // set that text to be the searchTerm and filter the books based on the text and current active languages
  const onFilterChange = (text: string, langSet: Set<Language>): void => {
    setSearchTerm(text);
    onSearchLangChange(text, langSet);
  };

  // state for the dropdown menu pop-up
  const [dropdownVisible, setDropDownVisible] = useState(false);

  // state for the which of the language filter's pressable buttons are "selected"
  const [selectedLangs, setSelectedLangs] = useState(new Set<Language>());

  // when a new language is selected or deselected,
  // if the language already exists in the set of selected languages, then delete that language from the set
  // else, it doesn't exist, and add the new language to the set
  // also filter the books based on the "active languages" and the current search term
  const onChangeLangFilter = (newLang: Language): void => {
    selectedLangs.has(newLang) ?
      setSelectedLangs((prevLangs) => {
        const temp = new Set<Language>(prevLangs);
        temp.delete(newLang);
        //onFilterChange(searchTerm, temp);
        return temp;
      })
      :
      setSelectedLangs((prevLangs) => {
        const temp = new Set<Language>(prevLangs).add(newLang);
        //onFilterChange(searchTerm, temp);
        return temp;
      });
  };

  useEffect(() => {
    onFilterChange(searchTerm, selectedLangs);
  }, [selectedLangs]);

  return (
    <View style={styles.filters}>

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
      </View>

      <View style={styles.searchBarContainer}>

        <TextInput
          value={searchTerm}
          onChangeText={(text) => onFilterChange(text, selectedLangs)}
          placeholder=" Search by title or author"
          onBlur={Keyboard.dismiss}
          clearButtonMode="always"
          style={styles.searchBar}
        />

        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../../assets/images/search-solid.png')}/>
        </View>

      </View>

    </View>
  );
};

/**
 * Custom hook that filters books on user input in the search bar and returns the
 * filtered books in an array and the BookSearchFilter component.
 */
export const useBookFilter = (allBooks: Book[]): [Book[], JSX.Element] => {
  const [filteredBooks, setFilteredBooks] = useState(allBooks);

  // filter the books by title or author and by language
  // if no languages are specified, then default to filter by search on all books
  const filterBooks = (searchTerm: string, langSet: Set<Language>): void => {
    if (langSet.size !== 0) {
      setFilteredBooks(
        allBooks.filter((book: Book) => {
          return book.languages.some(l => langSet.has(l))
            && (book.title.toUpperCase().includes(searchTerm.toUpperCase())
            || book.author.toUpperCase().includes(searchTerm.toUpperCase()));
        }),
      );
    } else {
      setFilteredBooks(
        allBooks.filter((book: Book) => {
          return book.title.toUpperCase().includes(searchTerm.toUpperCase())
            || book.author.toUpperCase().includes(searchTerm.toUpperCase());
        }),
      );
    }
  };

  const filterComponent = BookFilter({ onSearchLangChange: filterBooks });

  return [filteredBooks, filterComponent];
};

const styles = StyleSheet.create({
  filters: {
    marginHorizontal: 17,
    flexDirection: 'row',
    position: 'absolute',
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
  searchBarContainer: {
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
