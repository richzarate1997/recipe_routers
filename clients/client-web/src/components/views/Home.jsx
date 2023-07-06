import SearchBar from "../SearchBar";
import FunFact from "../FunFact";
import logo from "../../assets/logo.png";
import { Alert, Box, Typography } from '@mui/material'
import { useLocation } from "react-router-dom";

function Home() {
    const location = useLocation();
    const styles = {
        box: {
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
            flexDirection: "column"
        },
        logo: {
            maxWidth: '20%',
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
            flexDirection: "column"
        }
    }

    return (
        <>
            <Box>
                <Box pt={8} style={styles.box}>
                    <img src={logo} alt="hambuger logo" style={styles.logo} />
                </Box>
                <Box px={10} style={styles.box}>
                    <SearchBar />
                </Box>
                <FunFact />
                { location.state && <Alert variant="success"><Typography variant="subtitle1">{location.state.msg}</Typography></Alert> }
            </Box>
        </>
    );
}

export default Home;