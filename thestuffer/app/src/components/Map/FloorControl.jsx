import Button from 'react-bootstrap/Button';

const floors = {
  de_mirage: 1,
  de_dust2: 1,
  de_inferno: 1,
  de_nuke: 2,
  de_vertigo: 2,
  de_overpass: 1,
  de_train: 1,
};

const FloorControl = ({ map, updateMap }) => {
  const clickHandler = (e) => {
    const floor = parseInt(e.target.value);
    updateMap({ ...map, floor });
  };

  const floorButtons = () => {
    const buttons = [];
    for (let f = 0; f < floors[map.name]; f++) {
      buttons.push(
        <Button variant='dark' key={f} onClick={clickHandler} value={f}>
          {f.toString()}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <div className='leaflet-bottom leaflet-center'>
      <div className='leaflet-control leaflet-bar'>{floorButtons()}</div>
    </div>
  );
};

export default FloorControl;
