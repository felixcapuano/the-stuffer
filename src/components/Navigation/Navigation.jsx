import React from 'react';
import './Navigation.css';
import { withRouter } from 'react-router-dom';

function Navigation(props) {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">TheStuffer</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03"
                    aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsExample03">
                    <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Map</a>
                            <ul className="dropdown-menu" aria-labelledby="dropdown03">
                                <li><a className="dropdown-item" href="/stuffhub?m=de_mirage">de_mirage</a></li>
                                <li><a className="dropdown-item" href="/stuffhub?m=de_dust2">de_dust2</a></li>
                                <li><a className="dropdown-item" href="/stuffhub?m=de_inferno">de_inferno</a></li>
                                <li><a className="dropdown-item" href="/stuffhub?m=de_nuke">de_nuke</a></li>
                                <li><a className="dropdown-item" href="/stuffhub?m=de_train">de_train</a></li>
                                <li><a className="dropdown-item" href="/stuffhub?m=de_vertigo">de_vertigo</a></li>
                                <li><a className="dropdown-item" href="/stuffhub?m=de_overpass">de_overpass</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="/help" disabled>Help</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="/patch">Patch Notes</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="/about">About</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default withRouter(Navigation);