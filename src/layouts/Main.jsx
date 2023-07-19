
// import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Components/shared/NavBar/NavBar';

const Main = () => {
  return (
    <div>
     <NavBar></NavBar>
     <div className='pt-28 pb-20'>
      <Outlet></Outlet>
     </div>
    </div>
  );
};

export default Main;