
import React, { useState } from 'react';
import { Row, Col, Input } from 'antd';
import axios from 'axios';

const CallingHome = (props) => {
    const { history } = props;
    const [roomCode, setRoomCode] = useState('');

    const onCreateRoom = () => {
        axios.post(`api/create-room`).then((res) => {
            history.push(`/room/${res.data.code}`);
        });
    }

    const onJoinRoom = () => {
            axios.get(`api/get-room/${roomCode}`).then((res) => {
                history.push(`/room/${res.data.code}`);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <>
            <Row style={{ height: '100%' }}>
                <Col span={24}>
                    <button
                        className='button__primary'
                        onClick={onCreateRoom}
                        style={{ marginBottom: '30px' }}
                    >
                        Create Room
                     </button>

                    <Input
                        style={{
                            display: 'block',
                            width: '500px',
                            height: '40px',
                            marginBottom: '10px'
                        }}
                        onChange={(input) => setRoomCode(input.target.value)}
                        name='room-code'
                    />
                    <button
                        className='button__primary'
                        onClick={onJoinRoom}
                    >
                        Join Room
                     </button>
                </Col>
                <Col span={24}>

                </Col>
            </Row>
        </>
    )
};

export default CallingHome;
