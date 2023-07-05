import SearchBar from "../SearchBar";
import FunFact from "../FunFact";
import logo from "../../assets/logo.png";
import { Box } from '@mui/material'

function Home() {
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
            </Box>
        </>
    );
}

export default Home;