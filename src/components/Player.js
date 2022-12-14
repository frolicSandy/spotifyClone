import React from 'react';
import './components_css/Player.css';
import Sidebar from './Sidebar';
import Body from './Body';
import Footer from './Footer';
import { useDataLayerValue } from '../ContextAPI/DataLayer';

function Player() {
    const [{ nowPlaying }] = useDataLayerValue();

    return (
        <div className='player'>
            <div className="player_body">
                {/** Sidebar */}
                <Sidebar />
                {/** Body */}
                <Body />
            </div>
            {/** Footer */}
            {nowPlaying? <Footer /> : <></>}
        </div>
    );
}

export default Player