import { Card, Typography } from '@material-tailwind/react';
import home from '../assets/images/home.png';
import { CSSProperties, useEffect, useState } from 'react';
import { Book } from '../interface/Books.ts';
import { BaseURL } from '../costants/environment.ts';
import axios from 'axios';
import CustomTabBarButton from '../component/CustomTabBarButton.tsx';
import BookCard from '../component/cardBook.tsx';

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${BaseURL}/books`, {
          withCredentials: true,
        });
        setBooks(response.data);
      } catch (error) {
        console.error('Errore nel recupero dei libri:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${home})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        paddingLeft: '3rem',
      }}
    >
      <Typography variant="h1" style={{ color: 'white', padding: '20px' }}>
        Welcome back
      </Typography>
      <Typography
        variant="h3"
        style={{
          color: 'white',
          padding: '20px',
          marginTop: '20px',
        }}
      >
        Available books
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={styles.bookContainer}>
          {books.map((book, index) => (
            <Card key={index} shadow={true} style={styles.bookCardContainer}>
              <BookCard book={book} pathDirctory={'home'} />
            </Card>
          ))}
        </div>
      </div>
      <CustomTabBarButton />
    </div>
  );
};

export default Home;
const styles: Record<string, CSSProperties> = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {},
  header: {
    backgroundColor: '#fff',
    height: 90,
  },
  headerLeftText: {
    fontWeight: 'bold',
    marginLeft: 20,
  },
  avaibleBooks: {
    color: 'white',
    marginLeft: 20,
    marginBottom: 10,
  },
  bookContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    paddingBottom: '5%',
    paddingTop: '5%',
    gap: 20,
  },
  bookCardContainer: {
    width: '18rem',
    marginBottom: '5%',
    margin: 5,
  },
  firstLoginChat: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
};
