
import { useState } from "react";
import { getRandomJoke, getRandomTrivia } from "../service/fetchApi";
import { Box, Button, Card, CircularProgress } from "@mui/material";

function FunFact() {
    const [text, setText] = useState("");
    const [clicked, setClicked] = useState(false);
    const headsOrTails = Math.floor(Math.random() * 2);

    const fetchFun = () => {
        if (headsOrTails) {
            setText(`This is a really long joke setup, and it's going to have a punchline. That won't happen before
            I tell you all about my sister Rhonda, and her three kids. Because there's a joke there. Ya see, she has three kids.
            And they all go to the same school. They're each about 2 years apart, and the crazy thing is, they aren't even
            of age to be hearing a joke like this, let me tell ya. Oh don't get me started on adult humor, oh boy. I could go on
            but I think I was supposed to be getting to a uh... um. What were you talking about? What did you ask me?`);
            // getRandomJoke().then(joke => setText(joke))
        } else {
            setText("haha trivia");
            // getRandomTrivia().then(trivia => setText(trivia))
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
            {!text && clicked && <CircularProgress color="primary" />}
            <Card style={styles.card}>
                {text}
            </Card>
        </Box>


    );
}

export default FunFact;