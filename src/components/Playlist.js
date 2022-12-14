import React from 'react'

function Playlist({ playlist }) {
    return (
        <div>
            <h2>Playlist {playlist?.name}</h2>
        </div>
    );
}

export default Playlist
