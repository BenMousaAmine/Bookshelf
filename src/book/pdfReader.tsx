import React, { useEffect, useState, useRef } from 'react';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useNavigate, useParams } from 'react-router-dom';
import { load } from '../store/localstorage.ts';
import { BaseURL } from '../costants/environment.ts';
import axios from 'axios';
import { Progress, Slider } from '@material-tailwind/react';
import { MdOutlineArrowBackIos } from 'react-icons/md';

const PdfReader = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fileUrl, setFileUrl] = useState('');
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const viewerRef = useRef(null);

  const downloadBook = async () => {
    try {
      const userData = await load();
      if (!userData) {
        return;
      }
      const response = await axios({
        method: 'GET',
        url: `${BaseURL}/downloadpdf/${id}`,
        params: {
          username: userData.username,
          password: userData.password,
        },
        withCredentials: true,
        responseType: 'blob',
      });
      const fileBlob = response.data;
      const fileUrl = URL.createObjectURL(fileBlob);
      setFileUrl(fileUrl);
    } catch (error) {
      console.error('Error downloading the book:', error);
    }
  };

  useEffect(() => {
    downloadBook();
  }, [id]);

  const handlePageChange = (newPageNumber: number) => {
    setCurrentPage(newPageNumber);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <MdOutlineArrowBackIos
        className={'pt-2'}
        style={{ display: 'flex', alignSelf: 'flex-start' }}
        size={36}
        onClick={() => navigate('/library')}
      />
      <div className={'mt-6'} style={{ height: '90vh', width: '90vw' }}>
        {fileUrl ? (
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js`}
          >
            <Viewer
              fileUrl={fileUrl}
              plugins={[defaultLayoutPluginInstance]}
              onDocumentLoad={props => {
                setNumPages(props.doc.numPages);
              }}
              onPageChange={props => {
                handlePageChange(props.currentPage + 1);
              }}
              ref={viewerRef}
            />
          </Worker>
        ) : (
          <p>Loading PDF...</p>
        )}
      </div>
      <div className="pb-1.5" style={{ width: '90vwnp' }}>
        <Progress size={'lg'} color={'green'} value={currentPage} />
        <div
          className={'pt-2 m-2'}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <p>
            Page {currentPage} of {numPages}
          </p>
          <p>{Math.round((currentPage / numPages) * 100)}% read</p>
        </div>
      </div>
    </div>
  );
};

export default PdfReader;
