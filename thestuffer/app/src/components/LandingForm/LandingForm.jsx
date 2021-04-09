import React from 'react';

import './LandingForm.css';

const LandingForm = () => {
  return (
    <form>
      <h1>Landing form</h1>
      <fieldset>
        <label htmlFor="type">Map</label>
        <select name="type" id="type">
          <option value="dust2">dust 2</option>
          <option value="inferno">inferno</option>
          <option value="mirage">mirage</option>
          <option value="nuke">nuke</option>
          <option value="vertigo">vertigo</option>
          <option value="train">train</option>
          <option value="overpass">overpass</option>
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="video">Position</label>
        <label htmlFor="lat">lat</label>
        <input type="number" name="lat" id="lat"/>
        <label htmlFor="lng">lng</label>
        <input type="number" name="lng" id="lng"/>
      </fieldset>
      <fieldset>
        <label htmlFor="type">Type</label>
        <select name="type" id="type">
          <option value="smoke">smoke</option>
          <option value="molotov">molotov</option>
          <option value="flash">flash</option>
        </select>
      </fieldset>
      <input type="submit" value="submit"/>
    </form>
  );
}

export default LandingForm;