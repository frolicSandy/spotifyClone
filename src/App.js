import './App.css';
import Login from './components/Login';
import Player from './components/Player';
import React, { useEffect } from 'react';
import { getAccessTokenFromUrl } from './spotify';
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from './ContextAPI/DataLayer';

/** creating an instance of spotify api inside our app for our interactions with apotify */
const spotify = new SpotifyWebApi();

function App() {
    
    /** Implementing context api
     * param1 --> {} --> grabs the mentioned fields from the DataLayer(nothing in this case, alternate examples: {user, accessToken} --> will grab the user and accessToken from DataLayer)
     * param2 --> dispatch --> use this to perform operations on DataLayer
     */
    const [{ accessToken }, dispatch] = useDataLayerValue();

    /** useEffect --> Run code(inside the arrow function in this case) based on a given condition! 
     * 2nd param - specifies when the codes are gonna run like for [] --> run once
     * for [temp1, temp2, ...] --> run every time the temp's value(s) changes.
    */
    useEffect(() => {
        /** code */
        const hash = getAccessTokenFromUrl();
        window.location.hash = "";  /** Removes the access token from the url */
        const _accessToken = hash.access_token;
        if (_accessToken){
            /** Adding(rather DISPATCHING) access token to data layer */
            dispatch({
                type: "SET_ACCESS_TOKEN",
                accessToken: _accessToken
            });
            spotify.setAccessToken(_accessToken); /** Giving the access token to spotify
            Note: spotify.setAccessToken() is different from setAccessToken function of useState() */
            
            /** spotify.getMe() --> asynchronous function, gets user profile */
            spotify.getMe().then(user => {
                /** Adding(rather DISPATCHING) user to data layer */
                dispatch({
                    /** reducer>action.type=SET_USER */
                    type: "SET_USER",
                    /** reducer>initialState.user=user(o/p of spotify.getMe()) */
                    user: user
                });
            });

            /** retrieve user's playlists info from spotify and dispatch it into the data layer */
            spotify.getUserPlaylists().then((playlists) => {
                console.log('user playlists: ',playlists);
                dispatch({
                    type: "SET_PLAYLISTS",
                    playlists: playlists
                });
            });

            /** Searches for playlists with the name "Spotify Wrapped" and then retrieves the playlist, extracts its id
             * and sets it to global state.
             */
            spotify.searchPlaylists('Spotify Wrapped').then((response) => {
                spotify.getPlaylist(response?.playlists?.items[0]?.id).then((response) => {
                    dispatch({
                        type: "SET_CURRENT_PLAYLIST",
                        current_playlist: response
                    });
                });
            });
        }
    }, [accessToken, dispatch]);

    return (
        <div className='app'>
            
            {
                accessToken? (
                    <Player />
                ) : (
                    <>
                        {/** Spotify Logo and Login with spotify button */}
                        <Login />
                    </>
                )
            }
            
        </div>
    );
}

export default App;