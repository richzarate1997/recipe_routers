
import { getRandomFunFact, getRandomTrivia } from "../service/fetchApi";

function FunFact(){
    let text;
    if(Math.floor(Math.random() * 2) === 0){
        //text = getRandomFunFact();
        text = "haha fun fact";
    } else{
       // text = getRandomTrivia();
       text = "haha trivia";
    }
    return text;
}

export default FunFact;