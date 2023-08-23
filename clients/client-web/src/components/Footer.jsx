import SpotifyWidget from './SpotifyWidget';

export default function Footer() {
    const styles = {
        foot: {
            position: 'sticky',
            bottom: 30,
            left: 0,
            padding: '0 1vw',
            margin: '0',
            height: '50px'
        },
        text: {
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'end',
            padding: '10px',
            fontFamily: 'monospace',
            color: '#CA5953',
            position: 'absolute',
            bottom: -50,
            right: 15
        }
    }
    return (
        <footer style={styles.foot}>
                <SpotifyWidget />
                <p style={styles.text}>Copyright @ GetYum 2023</p>
        </footer>
    )
}