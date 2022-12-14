import React from 'react';
import './components_css/SongRow.css';
import { useDataLayerValue } from '../ContextAPI/DataLayer';

function SongRow({ track }) {
  const [, dispatch] = useDataLayerValue();
  const handleOnClick = () => {
    dispatch({
      type: "SET_NOW_PLAYING",
      nowPlaying: track
    });
  };
  return (
    <div className='songRow'>
        <img className='songRow_album' src={track.album.images[0].url} alt="" onClick={handleOnClick} />
        <div className="songRow_info" >
            <h1 onClick={handleOnClick}>{track.name}</h1>
            <p>
                {track.artists.map((artist) => artist.name).join(", ")}
            </p>
        </div>        
    </div>
  )
}

export default SongRow
