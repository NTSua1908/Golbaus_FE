import React from 'react';
import './App.css';
import CreatePost from './pages/CreatePost/CreatePost';
import Header from './components/Header/Header';

const App = () => {
  return (
    <div className='App'>
      {/* <BasicEditor />
      <ShowCode content={mkdStr} /> */}
      {/* <CreatePost /> */}
      <Header />
    </div>
  );
};

export default App;
