import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { CSSProperties, useEffect, useState } from 'react';
import { load } from '../store/localstorage.ts';
import axios from 'axios';
import { BaseURL } from '../costants/environment.ts';
import './DownloadBar.css';
import { appColor } from '../costants/colors.ts';
import { Button, Typography } from '@material-tailwind/react';
import { FaDownload } from 'react-icons/fa';
import { Book } from '../interface/Books.ts';
import { MdOutlineArrowBackIos } from 'react-icons/md';

const BookDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { book } = location.state || {};
  const [downloadInProgress, setDownloadInProgress] = useState(false);
  const [finishedDownload, setFinshedDownload] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cover, setCover] = useState<string | undefined>(undefined);
  useEffect(() => {
    const fetchCover = async () => {
      try {
        const userData = await load();
        if (!userData) {
          return;
        }
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
          const base64data = reader.result as string;
          setCover(base64data);
        };
        reader.readAsDataURL(response.data);
      } catch (error) {
        console.error(
          `Errore nel recupero della copertina del libr xo ${book.id}:`,
          error
        );
      }
    };

    fetchCover();
    return () => {
      if (cover) {
        URL.revokeObjectURL(cover);
      }
    };
  }, [book.id]);

  const [bookExist, setBookExist] = useState(false);
  useEffect(() => {
    const controllBookExist = async () => {
      try {
        const downloadedBooks = JSON.parse(
          localStorage.getItem('downloadedBooks') || '[]'
        );
        if (downloadedBooks.find((b: Book) => b.id === book.id)) {
          setBookExist(true);
          return;
        }
      } catch (error) {
        console.error('Error checking book exist:', error);
      }
    };

    controllBookExist();
  }, []);

  const saveBookToLibrary = () => {
    try {
      const downloadedBooks = JSON.parse(
        localStorage.getItem('downloadedBooks') || '[]'
      );
      if (downloadedBooks.find((b: Book) => b.id === book.id)) {
        alert('Book already in library');
        return;
      }
      downloadedBooks.push({
        id: book.id,
        title: book.title,
        author: book.author,
        cover: cover,
      });

      localStorage.setItem('downloadedBooks', JSON.stringify(downloadedBooks));
      const STORAGE_KEY = `pdfProgress_${book.id}`;
      localStorage.setItem(STORAGE_KEY, '1');
      setBookExist(true);
      alert('Book saved to library');
    } catch (error) {
      console.error('Error saving book to library:', error);
    }
  };

  if (!book) {
    return <p>No book found</p>;
  }

  return (
    <div style={bookStyle.container}>
      <MdOutlineArrowBackIos
        style={{ display: 'flex', alignSelf: 'flex-start' }}
        size={36}
        onClick={() => navigate('/home')}
      />

      {cover ? (
        <img alt="Cover" src={cover} style={bookStyle.image} />
      ) : (
        <p>Loading...</p>
      )}
      <div>
        <Typography variant="h4" className={'mt-4'} style={bookStyle.title}>
          {book.title}
        </Typography>
        <Typography variant={'paragraph'} style={bookStyle.writerText}>
          {book.author}
        </Typography>
        <Typography variant="h6" style={bookStyle.subtitle}>
          Published :{' '}
          <Typography variant={'paragraph'} style={{ marginLeft: 2 }}>
            {' '}
            Not available
          </Typography>
        </Typography>
        <Typography variant="h6" style={bookStyle.subtitle}>
          Length :{' '}
          <Typography variant={'paragraph'} style={{ marginLeft: 2 }}>
            {' '}
            Not available
          </Typography>
        </Typography>
        <Typography variant={'paragraph'} style={{ marginTop: 10 }}>
          {book.synopsis}
        </Typography>
      </div>
      <footer style={footerStyle}>
        <div style={bookStyle.footerContainer}>
          {downloadInProgress ? (
            <DownloadBar progress={progress} />
          ) : finishedDownload || bookExist ? (
            <Button
              variant={'outlined'}
              style={{
                backgroundColor: '#F9FAFB',
                width: '20rem',
                height: '3rem',
                marginTop: '1%',
                borderRadius: 12,
              }}
              onClick={() => navigate('/reader/' + book.id)}
            >
              Read
            </Button>
          ) : (
            <Button
              variant={'outlined'}
              style={{
                backgroundColor: '#F9FAFB',
                width: '20rem',
                height: '3rem',
                marginTop: '1%',
                borderRadius: 12,
              }}
              onClick={saveBookToLibrary}
            >
              Add to library
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default BookDetail;

interface DownloadBarProps {
  progress: number;
}
const DownloadBar: React.FC<DownloadBarProps> = ({ progress }) => {
  return (
    <div className="download-bar">
      <div className="progress" style={{ width: `${progress}%` }}></div>
      <div className="label">
        <FaDownload className="download-icon" />
        Downloading {progress}%
      </div>
    </div>
  );
};
export const bookStyle: Record<string, CSSProperties> = {
  container: {
    padding: '20%',
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '7%',
  },
  image: {
    width: '30rem',
    aspectRatio: '1',
  },
  content: {
    padding: 20,
  },
  title: {},
  writer: {
    flexDirection: 'row',
  },
  writerText: {
    marginBottom: '2%',
  },
  subtitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  bottomConatiner: {
    backgroundColor: appColor.blue_title,
    position: 'absolute',
    bottom: '0%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: '12%',
    borderEndStartRadius: 20,
    borderEndEndRadius: 20,
  },
  progressConatiner: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: '2%',
    justifyContent: 'center',
  },
  progressBar: {
    backgroundColor: 'green',
    height: '100%',
    borderRadius: 12,
  },
  btn: {
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2%',
  },
  btnHovered: {
    backgroundColor: appColor.blue_button_hover,
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
};
const footerStyle = {
  position: 'fixed',
  bottom: 0,
  width: '100vw',
  backgroundColor: appColor.blue_title,
  color: 'white',
  height: '10vh',
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
} as React.CSSProperties;
