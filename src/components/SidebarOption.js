import React from 'react';
import './components_css/SidebarOption.css';
import { useDataLayerValue } from '../ContextAPI/DataLayer';
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function SidebarOption({ title, Icon, id }) {
    const [, dispatch] = useDataLayerValue();

    /** id retrieved from the playlist is used to retrieve the playlist itself along with its details, tracks, etc... */
    const handleClick = (id) => {
        spotify.getPlaylist(id).then((response) => {
            dispatch({
                type: "SET_CURRENT_PLAYLIST",
                current_playlist: response
            });
        });
    };

    const handlePrimaryClick = (title) => {
        if (title === 'Home')
            /** Searches for playlists with the name "Spotify Wrapped" and then retrieves the playlist, extracts its id
             * and sets it to global state.
             */
            spotify.searchPlaylists('Top 50').then((response) => {
                spotify.getPlaylist(response?.playlists?.items[0]?.id).then((response) => {
                    dispatch({
                        type: "SET_CURRENT_PLAYLIST",
                        current_playlist: response
                    });
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
            {Icon? <h4 onClick={() => handlePrimaryClick(title)}>{title}</h4> : <p onClick={() => handleClick(id)}>{title?.name}</p>}
        </div>
    )
}

export default SidebarOption
