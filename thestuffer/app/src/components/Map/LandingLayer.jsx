import React, { useEffect, useState } from 'react';
import { LayerGroup, LayersControl, Marker } from 'react-leaflet';
import L from 'leaflet';

import { stuffInstance } from '../../axios';

// ############ MARKERS ############
const _urlOrigin = window.location.origin;
const ICON_SIZE = 30;
const createIcon = (path) =>
  L.icon({
    iconUrl: _urlOrigin + '/' + path,
    iconSize: [ICON_SIZE, ICON_SIZE], // size of the icon
    iconAnchor: [ICON_SIZE / 2, ICON_SIZE / 2], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
  });

const icons = {
  smoke: createIcon('images/icons/smoke.png'),
  flash: createIcon('images/icons/flash.png'),
  molotov: createIcon('images/icons/molotov.png'),
};

const markerTypes = ['smoke', 'molotov', 'flash'];

const LandingLayer = ({ map, setTarget, target }) => {
  const [{ hits, isLoading, error }, setData] = useState({
    hits: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    setData({ isLoading: true });

    if (target) {
      stuffInstance
        .get(`/stuff/landing/get/${target}`)
        .then((res) => {
          setData({ isLoading: false, hits: [res.data.hit] });
        })
        .catch((error) => setData({ isLoading: false, error }));
    } else {
      const payload = {
        collection: 'landing',
        map: map.name,
        position: { floor: map.floor },
      };

      stuffInstance
        .post('/stuff/search', payload)
        .then((res) => {
          if (!res.data.ok) throw new Error(res.data.message);
          setData({ isLoading: false, hits: res.data.hits });
        })
        .catch((error) => {
          console.log(error);
          setData({ isLoading: false, error });
        });
    }
  }, [setData, map, target]);

  if (isLoading) return 'Loading...';
  if (error) return 'error';

  const handlerMarker = {
    click: (e) => {
      const landingId = e.target.options.dataId;
      setTarget(target ? null : landingId);
    },
  };

  const createMarker = (hit) => (
    <Marker
      dataId={hit._id}
      key={hit._id}
      position={[hit.position.lat, hit.position.lng]}
      eventHandlers={handlerMarker}
      icon={icons[hit.type]}
    />
  );

  const landingMarkers = (_type) => {
    return hits.map((h) => (h.type === _type ? createMarker(h) : null));
  };

  const stuffOverLay = (markersList) => {
    return markersList.map((mrk) => (
      <LayersControl.Overlay checked name={mrk} key={mrk}>
        <LayerGroup>{landingMarkers(mrk)}</LayerGroup>
      </LayersControl.Overlay>
    ));
  };

  return (
    <LayersControl collapsed={false}>{stuffOverLay(markerTypes)}</LayersControl>
  );
};

export default LandingLayer;
