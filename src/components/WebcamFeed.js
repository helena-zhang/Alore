import React, { useRef, useEffect, useState } from 'react';

const WebcamFeed = () => {
  const webcamRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
          setStreaming(true);
        } else {
          throw new Error("Webcam ref is not attached");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    getWebcam();

    return () => {
      if (webcamRef.current && webcamRef.current.srcObject) {
        webcamRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  if (error) {
    return <div className="webcam-container">Error: {error}</div>;
  }

  return (
    <div className="webcam-container">
      <video ref={webcamRef} autoPlay playsInline className="webcam-video" style={{ display: streaming ? 'block' : 'none' }} />
      {!streaming && <p>Loading camera...</p>}
    </div>
  );
};

export default WebcamFeed;
