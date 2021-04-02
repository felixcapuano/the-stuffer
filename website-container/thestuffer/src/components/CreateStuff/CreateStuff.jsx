import React from 'react';
import { useParams } from 'react-router-dom';

import { ThrowingForm } from '../ThrowingForm';
import { LandingForm } from '../LandingForm';

import './CreateStuff.css';

const CreateStuff = () => {

  const { type } = useParams();

  const formSelection = () => {
    switch (type) {
      case 'throwing': return <ThrowingForm />
      case 'landing': return <LandingForm />
      default: return 'Not Found'
    }
  };

  return (
    <div>
      CreateStuff (type: {type})
      { formSelection() }
    </div>
  );
}

export default CreateStuff;