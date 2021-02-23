import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

import { PaginationBookList } from '../components/PaginationBookList';
import { HorizontalBookList } from '../components/HorizontalBookList';
import { BookContext } from '../context/BookContext';
import { TextStyles } from '../styles/TextStyles';
import { Colors } from '../styles/Colors';
import { I18nContext } from '../context/I18nContext';
import { LoadingCircle } from '../components/LoadingCircle';

// constant for how many books to display per page
const booksPerPage = 9;

/**
* Renders the homescreen for the app. Currently displays heading, new books, all books.
*/
export const HomeScreen: React.FC = () => {
  // get books from backend
  const booksCtx = useContext(BookContext);
  useEffect(booksCtx.fetchBooks, []);
  const newBooks = booksCtx.books
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  const allBooks = booksCtx.books;

  const i18nCtx = useContext(I18nContext);

  // "chunk" the books into groups of size <booksPerPage> in order to display paginated books
  const booksChunked = [];
  for (let i = 0; i < allBooks.length; i += booksPerPage) {
    booksChunked.push(allBooks.slice(i, i + booksPerPage));
  }

  // fix to make the flatlist for AllBooks not be inside a scrollview but maintain scrolling
  const VirtualizedView: React.FC = (props) => {
    return (
      <FlatList
        data={[]}
        ListEmptyComponent={null}
        keyExtractor={() => 'dummy'}
        renderItem={null}
        ListHeaderComponent={() => (
          <>{props.children}</>
        )}
      />
    );
  };

  return (
    <VirtualizedView>

      <View style={styles.heading}>
        <Svg height="100%" width="100%" viewBox="0 0 1 1">
          <Circle cx="0.5" cy="-0.3" r="0.8" stroke={Colors.orange} fill={Colors.orange} />
        </Svg>
      </View>

      <View style={styles.textPadding}>
        <Text style={TextStyles.h3}>{i18nCtx.t('newBooks')}</Text>
      </View>

      <View>
        { booksCtx.loading ? <LoadingCircle/> : <HorizontalBookList books={newBooks}/> }
      </View>

      <View style={styles.textPadding}>
        <Text style={TextStyles.h3}>{i18nCtx.t('allBooks')}</Text>
      </View>

      <View>
        { booksCtx.loading ? <LoadingCircle/> : <PaginationBookList books={booksChunked}/> }
      </View>

    </VirtualizedView>
  );
};

const styles = StyleSheet.create({
  textPadding: {
    paddingTop: 33,
    paddingBottom: 19,
    paddingLeft: 17,
  },
  heading: {
    color: Colors.orange,
    height: 400,
  },
});
