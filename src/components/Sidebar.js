import React, { useEffect } from 'react';
import './components_css/Sidebar.css';
import SidebarOption from './SidebarOption';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useDataLayerValue } from '../ContextAPI/DataLayer';

function Sidebar() {
    /** Retreiving user's playlists info from the data layer */
    const [{ playlists, libraryVisible }, dispatch] = useDataLayerValue();
    useEffect(() => {
        dispatch({
            type: "SET_LIBRARY_VISIBLE",
            libraryVisible: false
        });
    },[dispatch]);
    return (
        <div className='sidebar'>
            <img
                className='sidebar_logo' 
                src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" 
                alt="" />
            <SidebarOption title="Home" Icon={HomeIcon} />
            <SidebarOption title="Search" Icon={SearchIcon} />
            <SidebarOption title="Your Library" Icon={LibraryMusicIcon} />
            {(libraryVisible)?
                <>
                    <br />
                    <strong className="sidebar_title">PLAYLISTS</strong>
                    <hr />
                    {/** if playlists!==null --> playlists.items.map(playlist => (<SidebarOption title={playlist.name} />)) */}
                    {playlists?.items?.map(playlist => (
                        <SidebarOption title={playlist} key={playlist.id} />
                    ))}
                </> : <></>
            }
        </div>
  )
}

export default Sidebar