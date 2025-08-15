import React from 'react';
import './App.css';
import Main from './components/Main';
import Layout from './components/layout';
import Header from './components/Header';
import { BrowserRouter, Route,Routes } from 'react-router-dom';


const App = ()=>{
  return(
    <BrowserRouter>
       <Header/>
       <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element = {<Main/>}/>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
