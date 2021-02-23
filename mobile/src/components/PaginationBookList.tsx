import React from 'react';
import { Dimensions, FlatList, StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
        <View style={styles.container} key={`${index}`}>

          <FlatList
            listKey={`${index}`}
            data={bookArray}
            renderItem={({ item }) => (
              <View key={item.id} style={styles.bookCard}>
                <BookCard book={item} size={0.28 * width} />
              </View>
            )}
            numColumns={3}
            scrollEnabled={false}
            keyExtractor={book => book.id}
            columnWrapperStyle={styles.spaceColumns}
          />

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
});
