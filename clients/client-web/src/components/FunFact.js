
import { useEffect, useState } from "react";
import { getRandomFunFact, getRandomTrivia } from "../service/fetchApi";
import { Box } from "@mui/material";

function FunFact() {
    const [text, setText] = useState("");
    useEffect(() => {
        if (Math.floor(Math.random() * 2) === 0) {
            //return getRandomFunFact();
            setText("haha fun fact");
        } else {
            //setText(getRandomTrivia());
            setText("haha trivia");
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