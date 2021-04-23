import React from 'react';

import './Showcase.css';

const Showcase = ({ children }) => {
  return (
    <div className='showcase'>
      {children}
    </div>
  );
};

export default Showcase;
