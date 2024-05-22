import React from 'react';
import WebcamFeed from './WebcamFeed';
import ServerMedia from './ServerMedia';

const Main = () => {
  return (
    <main className="main">
      <ServerMedia />
      <WebcamFeed />
    </main>
  );
};

export default Main;
