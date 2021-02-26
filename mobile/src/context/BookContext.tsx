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
          id: '1',
          title: 'Harry Potter',
          image: 'https://placekitten.com/200/300',
          createdAt: '10000',
        },
        {
          id: '2',
          title: 'Holes',
          image: 'https://placekitten.com/200/301',
          createdAt: '1500',
        },
        {
          id: '3',
          title: 'Pinocchio',
          image: 'https://placekitten.com/200/302',
          createdAt: '2000',
        },
        {
          id: '4',
          title: 'Hunger Games',
          image: 'https://placekitten.com/200/303',
          createdAt: '3000',
        },
        {
          id: '5',
          title: 'Maze Runner',
          image: 'https://placekitten.com/200/304',
          createdAt: '1000',
        },
        {
          id: '6',
          title: 'Great Gatsby',
          image: 'https://placekitten.com/200/305',
          createdAt: '1000',
        },
        {
          id: '7',
          title: '1984',
          image: 'https://placekitten.com/200/306',
          createdAt: '1000',
        },
        {
          id: '8',
          title: 'Brave New World',
          image: 'https://placekitten.com/200/307',
          createdAt: '1000',
        },
        {
          id: '9',
          title: 'Percy Jackson',
          image: 'https://placekitten.com/200/310',
          createdAt: '1000',
        },
        {
          id: '10',
          title: 'Dune',
          image: 'https://placekitten.com/200/300',
          createdAt: '10000',
        },
        {
          id: '11',
          title: 'Charlotte\'s Web',
          image: 'https://placekitten.com/200/301',
          createdAt: '1500',
        },
        {
          id: '12',
          title: 'Where the Wild Things Are',
          image: 'https://placekitten.com/200/302',
          createdAt: '2000',
        },
        {
          id: '13',
          title: 'Süite française',
          image: 'https://placekitten.com/200/303',
          createdAt: '3000',
        },
        {
          id: '14',
          title: 'The Cat in The Hat',
          image: 'https://placekitten.com/200/304',
          createdAt: '1000',
        },
        {
          id: '15',
          title: 'Charlie and the Chocolate Factory',
          image: 'https://placekitten.com/200/305',
          createdAt: '1000',
        },
        {
          id: '16',
          title: 'Diary of a Wimpy Kid',
          image: 'https://placekitten.com/200/306',
          createdAt: '1000',
        },
        {
          id: '17',
          title: 'Green Eggs & Ham',
          image: 'https://placekitten.com/200/307',
          createdAt: '1000',
        },
        {
          id: '18',
          title: '!@#%^&*(()_+{}|:"?><~-=',
          image: 'https://placekitten.com/200/310',
          createdAt: '1000',
        },
        {
          id: '19',
          title: 'The BFG',
          image: 'https://placekitten.com/200/300',
          createdAt: '10000',
        },
        {
          id: '20',
          title: 'Hobbit',
          image: 'https://placekitten.com/200/301',
          createdAt: '1500',
        },
        {
          id: '21',
          title: 'La fiesta de cumpleaños',
          image: 'https://placekitten.com/200/302',
          createdAt: '2000',
        },
        {
          id: '22',
          title: 'Nos jeux préférés',
          image: 'https://placekitten.com/200/303',
          createdAt: '3000',
        },
        {
          id: '23',
          title: 'Winnie-the-Pooh',
          image: 'https://placekitten.com/200/304',
          createdAt: '1000',
        },
        {
          id: '24',
          title: 'Bridge to Terabithia',
          image: 'https://placekitten.com/200/305',
          createdAt: '1000',
        },
      ];
      //dispatch({ type: 'API_RETURNED', payload: books });
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
