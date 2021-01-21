import React from 'react';
import './MapsGrid.css';

// images imports
import img_mirage from './thumbnails/de_mirage.jpg'
import img_dust2 from './thumbnails/de_dust2.jpg'
import img_inferno from './thumbnails/de_inferno.jpg'
import img_nuke from './thumbnails/de_nuke.jpg'
import img_vertigo from './thumbnails/de_vertigo.jpg'
import img_overpass from './thumbnails/de_overpass.jpg'
import img_train from './thumbnails/de_train.jpg'

function MapsGrid() {
    const imgs = {
        "Mirage":   img_mirage,
        "Dust 2":   img_dust2,
        "Inferno":  img_inferno,
        "Nuke":     img_nuke,
        "Vertigo":  img_vertigo,
        "Overpass": img_overpass,
        "Train":    img_train,
    }

    const gridCases = []
    for (const mapName in imgs) {
        gridCases.push(
            <div className="col-3">
                <a href={"/stuffhub?m="+mapName.toLowerCase()}><div className="thumbnail">
                    <img src={imgs[mapName]} className="img-fluid" id="thumb-img" alt={mapName}></img>
                    <div className="bottom-left">{mapName}</div>
                </div></a>
            </div>
        )
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                {gridCases}
            </div>
        </div>
    );
}

export default MapsGrid;