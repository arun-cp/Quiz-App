import { useNavigate } from "react-router-dom";
import "./QuizOver.css";
import done from "../Images/done.gif";

export default function QuizOver({qdetails}) {
    const nav = useNavigate();
    return(
        <div className="qoverbg">
            <div className="qoverbox">
                <div className="qoverhead">
                    <h1 style={{"margin" : "0px 215px"}}>Quiz Results</h1>
                </div>
                <img src={done}/>
                <div className="qoverdet">
                    <h3>Score : {qdetails.markobt} / {qdetails.marktot}</h3>
                    <h3>Percentage : {(qdetails.markobt/qdetails.marktot)*100 > 0 ? Math.round((qdetails.markobt/qdetails.marktot)*100) : 0} %</h3>
                    <h3>No of Questions : {qdetails.totalno}</h3>
                    <h3>Correct Answers : {qdetails.correctno}</h3>
                    <h3>Wrong Answers : {qdetails.wrongno}</h3>
                    <h3>Unattended : {qdetails.totalno - (qdetails.correctno + qdetails.wrongno)}</h3>
                </div>
                <button onClick={() => nav("/Quiz-Dash")}><b>Done</b></button>
            </div>
        </div>
    )
}