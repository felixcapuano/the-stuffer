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
  smoke: {
    classic: createIcon('images/icons/smoke.png'),
    highlight: createIcon('images/icons/smoke_h.png'),
  },
  flash: {
    classic: createIcon('images/icons/flash.png'),
    highlight: createIcon('images/icons/flash_h.png'),
  },
  molotov: {
    classic: createIcon('images/icons/molotov.png'),
    highlight: createIcon('images/icons/molotov_h.png'),
  },
};

const markerTypes = ['smoke', 'molotov', 'flash'];

const LandingLayer = ({
  map,
  setTarget,
  target,
  disabledMarker,
  throwError,
}) => {
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
          const hits = res.data.hit ? [res.data.hit] : [];
          setData({ isLoading: false, hits });
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
          setData({ isLoading: false, hits: res.data.hits || [] });
        })
        .catch((error) => setData({ isLoading: false, error }));
    }
  }, [setData, map, target]);

  if (isLoading) return 'Loading...';
  if (error) return 'error';

  const handlerMarker = {
    click: (e) => {
      if (disabledMarker) return;
      const landingId = e.target.options.dataId;
      setTarget(target ? null : landingId);
    },
  };

  const createMarker = (hit, highlighted) => (
    <Marker
      dataId={hit._id}
      key={hit._id}
      position={[hit.position.lat, hit.position.lng]}
      eventHandlers={handlerMarker}
      icon={icons[hit.type][highlighted ? 'highlight' : 'classic']}
    />
  );

  const landingMarkers = (_type) => {
    return hits.map((h) => (h.type === _type ? createMarker(h, target) : null));
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
