import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { load } from '../store/localstorage.ts';
import { BaseURL } from '../costants/environment.ts';
import CardLoader from './cardLoader.tsx';
//{ book, pathDirctory }
const BookCard = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [clickDetails, setClickDetails] = useState(false);
  const [cover, setCover] = useState('');
  const pathDirctory = 'home';
  useEffect(() => {
    const fetchCover = async () => {
      try {
        const userData = await load();
        if (!userData) return;
        /*    const response = await axios({
          method: 'GET',
          url: `${BaseURL}/downloadcover/${book.id}`,
          params: {
            username: userData.username,
            password: userData.password,
          },
          responseType: 'blob',
        });*/
        const response = await axios({
          method: 'GET',
          url: `${BaseURL}/downloadcover/a4a25834c3a25a34`,
          params: {
            username: userData.username,
            password: userData.password,
          },
          responseType: 'blob',
          withCredentials: true,
        });

        const reader = new FileReader();
        reader.onloadend = () => {
          setCover(reader.result);
        };
        reader.readAsDataURL(response.data);
      } catch (error) {
        console.error(`Error fetching cover for book :`, error);
      }
    };

    fetchCover();
  }, []);

  /* const handlePress = () => {
    try {
      setClickDetails(true);
      navigate(
        `/book/bookDetail?book=${encodeURIComponent(JSON.stringify(book))}`
      );
    } catch (error) {
      console.error('Error navigating to book details:', error);
    } finally {
      setClickDetails(false);
    }
  };*/

  return (
    <div className="relative">
      {cover ? (
        <div
          /* onClick={handlePress}*/
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`cursor-pointer ${isHovered ? 'bg-gray-200' : ''} p-4`}
          style={{ width: '100%', maxWidth: '300px' }}
        >
          <img src={cover} alt="Book Cover" className="w-full object-contain" />

          {pathDirctory !== 'home' && (
            <div className="absolute top-4 right-4 bg-gray-600 text-white rounded-full p-2">
              {/*   <FontAwesomeIcon icon={faTrash} />*/}
            </div>
          )}

          <div className="mt-4">
            <h2 className="text-lg font-bold">
              {/*  {book.title.length > 40
                ? `${book.title.substring(0, 40)}...`
                : book.title}*/}
              sdfsdfsdf
            </h2>
            <p className="text-sm text-gray-600">
              ùsdfsdfsdf d
              {/* {book.author.length > 40
                ? `${book.author.substring(0, 40)}...`
                : book.author}*/}
            </p>
          </div>
        </div>
      ) : (
        <CardLoader />
      )}
    </div>
  );
};

export default BookCard;
