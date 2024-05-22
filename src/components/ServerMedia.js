import React, { useRef, useEffect, useState } from 'react';

const ServerMedia = () => {
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/media', {
          method: 'POST',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const blob = await response.blob();
        setVideoSrc(URL.createObjectURL(blob));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchVideo();
  }, []);

  if (error) {
    return <div className="server-media">Error: {error}</div>;
  }

  return (
    <div className="server-media">
      {videoSrc ? (
        <video ref={videoRef} controls width="100%">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>No media available</p>
      )}
    </div>
  );
};

export default ServerMedia;
