import React from 'react';
import './SelectionView.css';

import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

function SelectionView(props) {
    const stuffData = props.data;

    const stuffCard = (stuff) => {
        const url = `https://www.youtube.com/embed/${stuff.yt_id}?start=${stuff.yt_start_time}`;
        return (
            <Carousel.Item>
                <Card id="stuff-card">
                <Row noGutters={false}>
                <Col>
                    <iframe src= {url}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                        allowFullScreen></iframe>

                </Col>
                <Col>
                    <div>
                    {stuff.ticks64 && <Badge pill variant="info">64 ticks</Badge>}
                    {stuff.ticks128 && <Badge pill variant="info">128 ticks</Badge>}
                    </div>
                    <Card.Title>ID : {stuff.id}</Card.Title>
                    <Card.Text>type : {stuff.type}</Card.Text>
                    <Button variant="success">Likes <Badge variant="light">{stuff.likes}</Badge></Button>
                    <Button variant="danger">Dislikes <Badge variant="light">{stuff.dislikes}</Badge></Button>
                    <Button variant="outline-danger">Report</Button>
                </Col>
                </Row>
                </Card>
            </Carousel.Item>
        );
    }

    const cards = stuffData.map(stuffCard);

    return (
        <div>
            { stuffData.length !== 0 &&
                <Carousel interval={null}
                        indicators={false}>
                    {cards}
                </Carousel>
            }
        </div>
    );
}

export default SelectionView;
