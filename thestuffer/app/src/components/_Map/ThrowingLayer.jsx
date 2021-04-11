import React, { useContext } from 'react';
import { LayerGroup } from 'react-leaflet';

import StuffDataContext from '../../context/StuffDataContext';

//import HeatmapLayer from 'react-leaflet-heatmap-layer';

const ThrowingLayer = ({ target }) => {
  const { getThrowingData } = useContext(StuffDataContext);

  const throwingData = getThrowingData(target);
  console.log(throwingData);

  return <div/>;
  // return (
  //   <HeatmapLayer
  //     points={throwingData}
  //     longitudeExtractor={(m) => m.lng}
  //     latitudeExtractor={(m) => m.lat}
  //     intensityExtractor={(m) => 100}
  //   />
  // );
};

export default ThrowingLayer;
