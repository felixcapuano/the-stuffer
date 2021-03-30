import React from 'react';
import { useParams } from 'react-router-dom';

import './CreateStuff.css';

const CreateStuff = () => {

  const { type } = useParams();

  return (
    <div>
      CreateStuff (type: {type})
    </div>
  );
}

export default CreateStuff;