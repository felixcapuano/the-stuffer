import React from 'react';
import './StuffHub.css';
import GameMap from '../GameMap/GameMap'
import Carousel from '../Carousel/Carousel';

function StuffHub() {
    return (
        <div className='stuffhub'>
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary active">
                    <input type="checkbox" name="disp-stuff" id="toggle-smoke" autocomplete="off" checked /> Smoke
                </label>
                <label class="btn btn-secondary">
                    <input type="checkbox" name="disp-stuff" id="toggle-molotov" autocomplete="off" checked /> Molotov
                </label>
                <label class="btn btn-secondary">
                    <input type="checkbox" name="disp-stuff" id="toggle-flash" autocomplete="off" checked /> Flash
                        </label>
            </div>
            <GameMap />
            <Carousel />
        </div>
    );
}

export default StuffHub;