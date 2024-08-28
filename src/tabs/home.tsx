import { Typography } from '@material-tailwind/react';
import home from '../assets/images/home.png';
import CardLoader from '../component/cardLoader.tsx';
import { useEffect, useState } from 'react';
import { Book } from '../interface/Books.ts';
import { BaseURL } from '../costants/environment.ts';
import axios from 'axios';

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${BaseURL}/books`);
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
        width: '100%',
      }}
    >
      <Typography variant="h1" style={{ color: 'white', padding: '20px' }}>
        Welcome back
      </Typography>
      <Typography variant="h3" style={{ color: 'white', padding: '20px' }}>
        Available books
      </Typography>
      <CardLoader />
    </div>
  );
};

export default Home;
