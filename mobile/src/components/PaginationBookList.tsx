import React from 'react';
import { Dimensions, StyleSheet, View, Text, ScrollView } from 'react-native';
import { Book } from '../models/Book';
import { TextStyles } from '../styles/TextStyles';
import { BookCard } from './BookCard';

// constant for how many books to display per page
const booksPerPage = 9;

const { width } = Dimensions.get('window');

type PaginationBookListProps = { books: Book[] };

/**
* Renders a "paginated" list of books where books are grouped and displayed on multiple pages.
* "Chunks" the books into groups of size <booksPerPage>.
*/
export const PaginationBookList: React.FC<PaginationBookListProps> = ({ books }) => {
  const booksChunked = [];
  for (let i = 0; i < books.length; i += booksPerPage) {
    booksChunked.push(books.slice(i, i + booksPerPage));
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator
      pagingEnabled
    >

      { booksChunked.map((bookArray, index) => (
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
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    width: width - 34,
    marginHorizontal: 17,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignContent: 'space-around',
  },
  bookCard: {
    marginBottom: 12,
  },
  text: {
    alignItems: 'center',
  },
});
