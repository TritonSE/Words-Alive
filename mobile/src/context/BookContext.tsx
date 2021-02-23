import React, { createContext, useReducer, useContext } from 'react';
import { APIContext } from './APIContext';
import { Book } from '../models/Book';

type BookState = {
   books: Book[], // holds all the books we have stored
   fetchBooks: () => void, // api call to get books
   loading: boolean, // lets us know if the books are being loaded or not
};

const initialState: BookState = {
  books: [],
  fetchBooks: () => {},
  loading: false,
};

export const BookContext = createContext<BookState>(initialState);

export const BookProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const client = useContext(APIContext);

  // loads books. If error, logs erorr and returns a loading indicator of true
  function fetchBooks(): void {
    dispatch({ type: 'API_CALL_STARTED' });
    client.getBooks().then((res) => {
      dispatch({ type: 'API_RETURNED', payload: res });
    }).catch((err) => {
      console.log(err);

      //! !!! DELETE LATER -- currently using for testing purposes !!!!
      const books: Book[] = [
        {
          id: 'a',
          title: 'a',
          image: 'https://placekitten.com/200/300',
          createdAt: '10000',
        },
        {
          id: 'b',
          title: 'b',
          image: 'https://placekitten.com/200/301',
          createdAt: '1500',
        },
        {
          id: 'c',
          title: 'c',
          image: 'https://placekitten.com/200/302',
          createdAt: '2000',
        },
        {
          id: 'd',
          title: 'd',
          image: 'https://placekitten.com/200/303',
          createdAt: '3000',
        },
        {
          id: 'e',
          title: 'e',
          image: 'https://placekitten.com/200/304',
          createdAt: '1000',
        },
        {
          id: 'f',
          title: 'f',
          image: 'https://placekitten.com/200/305',
          createdAt: '1000',
        },
        {
          id: 'g',
          title: 'g',
          image: 'https://placekitten.com/200/306',
          createdAt: '1000',
        },
        {
          id: 'h',
          title: 'h',
          image: 'https://placekitten.com/200/307',
          createdAt: '1000',
        },
        {
          id: 'i',
          title: 'i',
          image: 'https://placekitten.com/200/310',
          createdAt: '1000',
        },
        {
          id: 'j',
          title: 'j',
          image: 'https://placekitten.com/200/300',
          createdAt: '10000',
        },
        {
          id: 'k',
          title: 'k',
          image: 'https://placekitten.com/200/301',
          createdAt: '1500',
        },
        {
          id: 'l',
          title: 'l',
          image: 'https://placekitten.com/200/302',
          createdAt: '2000',
        },
        {
          id: 'm',
          title: 'm',
          image: 'https://placekitten.com/200/303',
          createdAt: '3000',
        },
        {
          id: 'n',
          title: 'n',
          image: 'https://placekitten.com/200/304',
          createdAt: '1000',
        },
        {
          id: 'o',
          title: 'o',
          image: 'https://placekitten.com/200/305',
          createdAt: '1000',
        },
        {
          id: 'p',
          title: 'p',
          image: 'https://placekitten.com/200/306',
          createdAt: '1000',
        },
        {
          id: 'q',
          title: 'q',
          image: 'https://placekitten.com/200/307',
          createdAt: '1000',
        },
        {
          id: 'r',
          title: 'r',
          image: 'https://placekitten.com/200/310',
          createdAt: '1000',
        },
        {
          id: 's',
          title: 's',
          image: 'https://placekitten.com/200/300',
          createdAt: '10000',
        },
        {
          id: 't',
          title: 't',
          image: 'https://placekitten.com/200/301',
          createdAt: '1500',
        },
        {
          id: 'u',
          title: 'u',
          image: 'https://placekitten.com/200/302',
          createdAt: '2000',
        },
        {
          id: 'v',
          title: 'v',
          image: 'https://placekitten.com/200/303',
          createdAt: '3000',
        },
        {
          id: 'w',
          title: 'w',
          image: 'https://placekitten.com/200/304',
          createdAt: '1000',
        },
        {
          id: 'x',
          title: 'x',
          image: 'https://placekitten.com/200/305',
          createdAt: '1000',
        },
      ];
      dispatch({ type: 'API_RETURNED', payload: books });
    });
  }

  return (
    <BookContext.Provider
      value={{
        books: state.books,
        fetchBooks,
        loading: state.loading,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

type BookAction
 = { type: 'API_CALL_STARTED' }
 | { type: 'API_RETURNED', payload: Book[] };

const reducer = (state: BookState, action: BookAction): BookState => {
  switch (action.type) {
    case 'API_CALL_STARTED':
      return { ...state, loading: true };
    case 'API_RETURNED':
      return { ...state, books: action.payload, loading: false };
    default:
      return state;
  }
};
