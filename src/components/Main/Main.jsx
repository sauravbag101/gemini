import React, { useContext } from 'react'
import { PiUserCircleCheck } from "react-icons/pi";
import { SiGooglegemini } from "react-icons/si";
import { AiOutlineSend } from "react-icons/ai";
import './Main.css'
import { Context } from '../../Context/Context';

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, input, setInput } = useContext(Context);

    // Function to handle card click
    const handleCardClick = (prompt) => {
        setInput(prompt); // Set the clicked prompt to input
        onSent(prompt);   // Send the clicked prompt
    }

    return (
        <>
            <div className="main">
                <div className="nav">
                    <p>Chat AI</p>
                    <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2299" alt="user" />
                </div>
                <div className="main-container">

                    {!showResult
                        ? <>
                            <div className="greet">
                                <p><span>Hello User,</span></p>
                                <p>Tell me, How can I help you?</p>
                            </div>
                            <div className="cards">
                                <div className="card" onClick={() => handleCardClick("Search for Good Stocks")}>
                                    <p>Search for Good Stocks</p>
                                </div>
                                <div className="card" onClick={() => handleCardClick("Looking for a good wedding place")}>
                                    <p>Looking for a good wedding place</p>
                                </div>
                                <div className="card" onClick={() => handleCardClick("Search latest iPhone")}>
                                    <p>Search latest iPhone</p>
                                </div>
                                <div className="card" onClick={() => handleCardClick("Best Web series in 2024 on Netflix")}>
                                    <p>Best Web series in 2024 on Netflix</p>
                                </div>
                            </div>
                        </>
                        : <div className='result'>
                            <div className="result-title">
                                <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2299" alt="user" />
                                <p>{recentPrompt}</p>
                            </div>
                            <div className="result-data">
                                <img src="https://i.namu.wiki/i/AMk1eXIzzjYQwO3lBV61vl7c819FzRa89v0MlUZRrlmkPREt0rSJxD7kd2TM3N9M1-jlqRLppXI2fo40tSpVxw.webp" alt="logo" />
                                {loading ?
                                    <div className='loader'>
                                        <hr />
                                        <hr />
                                        <hr />
                                    </div> :
                                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                }
                            </div>
                        </div>
                    }

                    <div className="main-bottom">
                        <div className="serach-box">
                            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter your prompt here' />
                            <div>
                               {input? <AiOutlineSend onClick={() => onSent(input)} className='img' />: null}
                            </div>
                        </div>
                        <p className='bottom-info'>
                            Gemini may display inaccurate info, including about people, so double-check its information.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;
