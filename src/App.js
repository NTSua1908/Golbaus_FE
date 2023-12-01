import React from 'react';
import './App.css';
import CreatePost from './pages/CreatePost/CreatePost';

const App = () => {
  return (
    <div className='App'>
      {/* <BasicEditor />
      <ShowCode content={mkdStr} /> */}
      <CreatePost />
    </div>
  );
};

export default App;
