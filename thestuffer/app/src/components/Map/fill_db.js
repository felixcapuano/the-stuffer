import { stuffInstance } from '../../axios';

const HIT_LEN = 10;
const THROW_LEN = 100;

const filler = () => {
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
    stuffInstance.post('/create', landData).then((data) => {
      console.log(data);
    });
  }

  //for (let i = 0; i < THROW_LEN; i++) {
  //  const throwData = {
  //    id: i,
  //    hit_id: Math.floor(Math.random() * HIT_LEN),
  //    lat: parseFloat((Math.random() * 180 - 90).toFixed(2)),
  //    lng: parseFloat((Math.random() * 360 - 180).toFixed(2)),
  //    type: 'jumpthrow',
  //    yt_id: 'PtxMYGxQ9Zc',
  //    yt_start_time: 133,
  //    ticks64: true,
  //    ticks128: true,
  //    description: 'je suis une description',
  //    validated: false,
  //    likes: 0,
  //    dislikes: 0,
  //    reported: [],
  //    count: 1,
  //  };
  //}
};

export { filler };
