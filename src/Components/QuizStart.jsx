import "./QuizStart.css";
import Header from "./Header";
import { useState , useEffect } from "react";
import QuizOver from "./QuizOver";
import { useLocation } from "react-router-dom";

export default function QuizStart({Exam}) {
    const loc = useLocation();
    const [qovercntrl, setqovercntrl] = useState(false);
    const [qindex, setqindex] = useState(0);
    const [clickedans, setclickedans] = useState("");
    const [decision, setdecison] = useState(null);
    const [markobt, setmarkobt] = useState(0);
    const [qdetails, setqdetails] = useState({totalno : Exam[loc.state.index].qstns.length, marktot : Exam[loc.state.index].qstns[0].correctmark, correctno : 0, wrongno : 0});
    const [timeLeft, setTimeLeft] = useState(Exam[loc.state.index].time * 60); 

    useEffect(() => {
        if (timeLeft <= 0) {
            setqovercntrl(true);
            console.log(qovercntrl)
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return(
            <>Time : {minutes}:{secs < 10 ? "0" : ""}{secs}</>
        );
    };
    
    function qsetter() {
        setdecison(null);
        setclickedans("");
        console.log(Exam[loc.state.index].qstns.length)
        if (qindex < Exam[loc.state.index].qstns.length - 1) {
            setqindex(qindex + 1);
            setqdetails({...qdetails, marktot : qdetails.marktot + Exam[loc.state.index].qstns[qindex].correctmark});
        }
        else{
            setqovercntrl(true);
        }
    }
    function evaluate() {
        if(clickedans == ""){
            alert("Please click on an answer")
            return
        }
        if(clickedans === Exam[loc.state.index].qstns[qindex].answer){
            setdecison(true);
            setqdetails({...qdetails, correctno : qdetails.correctno + 1});
            setmarkobt(markobt + Exam[loc.state.index].qstns[qindex].correctmark);
        }
        else{
            setdecison(false);
            setqdetails({...qdetails, wrongno : qdetails.wrongno + 1});
            setmarkobt(markobt + Exam[loc.state.index].qstns[qindex].wrongmark);
        }
    }
    return(
        <div className="qstartmain" >
            <Header />
            {qovercntrl ? <QuizOver  qdetails={qdetails} markobt={markobt} /> : null}
            <div className="qstartbody">
                <div className="qdetails">
                    <h2>Total Questions : {Exam[loc.state.index].qstns.length}</h2>
                    <h2>Remaining Questions : {Exam[loc.state.index].qstns.length - qindex}</h2>
                    <h2>{formatTime(timeLeft)}</h2>
                </div>
                <div className="qbox">
                    <h5>Correct Answer : {Exam[loc.state.index].qstns[qindex].correctmark} | Wrong Answer : {Exam[loc.state.index].qstns[qindex].wrongmark}</h5>
                    <h2>{Exam[loc.state.index].qstns[qindex].question}</h2>
                    <div className="qoption">
                        <input type="radio" name="quiz" value="A" onChange={(event) => setclickedans(event.target.value)} 
                        checked={clickedans === "A"} disabled={decision != null}/>
                        <label>{Exam[loc.state.index].qstns[qindex].A}</label><br/>
                    </div>

                    <div className="qoption">
                        <input type="radio" name="quiz" value="B" onChange={(event) => setclickedans(event.target.value)} 
                        checked={clickedans === "B"} disabled={decision != null}/>
                        <label>{Exam[loc.state.index].qstns[qindex].B}</label><br/>
                    </div>

                    <div className="qoption">
                        <input type="radio" name="quiz" value="C" onChange={(event) => setclickedans(event.target.value)} 
                        checked={clickedans === "C"} disabled={decision != null}/>
                        <label>{Exam[loc.state.index].qstns[qindex].C}</label><br/>
                    </div>

                    <div className="qoption">
                        <input type="radio" name="quiz" value="D" onChange={(event) => setclickedans(event.target.value)} 
                        checked={clickedans === "D"} disabled={decision != null}/>
                        <label>{Exam[loc.state.index].qstns[qindex].D}</label><br/>
                    </div>

                    <button onClick={qsetter}>Next</button>
                    <button onClick={evaluate} disabled={decision != null}>Submit</button>
                    {decision === true && <p>Correct Answer</p>}
                    {decision === false && <p>Wrong Answer</p>}
                </div>
            </div>
        </div>
    )
}