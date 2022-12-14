import React from 'react';
import './components_css/Login.css';
import { loginUrl } from '../spotify';

function Login() {
  return (
    <div className='login'>
        {/* Spotify Logo */}
        {/* Login with Spotify button */}
        <img 
            src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
            alt="spotify logo"
        />
        <a href={loginUrl}>Login with Spotify</a>

    </div>
  )
}

export default Login