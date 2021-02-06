import React from 'react';
import MapsMenu from '../MapsMenu/MapsMenu'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/esm/Button';
import './Home.css';

function Home() {
    return (
        <div className="home">
            <Jumbotron id="leading">
                <p>
                    The place to share and learn csgo stuff.
                </p>
                <p>
                    <Button variant="light">Let's roll!</Button>
                </p>
            </Jumbotron>
            <MapsMenu />
        </div>
    );
}

export default Home;