import { Typography } from '@material-tailwind/react';
import home from '../assets/images/home.png';
import CardLoader from '../component/cardLoader.tsx';
import { useEffect, useState } from 'react';
import { Book } from '../interface/Books.ts';
import { BaseURL } from '../costants/environment.ts';
import axios from 'axios';
import CustomTabBarButton from "../component/CustomTabBarButton.tsx";
import BookCard from "../component/cardBook.tsx";

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${BaseURL}/books` , {
            withCredentials: true,
        })  ;
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
      <Typography variant="h2" style={{ color: 'white', padding: '20px' }}>
        Welcome back
      </Typography>
      <Typography variant="h3" style={{ color: 'white', padding: '20px' }}>
        Available books
      </Typography>
      <CardLoader />
        <BookCard />
        <CustomTabBarButton />
    </div>
  );
};

export default Home;
