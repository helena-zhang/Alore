import React, { useRef, useEffect, useState } from 'react';

const ServerMedia = () => {
  const [gifSrc, setGifSrc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGif = async () => {
      try {
        const response = await fetch('https://192.168.4.82:8080/api/media', {
          method: 'POST',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const blob = await response.blob();
        setGifSrc(URL.createObjectURL(blob));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchGif();
  }, []);

  if (error) {
    return <div className="server-media">Error: {error}</div>;
  }

  return (
    <div className="server-media">
      {gifSrc ? (
        <img src={gifSrc} alt="Server fetched content" width="100%" />
      ) : (
        <p>No media available</p>
      )}
    </div>
  );
};

export default ServerMedia;
