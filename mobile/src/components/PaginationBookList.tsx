import React from 'react';
import { Dimensions, StyleSheet, View, Text, ScrollView } from 'react-native';
import { Book } from '../models/Book';
import { TextStyles } from '../styles/TextStyles';
import { BookCard } from './BookCard';

type PaginationBookListProps = { books: Book[][] };

const { width } = Dimensions.get('window');

/**
* Renders a "paginated" list of books where books are grouped and displayed on multiple pages.
*/
export const PaginationBookList: React.FC<PaginationBookListProps> = ({ books }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator
      pagingEnabled
    >

      { books.map((bookArray, index) => (
        <View style={styles.container} key={index}>

          <View style={styles.grid}>

            { bookArray.map((bookItem) => (
              <View key={bookItem.id} style={styles.bookCard}>
                <BookCard book={bookItem} size={0.28 * width} />
              </View>
            ))}

          </View>

          <View style={styles.text}>
            <Text style={TextStyles.h3}> {'<'} {index + 1} {'>'} </Text>
          </View>

        </View>
      ))}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  spaceColumns: {
    justifyContent: 'space-between',
  },
  bookCard: {
    marginBottom: 12,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    width: width - 34,
    marginHorizontal: 17,
  },
  text: {
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignContent: 'space-around',
  },
});
