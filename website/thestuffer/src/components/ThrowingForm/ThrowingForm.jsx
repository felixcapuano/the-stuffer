import React, { useReducer } from 'react';

import './ThrowingForm.css';

const formReducer = (state, event) => {
 return {
   ...state,
   [event.name]: event.value
 }
}
const STUFF_HOST = process.env.REACT_APP_STUFF_HOST;
const STUFF_PORT = process.env.REACT_APP_STUFF_PORT;
const url = `http://${STUFF_HOST}:${STUFF_PORT}/stuff/throwing/create`

const ThrowingForm = () => {
  const [form, setForm] = useReducer(formReducer, {});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formFormatted = {
        "landing_id": form.landingId,
        "movement": form.movement,
        "position": {
            "lat": parseFloat(form.lat),
            "lng": parseFloat(form.lng),
            "floor": parseInt(form.floor),
        },
        "video": {
            "id": form.videoId,
            "time": parseInt(form.videoTime),
        },
        "tickrate": {
            "64": form.ticks64 ? true:false,
            "128": form.ticks128 ? true:false,
        },
        "description": form.description,
    }

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(formFormatted),
    }).then(res => res.json())
      .then(console.log);
  }

  const handleChange = event => {
    setForm({
      name: event.target.name,
      value: event.target.value,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Throwing form</h1>
      <fieldset>
        <label>Landing ID</label>
        <input type="text" name="landingId" id="landingId" onChange={handleChange}/>
      </fieldset>
      <fieldset>
        <label>Position</label>
        <label>lat</label>
        <input type="number" name="lat" id="lat" onChange={handleChange}/>
        <label>lng</label>
        <input type="number" name="lng" id="lng" onChange={handleChange}/>
        <label>floor</label>
        <input type="number" name="floor" id="floor" onChange={handleChange}/>
      </fieldset>
      <fieldset>
        <label>Video</label>
        <label>id</label>
        <input type="text" name="videoId" id="videoId" onChange={handleChange}/>
        <label>time</label>
        <input type="number" name="videoTime" id="videoTime" onChange={handleChange}/>
      </fieldset>
      <fieldset>
        <label>Movement</label>
        <select name="movement" id="movement" onChange={handleChange}>
          <option value="throw">Throw</option>
          <option value="jumpthrow">Jumpthow</option>
          <option value="runjumpthrow">Run Jumpthrow</option>
        </select>
      </fieldset>
      <fieldset>
        <label>Tickrate</label>
        <label>64</label>
        <input type="checkbox" name="ticks64" id="ticks64" onChange={handleChange}/>
        <label>128</label>
        <input type="checkbox" name="ticks128" id="ticks128" onChange={handleChange}/>
      </fieldset>
      <fieldset>
        <label>Description</label>
        <textarea name="description" id="description" cols="50" rows="3" onChange={handleChange}/>
      </fieldset>
      <input type="submit" value="submit" />
    </form>
  );
}

export default ThrowingForm;