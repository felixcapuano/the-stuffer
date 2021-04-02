import React from 'react';

import './ThrowingForm.css';

const ThrowingForm = () => {
  return (
    <form>
      <h1>Throwing form</h1>
      <div>
        <label htmlFor="landingId">Landing ID</label>
        <input type="text" name="landingId" id="landingId" />
      </div>
      <div>Position</div>
      <div>
        <label htmlFor="video">Video</label>
        <label htmlFor="videoId">id</label>
        <input type="text" name="videoId" id="videoId"/>
        <label htmlFor="videoTime">time</label>
        <input type="number" name="videoTime" id="videoTime"/>
      </div>
      <div>
        <label htmlFor="movement">Movement</label>
        <select name="movement" id="movement">
          <option value="throw">Throw</option>
          <option value="jumpthrow">Jumpthow</option>
          <option value="runjumpthrow">Run Jumpthrow</option>
        </select>
      </div>
      <div>
        <label htmlFor="ticks">Tickrate</label>
        <label htmlFor="64ticks">64</label>
        <input type="checkbox" name="64ticks" id="64ticks" />
        <label htmlFor="128ticks">128</label>
        <input type="checkbox" name="128ticks" id="128ticks" />
      </div>
      <input type="submit" value="submit" />
    </form>
  );
}

export default ThrowingForm;