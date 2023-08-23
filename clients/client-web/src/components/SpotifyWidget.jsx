import { Tooltip } from '@mui/material';
import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import SpotifyWebApi from 'spotify-web-api-js';
import { loginUrl, getTokenFromUrl } from '../service/spotifyAuthorization';

const spotify = new SpotifyWebApi();

const styles = {
  link: {
    color: '#1AB26B',
    backgroundColor: '#191414',
    borderRadius: '25px 25px',
    textDecoration: 'none',
    display: 'flex',
    padding: '10px',
    position: 'absolute',
    bottom: -20
  },
  logo: {
    height: '1.5rem',
    width: 'auto',
    padding: '3px'
  },
}

const SpotifyWidget = () => {
  const [spotifyToken, setSpotifyToken] = useState('');
  const offset = Math.floor(Math.random() * 671);

  useEffect(() => {
    const token = getTokenFromUrl().access_token;
    // Clear it from the uri
    window.location.hash = '';
    // console.log('Spotify Token: ', token);
    if (token) {
      setSpotifyToken(token);
      spotify.setAccessToken(token);
    }
  }, []);

  return (
    <div>
      {!spotifyToken &&
        <Tooltip arrow title='Stream with spotify while you GetYum!'>
          <a href={loginUrl} style={styles.link}>
            <img src='/images/Spotify_Logo_CMYK_Green.png' alt='spotify logo' style={styles.logo} />
          </a>
        </Tooltip>
      }
      {spotifyToken &&
        <SpotifyPlayer
          token={spotifyToken}
          uris={['spotify:playlist:7yWS4mNsIXUYtm71xDIWe8']}
          initialVolume={0.05}
          offset={offset}
          locale={navigator.language}
          styles={{
            activeColor: '#D1483D',
            bgColor: '#612D33',
            color: '#D1483D',
            loaderColor: '#D1483D',
            sliderColor: '#7CA65A',
            sliderHandleColor: '#CA5953',
            sliderTrackColor: '#FEAE65',
            trackArtistColor: '#CA5953',
            trackNameColor: '#D1483D',
          }}
        />
      }
    </div>
  )
}

export default SpotifyWidget