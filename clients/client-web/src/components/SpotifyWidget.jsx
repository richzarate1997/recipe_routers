import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { loginUrl, getTokenFromUrl } from "../service/spotifyAuthorization";
import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

const styles = {
    link: {
        color: '#1DB954',
        backgroundColor: '#191414',
        fontFamily: 'sans-serif',
        borderRadius: '25px 25px',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        padding: '5px 10px 5px 15px',
        width: 'auto'
    },
    logo: {
        height: '1.5rem',
        width: 'auto',
        padding: '3px'
    },
    div: {
    }
}

const SpotifyWidget = () => {
    const [spotifyToken, setSpotifyToken] = useState("");
    const offset = Math.floor(Math.random()*671);

    useEffect(() => {
        const token = getTokenFromUrl().access_token;
        // Clear it from the uri
        window.location.hash = "";
        // console.log("Spotify Token: ", token);
        if (token) {
            setSpotifyToken(token);
            spotify.setAccessToken(token);
        }
    }, []);

    return (
        <div style={styles.div}>
            {!spotifyToken &&
                <a href={loginUrl} style={styles.link}>
                    Jam with <img src='images/Spotify_Logo_CMYK_Green.png' style={styles.logo} />
                </a>
            }
            {spotifyToken &&
                <SpotifyPlayer
                    token={spotifyToken}
                    uris={['spotify:playlist:7yWS4mNsIXUYtm71xDIWe8']}
                    initialVolume={0.6}
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