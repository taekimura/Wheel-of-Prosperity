import React from 'react';
import './Loading.scss';

const Loading = () => {
  return (
    <div id='background'>
      <div id='container'>
        <span></span>
        <span></span>
        <span></span>
        <p className='loading'>LOADING</p>
      </div>
    </div>
  );
};
export default Loading;
