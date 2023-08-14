
import { useState } from "react";
import { getRandomJoke, getRandomTrivia } from "../service/fetchApi";
import { Box, Button, Card, CircularProgress } from "@mui/material";
import { SemipolarSpinner } from 'react-epic-spinners';

function FunFact() {
    const [text, setText] = useState("");
    const [clicked, setClicked] = useState(false);
    const headsOrTails = Math.floor(Math.random() * 2);

    const fetchFun = () => {
        if (headsOrTails) {
            getRandomJoke().then(joke => setText(joke))
        } else {
            getRandomTrivia().then(trivia => setText(trivia))
        }
        setClicked(true);
    }

    const styles = {
        card: {
            fontFamily: 'monospace',
            maxWidth: '50vw',
            textAlign: 'center',
            backgroundColor: '#612D33',
            color: '#FEAE65',
            padding: text ? '10px' : 0,
            display: clicked && text ? 'block' : 'none'
        },
        box: {
            display: "flex",
            alignSelf: "center",
            justifyContent: "center"
        }
    }

    return (
        <Box pt={3} mb={28} style={styles.box}>
            <Button
                variant="outlined" color="secondary"
                size="small" id="fetchButton"
                onClick={fetchFun} style={{ display: clicked ? 'none' : 'block' }} >
                Random Joke or Fact!
            </Button>
            {!text && clicked && <SemipolarSpinner color="#D1483D"/>}
            <Card style={styles.card}>
                {text}
            </Card>
        </Box>


    );
}

export default FunFact;