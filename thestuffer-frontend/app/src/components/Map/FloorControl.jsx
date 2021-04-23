import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

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

    if (isNaN(floor) || floor === map.floor) return;

    updateMap({ ...map, floor });
  };

  const floorButtons = () => {
    const buttons = [];
    for (let f = 0; f < floors[map.name]; f++) {
      buttons.push(
        <ToggleButton
          variant='dark'
          key={f}
          type='radio'
          onClick={clickHandler}
          checked={f === map.floor}
          value={f}
        >
          {(-f).toString()}
        </ToggleButton>
      );
    }
    return buttons;
  };

  return (
    <div className='leaflet-bottom leaflet-center'>
      <div className='leaflet-control leaflet-bar'>
        <ButtonGroup toggle vertical>
          {floorButtons()}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default FloorControl;
