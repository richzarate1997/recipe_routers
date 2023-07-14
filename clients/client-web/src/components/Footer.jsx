import SpotifyWidget from "./SpotifyWidget";

export default function Footer() {
    const styles = {
        foot: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100vw'
        },
        group: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'end',
            padding: '5px',
        },
        text: {
            fontFamily: 'monospace',
            color: "#CA5953",
        }
    }
    return (
        <footer style={styles.foot}>
            <div style={styles.group}>
                <SpotifyWidget />
                <p style={styles.text}>Copyright @ GetYum 2023</p>
            </div>
        </footer>
    )
}