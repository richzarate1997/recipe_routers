
import { useEffect, useState } from "react";
import { getRandomFunFact, getRandomTrivia } from "../service/fetchApi";
import { Box } from "@mui/material";

function FunFact() {
    const [text, setText] = useState("");
    useEffect(() => {
        if (Math.floor(Math.random() * 2) === 0) {
            // getRandomFunFact()
            //     .then(joke => setText(joke))
            // setText("haha fun fact");
        } else {
            // getRandomTrivia()
            //     .then(trivia => setText(trivia))
            // setText("haha trivia");
        }
    }, []);

    return (
        <Box pt={1} style={{
            display: "flex",
            alignSelf: "center",
            justifyContent: "center"
        }}>
            <p style={{
                fontFamily: 'monospace'
            }}>{text}</p>
        </Box>


    );
}

export default FunFact;