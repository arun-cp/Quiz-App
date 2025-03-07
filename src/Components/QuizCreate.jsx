import "./QuizCreate.css";
import { useNavigate } from "react-router-dom";
import done from "../Images/done.gif";

export default function QuizCreate() {
    const nav = useNavigate();
    return(
        <div className="qcreatebg">
            <div className="qcreatebox">
                <div className="qcreatehead">
                    <h1 style={{"margin" : "0px 215px"}}>Quiz Creation</h1>
                </div>
                <img src={done}/>
                <h3>Quiz has been Created Successfully</h3>
                <div className="qcreatebottom">
                    <button onClick={() => nav("/Quiz-App")}>Done</button>
                    <button onClick={() => nav("/Quiz-Dash")}>Go to Quiz</button>
                </div>
            </div>
        </div>
    )
}