import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("")

    const delayPara = (index, nextWord) => {
        setTimeout(function()  {
            setResultData(prev=>prev+nextWord)
        }, 75*index);
    }

    //add new chat
    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }


    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
    
        // Check if the prompt is valid and update states accordingly
        if (prompt && prompt.trim() !== "") {
            response = await run(prompt);
            setRecentPrompt(prompt);
            setPrevPrompts(prev => [...prev, prompt]); // Add prompt to prevPrompts
        } else if (input && input.trim() !== "") {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        } else {
            setLoading(false);
            return; // If no valid input, stop further execution
        }
    
        // Format the response
        let formattedResponse = response
            .split("**")
            .map((part, i) => (i % 2 === 1 ? `<b>${part}</b>` : part))
            .join("")
            .split("*")
            .join("</br>");
    
        let responseWords = formattedResponse.split(" ");
        responseWords.forEach((word, i) => delayPara(i, word + " "));
    
        setLoading(false);
        setInput("");
    };
    






    const ContextValue = {
       prevPrompts,
       setPrevPrompts,
       onSent,
       setRecentPrompt,
       recentPrompt,
       showResult,
       loading,
       resultData,
       input,
       setInput,
       newChat
    }
    return(
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider

