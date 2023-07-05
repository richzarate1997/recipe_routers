import SpotifyWidget from "./SpotifyWidget";

export default function Footer() {
    const styles = {
        foot: {
            position: 'sticky',
            bottom: 0,
        },
        group: {
            display: 'flex',
            // flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'end',
            padding: '5px'
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