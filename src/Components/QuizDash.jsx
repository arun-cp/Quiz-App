import { useNavigate } from "react-router-dom";
import back from "../Images/back.png";
import create from "../Images/create.png";
import atempt from "../Images/atempt.png";
import Header from "./Header";
import "./QuizDash.css";

export default function QuizDash({Exam}) {
    const nav = useNavigate();
    function attemptclick(index){
        nav("/Quiz-Start", { state: { index } })
    }

    return(
        <div className="dashmain">
           <Header />
            <div className="dashbody">
                <div className="dashtop">
                    <button onClick={() => nav("/Quiz-App")}>
                        <span>
                        <img 
                            src={back} 
                            alt="Cart Icon" 
                            style={{ width: '15px', height: 'auto' }} /> Back
                        </span>
                    </button>
                    <button onClick={() => nav("/Quiz-setup")}>
                        <span>
                        <img 
                            src={create} 
                            alt="Cart Icon" 
                            style={{ width: '15px', height: 'auto' }} /> Create Quiz
                        </span>
                    </button>
                </div>
                <div className="dashexam">
                    <h3>Available Exams</h3>
                    <hr/>
                    <div className="examflex">
                        {Exam.map((xam, index) => (
                            <div className="flexcont" key={index}>
                                <h2>{xam.exam}</h2>
                                <h3>{xam.qstns.length} Questions</h3>
                                <button onClick={() => attemptclick(index)}>
                                    <span>
                                    <img 
                                        src={atempt} 
                                        alt="Cart Icon" 
                                        style={{ width: '18px', height: 'auto' }} /> Attempt Exam
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="dashresult">
                    <h3>Results</h3>
                    <hr/><br/>
                    <p style={{"textAlign" : "center"}}>Under Construction</p>
                </div>
            </div>
        </div>
    )
}