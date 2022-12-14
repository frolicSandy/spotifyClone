import React from 'react'
import './components_css/Header.css';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import { useDataLayerValue } from '../ContextAPI/DataLayer';

function Header() {
    const [{ user }] = useDataLayerValue();

    return (
        <div className='header'>
            <div className="header_left">
                <SearchIcon />
                <input 
                    placeholder='Search for artists, songs and podcasts'
                    type="text"
                    />
            </div>
            <div className="header_right">
                {/** ?. --> Optional chaining --> tries to chain a property retrieval only if it makes sense without throwing a TypeError */}
                <Avatar src={user?.images[0]?.url} alt={user?.display_name || 'User'} />
                <h4>{user?.display_name || 'User'}</h4>
            </div>
        </div>
    );
}

export default Header
