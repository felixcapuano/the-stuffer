import { stuffInstance } from '../../axios';

const HIT_LEN = 10;
const THROW_LEN = 100;

const throwingFiller = async (rep) => {
  for (let i = 0; i < THROW_LEN; i++) {
    const throwData = {
      collection: 'throwing',
      landing_id: rep.data._id,
      position: {
        lat: parseFloat((Math.random() * 180 - 90).toFixed(2)),
        lng: parseFloat((Math.random() * 360 - 180).toFixed(2)),
        floor: 0,
      },
      movement: 'jumpthrow',
      video: {
        id: 'PtxMYGxQ9Zc',
        time: 133,
      },
      tickrate: {
        64: true,
        128: true,
      },
      description: 'je suis une description',
    };

    await stuffInstance.post('/stuff/create', throwData);
    console.log('throwing');
  }
};

const filler = async () => {
  for (let i = 0; i < HIT_LEN; i++) {
    const landData = {
      collection: 'landing',
      map: 'de_mirage',
      type: ['smoke', 'flash', 'molotov'][Math.floor(Math.random() * 3)],
      position: {
        lat: parseFloat((Math.random() * 180 - 90).toFixed(2)),
        lng: parseFloat((Math.random() * 360 - 180).toFixed(2)),
        floor: 0,
      },
    };
    const res = await stuffInstance.post('/stuff/create', landData);
    console.log('landing');

    await throwingFiller(res);
  }
};

export { filler };
