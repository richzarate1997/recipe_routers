
import { useEffect, useState } from "react";
import { getRandomFunFact, getRandomTrivia } from "../service/fetchApi";

function FunFact(){
    const [text, setText] = useState("");
    useEffect(() => {
        if(Math.floor(Math.random() * 2) === 0){
            //return getRandomFunFact();
            setText("haha fun fact");
        } else{
           //setText(getRandomTrivia());
           setText("haha trivia");
        }
    } , []);
    
    return (
        <>
            {text}
        </>
    );
}

export default FunFact;