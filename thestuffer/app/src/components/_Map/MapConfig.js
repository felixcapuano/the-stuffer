import L from 'leaflet';

const _urlOrigin = window.location.origin;
// ############ MAP CONFIG ############
const corner1 = L.latLng(180, -180);
const corner2 = L.latLng(-180, 180);
const limitBounds = L.latLngBounds(corner1, corner2);
const MAP_CONFIG = {
  center: [0, 0],
  zoom: 1,
  maxBounds: limitBounds,
  maxBoundsViscosity: 0.5,
  inertia: false,
  scrollWheelZoom: false,
};

// ############ TILES ############
const createTilesLayer = (mapName) =>
  L.tileLayer(_urlOrigin + '/images/maps/{map}/{z}/{y}/{x}.png', {
    map: mapName,
    minZoom: 0,
    maxZoom: 3,
    noWrap: true,
    errorTileUrl: _urlOrigin + 'images/maps/tiles/empty.png',
  });

// ############ MARKERS ############
const ICON_SIZE = 40;
const mrk_ico = {
  smoke: _urlOrigin + 'images/icons/smoke.png',
  flash: _urlOrigin + 'images/icons/flash.png',
  molotov: _urlOrigin + 'images/icons/molotov.png',
};
const createIcon = (type) =>
  L.icon({
    iconUrl: mrk_ico[type],
    iconSize: [ICON_SIZE, ICON_SIZE], // size of the icon
    iconAnchor: [ICON_SIZE / 2, ICON_SIZE / 2], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
  });

// ########## HEATMAP #############
const HEATMAP_CONFIG = {
  // radius should be small ONLY if scaleRadius is true (or small radius is intended)
  // if scaleRadius is false it will be the constant radius used in pixels
  radius: 2,
  maxOpacity: 0.8,
  // scales the radius based on map zoom
  scaleRadius: true,
  // if set to false the heatmap uses the global maximum for colorization
  // if activated: uses the data maximum within the current map boundaries
  //   (there will always be a red spot with useLocalExtremas true)
  useLocalExtrema: true,
  // which field name in your data represents the latitude - default "lat"
  latField: 'lat',
  // which field name in your data represents the longitude - default "lng"
  lngField: 'lng',
  // which field name in your data represents the data value - default "value"
  valueField: 'count',
};

export { MAP_CONFIG, HEATMAP_CONFIG, createTilesLayer, createIcon };
