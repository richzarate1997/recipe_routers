import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { loginUrl, getTokenFromUrl } from "../service/spotifyAuthorization";
import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

const SpotifyWidget = () => {
    const [spotifyToken, setSpotifyToken] = useState("");

    useEffect(() => {
        console.log("This was retrieved from the authorize url: ", getTokenFromUrl());

        const _spotifyToken = getTokenFromUrl().access_token;
        // Clear it from the uri
        window.location.hash = "";

        console.log("Spotify Token: ", _spotifyToken);

        if (_spotifyToken) {
            setSpotifyToken(_spotifyToken);

            spotify.setAccessToken(_spotifyToken);

            spotify.getMe().then((user) => {
                console.log("Look, it's Kern: ", user);
            })
        }
    }, []);

    return (
        <div >
            {!spotifyToken &&
                <a href={loginUrl} id='signInButton'>Sign in with Spotify!</a>
            }
            {spotifyToken &&
                <SpotifyPlayer
                    token={spotifyToken}
                    uris={['spotify:playlist:7yWS4mNsIXUYtm71xDIWe8']}
                    initialVolume={0.5}
                    layout='responsive'
                    offset={121}
                    locale={navigator.language}
                    styles={{
                        activeColor: '#7CA65A',
                        bgColor: '#D1483D',
                        color: '#612D33',
                        loaderColor: '#D1483D',
                        sliderColor: '#7CA65A',
                        sliderHandleColor: '#612D33',
                        sliderTrackColor: '#FEAE65',
                        trackArtistColor: '#FEAE65',
                        trackNameColor: '#FEAE65',
                    }}
                />
            }
        </div>
    )
}

export default SpotifyWidget