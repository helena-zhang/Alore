import React, { useRef, useEffect, useState } from 'react';

const WebcamFeed = () => {
  const webcamRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWebcam = async () => {
      try {
        const constraints = {
          video: {
            facingMode: 'user' // or { exact: "environment" } for rear camera
          }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
        } else {
          throw new Error("Webcam ref is not attached");
        }
      } catch (err) {
        setError(err.message);
        console.error('Error accessing webcam:', err);
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
      <video ref={webcamRef} autoPlay playsInline className="webcam-video" />
    </div>
  );
};

export default WebcamFeed;
