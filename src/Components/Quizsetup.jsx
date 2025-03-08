import { useRef, useState } from "react";
import Header from "./Header";
import "./Quizsetup.css";
import del from "../Images/delete.png";
import create from "../Images/create.png";
import exit from "../Images/exit.png";
import add from "../Images/add.png";
import { useNavigate } from "react-router-dom";
import QuizCreate from "./QuizCreate";

export default function Quizsetup({Exam, setExam}) {
    const nav = useNavigate();
    const [qns, setqns] = useState([]);
    const [qctrl, setqctrl] = useState(false);
    const [valid, setvalid] = useState("");
    const xamname = useRef("");
    const xamtime = useRef();
    const qs = useRef({
        "id" : null,
        "question": null,
        "A": null,
        "B": null,
        "C": null,
        "D": null,
        "answer": null,
        "correctmark": null,
        "wrongmark": null
    })
    function addexam() {
        if(xamname.current.value === "" || xamtime.current.value === "" || qns.length == 0)
            setvalid("Please Fill all fields");
        else {
            setvalid("");
            let total = 0;
            for(let x=0 ; x<qns.length ; x++) {
                total = total + qns[x].correctmark; 
            }
            const xam = {
                exam : xamname.current.value,
                time : xamtime.current.value,
                totmark : total,
                qstns : qns
            }
            setExam([...Exam, xam]);
            setqctrl(true);
        }
    }
    function addqstn(e) {
        e.preventDefault();
        console.log(qs.current.value)
        const newqn = {
            id : Math.floor(1000 + Math.random() * 9000),
            question: qs.current.question.value,
            A: qs.current.A.value,
            B: qs.current.B.value,
            C: qs.current.C.value,
            D: qs.current.D.value,
            answer : qs.current.answer.value,
            correctmark: parseInt(qs.current.correctmark.value, 10),
            wrongmark: parseInt(qs.current.wrongmark.value, 10)
        };
        console.log(newqn)
        setqns([...qns, newqn]);
        console.log(qns)
    }
    function deletequestion(delid){
        setqns(qns.filter(qn => delid !== qn.id))
    }

    return(
        <div className="setupmain">
            <Header />
            <div className="setupbody">
                <div className="setupleft">
                    {qctrl ? <QuizCreate /> : null}
                    <h3>Setup Quiz Window</h3>
                    <hr/>
                    <form onSubmit={addqstn}>
                        <div className="inputcontain">
                            <label>Question :</label>
                            <textarea style={{"height" : "70px"}} placeholder="Enter Question" type="text" ref={(ip) => (qs.current.question = ip)} required />
                        </div>
                        <div className="inputcontain">
                            <label>Option A : </label>
                            <input type="text" placeholder="A" ref={(ip) => (qs.current.A = ip)} required />
                        </div>
                        <div className="inputcontain">
                            <label>Option B : </label>
                            <input type="text" placeholder="B" ref={(ip) => (qs.current.B = ip)} required />
                        </div>
                        <div className="inputcontain">
                            <label>Option C : </label>
                            <input type="text" placeholder="C" ref={(ip) => (qs.current.C = ip)} required />
                        </div>
                        <div className="inputcontain">
                            <label>Option D : </label>
                            <input type="text" placeholder="D" ref={(ip) => (qs.current.D = ip)} required />
                        </div>
                        <div className="inputcontain">
                            <label>Correct Answer : </label>
                            <select ref={(ip) => (qs.current.answer = ip)} defaultValue="" required>
                                <option value="" disabled>Select Option</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </select>
                        </div>
                        <div className="inputcontain">
                            <label>Correct Answer Mark : </label>
                            <input type="number" placeholder="+ Positive Mark" ref={(ip) => (qs.current.correctmark = ip)} required />
                            <label>Wrong Answer Mark : </label>
                            <input type="number" placeholder="- Negative Mark" ref={(ip) => (qs.current.wrongmark = ip)} required />
                        </div>
                        <button type="submit">
                            <span>
                            <img 
                                src={add} 
                                alt="Cart Icon" 
                                style={{ width: '16px', height: 'auto' }} />Add Question
                            </span>
                        </button>
                    </form>
                </div>
                <div className="setupright">
                    <div className="setuprightbox">
                        <h3>Questions </h3>
                        <hr/>
                        {qns.map((qn) => (
                            <div className="sqbox">
                                <div style={{"width" : "90%"}}>
                                    <p><b>Q. </b>{qn.question}</p> 
                                    <p><b>A.</b>{qn.A} &nbsp; <b>B.</b>{qn.B} &nbsp; <b>C.</b>{qn.C} &nbsp; <b>D.</b>{qn.D}</p> 
                                    <p><b>Correct Ans : </b>{qn.answer} &nbsp; <b>Marks(+/-) : </b>{qn.correctmark} / {qn.wrongmark}</p>
                                </div>    
                                <button onClick={() => deletequestion(qn.id)}>
                                    <span style={{"display" : "flex", "alignItems" : "center"}}><img style={{"width" : "95%", "height" : "auto"} } src={del} /> </span>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="setuprightbottom">
                        <div>
                            <label>Exam Name :</label>
                            <input type="text" placeholder="Enter Exam Name" ref={xamname} required />
                        </div>
                        <div>
                            <label>Time :</label>
                            <input type="number" placeholder="Enter Time in minutes" ref={xamtime} required />
                        </div>
                        <button onClick={() => nav("/Quiz-App")}>
                            <span>
                            <img 
                                src={exit} 
                                alt="Cart Icon" 
                                style={{ width: '16px', height: 'auto' }} />Cancel
                            </span>
                        </button>
                        <button onClick={addexam}>
                            <span>
                            <img 
                                src={create} 
                                alt="Cart Icon" 
                                style={{ width: '16px', height: 'auto' }}/>Create Quiz
                            </span>
                        </button>
                    </div>
                    {valid === "" ? "" : <h6><span><img src={exit} alt="Cart Icon" style={{ width: '16px', height: 'auto' }} />{valid}</span></h6>}  
                </div>
            </div>
        </div>
    )
}