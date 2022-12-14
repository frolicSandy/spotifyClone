import React from 'react';
import './components_css/Body.css';
import Header from './Header';
import SongRow from './SongRow';
import { useDataLayerValue } from '../ContextAPI/DataLayer';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function Body() {
    const [{ current_playlist }] = useDataLayerValue();
    return (
            <div className='body'>
                <Header />
                <div className="body_info">
                    <img src={current_playlist?.images[0]?.url} alt="" />
                    <div className="body_infoText">
                        <strong>PLAYLIST</strong>
                        <h2>{current_playlist?.name}</h2>
                        <p>{current_playlist?.description}</p>
                    </div>
                </div>
                <div className="body_songs">
                    <div className="body_icons">
                        <PlayCircleFilledIcon className='body_shuffle' />
                        <FavoriteIcon fontSize='large' />
                        <MoreHorizIcon />
                    </div>
                    {/** List of Songs */}
                    {current_playlist?.tracks?.items?.map(item => (
                        <SongRow track={item?.track} key={item?.track?.id} />
                    ))}
                </div>
            </div>
  )
}

export default Body