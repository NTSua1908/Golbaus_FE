import React from 'react';
import './App.scss';
import CreatePost from './pages/CreatePost/CreatePost';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div className='App'>
      {/* <BasicEditor />
      <ShowCode content={mkdStr} /> */}
      {/* <CreatePost /> */}
      <Header />
      <Footer />
    </div>
  );
};

export default App;
