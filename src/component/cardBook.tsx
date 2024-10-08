import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { load } from '../store/localstorage.ts';
import { BaseURL } from '../costants/environment.ts';
import CardLoader from './cardLoader.tsx';
import { BookCardProps } from '../interface/Books.ts';
import { FaRegTrashAlt } from 'react-icons/fa';

export const BookCard: React.FC<BookCardProps> = ({ book, pathDirctory }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [clickDetails, setClickDetails] = useState(false);
  const [cover, setCover] = useState('');
  useEffect(() => {
    const fetchCover = async () => {
      try {
        const userData = await load();
        if (!userData) return;
        const response = await axios({
          method: 'GET',
          url: `${BaseURL}/downloadcover/${book.id}`,
          params: {
            username: userData.username,
            password: userData.password,
          },
          withCredentials: true,
          responseType: 'blob',
        });

        const reader = new FileReader();
        reader.onloadend = () => {
          // @ts-ignore
          setCover(reader.result);
        };
        reader.readAsDataURL(response.data);
      } catch (error) {
        console.error(`Error fetching cover for book :`, error);
      }
    };

    fetchCover();
  }, []);

  const handlePress = () => {
    try {
      setClickDetails(true);
      navigate('/book', { state: { book } });
      //  navigate(`/book/?book=${encodeURIComponent(JSON.stringify(book))}`);
    } catch (error) {
      console.error('Error navigating to book details:', error);
    } finally {
      setClickDetails(false);
    }
  };

  return (
    <>
      {cover ? (
        <div
          onClick={() => handlePress()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`cursor-pointer ${isHovered ? 'bg-gray-200' : ''} p-4`}
          style={{ width: '100%', maxWidth: '300px', height: '100%' }}
        >
          <img src={cover} alt="Book Cover" className="w-full object-contain" />

          {pathDirctory === 'home' && (
            <button className="absolute bottom-28 right-6 bg-gray-600 hover:bg-gray-800 text-white rounded-full p-2 ">
              <FaRegTrashAlt />
            </button>
          )}

          <div className="mt-4 ">
            <h2 className="text-lg font-bold">
              {book.title.length > 40
                ? `${book.title.substring(0, 40)}...`
                : book.title}
            </h2>
            <p className="text-sm text-gray-600">
              {book.author.length > 40
                ? `${book.author.substring(0, 40)}...`
                : book.author}
            </p>
          </div>
        </div>
      ) : (
        <CardLoader />
      )}
    </>
  );
};

export default BookCard;
