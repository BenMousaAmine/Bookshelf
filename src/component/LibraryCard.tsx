import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { load } from '../store/localstorage.ts';
import { BaseURL } from '../costants/environment.ts';
import CardLoader from './cardLoader.tsx';
import { BookCardProps, LibraryCardProps } from '../interface/Books.ts';
import { FaRegTrashAlt } from 'react-icons/fa';
import login from '../auth/login.tsx';

const LibraryCard: React.FC<LibraryCardProps> = ({ book, onDelete }) => {
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

  const deleteBook = async (event: React.MouseEvent) => {
    event.stopPropagation();
    const downloadedBooks = localStorage.getItem('downloadedBooks');
    const downloadedBooksArray = downloadedBooks
      ? JSON.parse(downloadedBooks)
      : [];
    const newDownloadedBooks = downloadedBooksArray.filter(
      (item: any) => item.id !== book.id
    );
    localStorage.setItem('downloadedBooks', JSON.stringify(newDownloadedBooks));
    onDelete(book.id);
  };

  return (
    <>
      {cover ? (
        <div
          onClick={() => navigate('/reader/' + book.id)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`cursor-pointer ${isHovered ? 'bg-gray-200' : ''} p-4`}
          style={{ width: '100%', maxWidth: '300px', height: '100%' }}
        >
          <img src={cover} alt="Book Cover" className="w-full object-contain" />

          <button
            className="absolute bottom-28 right-6 bg-gray-600 hover:bg-gray-800 text-white rounded-full p-2 "
            onClick={deleteBook}
          >
            <FaRegTrashAlt />
          </button>

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

export default LibraryCard;
