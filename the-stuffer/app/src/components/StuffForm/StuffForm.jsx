import React, { useState } from 'react';
import './StuffForm.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function StuffForm(props) {

    const [youtubeId, setYoutubeId] = useState('');
    const [youtubeTime, setYoutubeTime] = useState(0);
    const [ticks64, setTicks64] = useState(true);
    const [ticks128, setTicks128] = useState(true);
    const [throwType, setThrowType] = useState('jump');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        console.log({
            hit_id: 0,
            lat: 0,
            lng: 0,
            type: throwType,
            yt_id: youtubeId,
            yt_start_time: youtubeTime,
            ticks64: ticks64,
            ticks128: ticks128,
            description: description,
            validated: false,
            likes: 0,
            dislikes: 0,
            reported: [],
            count: 1,
        })

        e.preventDefault();
    }

    const handleLink = (e) => {
        //format regex youtube link and time
    }

    return (
        <Form onSubmit={e => { handleSubmit(e) }}>
            <Form.Group controlId="formVideoLink">
                <Form.Label>Youtube link :</Form.Label>
                <Form.Control type='text'
                    onChange={e => { handleLink(e) }}
                />
                <Form.Text> Id : {youtubeId}, Start time : {youtubeTime}</Form.Text>
            </Form.Group>

            <Form.Group controlId='formTicks'>
                <Form.Label>Throw Type :</Form.Label>
                <Form.Check inline custom type='radio' defaultChecked
                    label='64 ticks'
                    name='ticks'
                    id='ticks-64'
                />
                <Form.Check inline custom type='radio'
                    label='128 ticks'
                    name='ticks'
                    id='ticks-128'
                />
                <Form.Check inline custom type='radio'
                    label='64 and 128 ticks'
                    name='ticks'
                    id='ticks-64-128'
                />
            </Form.Group>

            <Form.Group controlId='formThrowType'>
                <Form.Label>Throw Type :</Form.Label>
                <Form.Check inline custom type='radio' defaultChecked
                    label='Throw'
                    name='throw-type'
                    id='throw'
                />
                <Form.Check inline custom type='radio'
                    label='Jumpthrow'
                    name='throw-type'
                    id='jumpthrow'
                />
                <Form.Check inline custom type='radio'
                    label='Run Jumpthrow'
                    name='throw-type'
                    id='runjumpthrow'
                />
            </Form.Group>

            <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>

            <Form.Group>
                <Button variant='light' type="submit">Submit</Button>
            </Form.Group>
        </Form>
    );
}

export default StuffForm;