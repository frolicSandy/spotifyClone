import React, { useEffect, useState } from 'react'
import './components_css/Header.css';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import { useDataLayerValue } from '../ContextAPI/DataLayer';
import SpotifyWebApi from "spotify-web-api-js";
import SongRow from './SongRow';

const spotify = new SpotifyWebApi();

function Header() {
    const [{ user, searchResult }, dispatch] = useDataLayerValue();
    /** state variable for search parameter */
    const [searchParam, setSearchParam] = useState("");
    useEffect(() => {
        if(searchParam)
            spotify.searchTracks(searchParam).then((response) => {
                dispatch({
                    type: 'SET_SEARCH_RESULTS',
                    payload: response
                });
            });
    },[searchParam, dispatch]);
    
    return (
        <>
            <div className='header'>
                <div className="header_left">
                    <SearchIcon />
                    <input 
                        placeholder='Search for artists, songs and podcasts'
                        type="text"
                        name='searchParam'
                        value={searchParam}
                        onChange={(e) => setSearchParam(e.target.value)}
                        />
                    {searchParam?
                        <div className='searchResults'>
                            {searchResult.map((track) => <SongRow track={track} key={track.id} />)}
                        </div>:<></>
                    }
                </div>
                
                <div className="header_right">
                    {/** ?. --> Optional chaining --> tries to chain a property retrieval only if it makes sense without throwing a TypeError */}
                    <Avatar src={user?.images[0]?.url} alt={user?.display_name || 'User'} />
                    <h4>{user?.display_name || 'User'}</h4>
                </div>
                
            </div>
            
        </>
    );
}

export default Header
