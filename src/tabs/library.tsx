import { Button, Card, Typography } from '@material-tailwind/react';
import CustomTabBarButton from '../component/CustomTabBarButton.tsx';
import openBook from '../assets/images/open-book-outline.png';
import { CSSProperties, useEffect, useState } from 'react';
import BookCard from '../component/cardBook.tsx';
import { Book, BookLibrary } from '../interface/Books.ts';
import LibraryCard from '../component/LibraryCard.tsx';
import login from '../auth/login.tsx';

const Library = () => {
  const [downloadedBooks, setDownloadedBooks] = useState<Book[]>([]);

  useEffect(() => {
    const getDownloadedBooks = () => {
      const booksString = localStorage.getItem('downloadedBooks');
      const books = booksString ? JSON.parse(booksString) : [];
      setDownloadedBooks(books);
    };
    getDownloadedBooks();
  }, []);

  const handlePress = async () => {};
  const handleDelete = (id: string) => {
    setDownloadedBooks(prevBooks => prevBooks.filter(book => book.id !== id));
  };

  return (
    <div>
      {downloadedBooks.length === 0 ? (
        <NoBookComponent />
      ) : (
        <>
          <Typography variant="h2" style={{ color: 'black', padding: '20px' }}>
            Your library
          </Typography>
          <div style={styles.bookContainer}>
            {downloadedBooks.map((book, index) => (
              <Card key={index} shadow={true} style={styles.bookCardContainer}>
                <LibraryCard
                  key={index}
                  book={book as BookLibrary}
                  onDelete={handleDelete}
                />
              </Card>
            ))}
          </div>
        </>
      )}

      <CustomTabBarButton />
    </div>
  );
};

export default Library;

const NoBookComponent = () => {
  return (
    <>
      <Typography variant="h2" style={{ color: 'black', padding: '20px' }}>
        Your library
      </Typography>{' '}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '3%',
        }}
      >
        <img src={openBook} alt="Logo" style={{ width: '20rem' }} />
        <Typography variant="h5">
          You don’t have any book in your library yet.
        </Typography>
        <Typography variant="small">
          Discover books in the homepage or get custom suggestions.
        </Typography>
        <Button variant="outlined" className={'mt-8 w-1/5'}>
          Ask the AI librarian{' '}
        </Button>
      </div>
    </>
  );
};

const styles: Record<string, CSSProperties> = {
  bookContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    paddingBottom: '5%',
  },
  bookCardContainer: {
    width: '18rem',
    marginBottom: '5%',
    margin: 5,
  },
};
