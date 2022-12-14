import React from 'react';
import './components_css/SidebarOption.css';
import { useDataLayerValue } from '../ContextAPI/DataLayer';
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function SidebarOption({ title, Icon }) {
    const [, dispatch] = useDataLayerValue();

    const handleClick = (title) => {
        dispatch({
            type: 'SET_CURRENT_PLAYLIST',
            current_playlist: title
        });
    };

    const handlePrimaryClick = (title) => {
        if (title === 'Home')
            spotify.getPlaylist('37i9dQZF1F0sijgNaJdgit').then((response) => {
                dispatch({
                    type: "SET_CURRENT_PLAYLIST",
                    current_playlist: response
                });
            });
        if (title === 'Your Library')
            dispatch({
                type: "SET_LIBRARY_VISIBLE",
                libraryVisible: true
            })
    }

    return (
        <div className='sidebarOption'>
            {Icon && <Icon className='sidebarOption_icon' />}
            {Icon? <h4 onClick={() => handlePrimaryClick(title)}>{title}</h4> : <p onClick={() => handleClick(title)}>{title?.name}</p>}
        </div>
    )
}

export default SidebarOption
