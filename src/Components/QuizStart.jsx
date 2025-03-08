import "./QuizStart.css";
import Header from "./Header";
import { useState , useEffect } from "react";
import QuizOver from "./QuizOver";
import { useLocation, useNavigate } from "react-router-dom";
import next from "../Images/next.png";
import back from "../Images/back.png";
import exit from "../Images/exit.png";
import submit from "../Images/submit.png";
import xmsubmit from "../Images/xmsubmit.png";

export default function QuizStart({Exam}) {
    const nav = useNavigate();
    const loc = useLocation();
    const [qovercntrl, setqovercntrl] = useState(false);
    const [qindex, setqindex] = useState(0);
    const [clickedans, setclickedans] = useState("");
    const [decision, setdecison] = useState([]);
    const [qdetails, setqdetails] = useState({totalno : Exam[loc.state.index].qstns.length, marktot : Exam[loc.state.index].totmark, markobt : 0, correctno : 0, wrongno : 0});
    const [timeLeft, setTimeLeft] = useState(Exam[loc.state.index].time * 60); 

    useEffect(() => {
        if (timeLeft <= 0) {
            evaluate();
            return;
        }
        else if (qovercntrl == true)
            return;
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

    function qnavctrl(dir) {
        if(dir == 0) {
            setclickedans("");
            setqindex(qindex-1);
        }
        else if(dir == 1) {
            setclickedans("");
            setqindex(qindex+1);
        }
    }
    
    function qsubmit() {
        let flag = false , evalt = null;
        if(clickedans == ""){
            alert("Please click on an answer")
            return
        }
        if(clickedans == Exam[loc.state.index].qstns[qindex].answer)
            evalt = true;
        else
            evalt = false;
        const newdec = decision.map((dec) => {
            if(dec.indx == qindex){
                dec.res = evalt;
                dec.chosen = clickedans;
                flag =true;
            }
            return(dec);
        })
        if(flag){
            setdecison(newdec);
        }
        else {
            const dec = {
                indx : qindex,
                res : evalt,
                chosen : clickedans,
                cmark : Exam[loc.state.index].qstns[qindex].correctmark,
                wmark : Exam[loc.state.index].qstns[qindex].wrongmark
            }
            setdecison([...decision, dec]);
        }
        console.log(decision);
    }

    function evaluate() {
        for(let i=0 ; i < decision.length ; i++) {
            if(decision[i].res == true){
                setqdetails((prevdt) => ({...prevdt, markobt : prevdt.markobt + decision[i].cmark, correctno : prevdt.correctno +1}));
                console.log(qdetails.markobt)
            }
            else if(decision[i].res == false){
                setqdetails((prevdt) => ({...prevdt, markobt : prevdt.markobt + decision[i].wmark, wrongno : prevdt.wrongno +1}));
                console.log(qdetails.markobt)
            }
            console.log(i)
        }
        setqovercntrl(true);
    }

    return(
        <div className="qstartmain" >
            <Header />
            {qovercntrl ? <QuizOver  qdetails={qdetails} /> : null}
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
                        checked={clickedans === "A"} />
                        <label>{Exam[loc.state.index].qstns[qindex].A}</label><br/>
                    </div>

                    <div className="qoption">
                        <input type="radio" name="quiz" value="B" onChange={(event) => setclickedans(event.target.value)} 
                        checked={clickedans === "B"} />
                        <label>{Exam[loc.state.index].qstns[qindex].B}</label><br/>
                    </div>

                    <div className="qoption">
                        <input type="radio" name="quiz" value="C" onChange={(event) => setclickedans(event.target.value)} 
                        checked={clickedans === "C"} />
                        <label>{Exam[loc.state.index].qstns[qindex].C}</label><br/>
                    </div>

                    <div className="qoption">
                        <input type="radio" name="quiz" value="D" onChange={(event) => setclickedans(event.target.value)} 
                        checked={clickedans === "D"} />
                        <label>{Exam[loc.state.index].qstns[qindex].D}</label><br/>
                    </div><br/>

                    <button onClick={() => qnavctrl(1)} disabled={qindex == Exam[loc.state.index].qstns.length - 1}>
                        <span>Next
                            <img 
                                src={next} 
                                alt="alt" 
                                style={{ width: '16px', height: 'auto' }} />
                         </span>
                    </button>
                    <button onClick={qsubmit} >
                        <span>
                            <img 
                                src={submit} 
                                alt="alt" 
                                style={{ width: '16px', height: 'auto' }} />Submit
                        </span>
                    </button>
                    <button onClick={() => qnavctrl(0)} disabled={qindex == 0}>
                        <span>
                            <img 
                                src={back} 
                                alt="alt" 
                                style={{ width: '16px', height: 'auto' }} />Previous
                        </span>
                    </button>
                    {decision.map((dec) => {
                        if(dec.indx === qindex)
                            return(<h4>Submitted Ans : {dec.chosen}</h4>)
                    })}
                </div>
                <div className="qdetails" style={{justifyContent : "right"}}>
                    <button onClick={() => nav("/Quiz-Dash")}>
                        <span>
                            <img 
                                src={exit} 
                                alt="alt" 
                                style={{ width: '16px', height: 'auto' }} />Quit Exam
                        </span>
                    </button>
                    <button onClick={evaluate} >
                        <span>
                            <img 
                                src={xmsubmit} 
                                alt="alt" 
                                style={{ width: '16px', height: 'auto' }} />Submit Exam
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}