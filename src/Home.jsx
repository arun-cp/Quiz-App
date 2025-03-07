import { useNavigate } from "react-router-dom";
import "./Home.css";
import Header from "./Components/Header";
import quizstart from "./Images/quizstart.png";
import quizsetup from "./Images/quizsetup.png";

export default function Home() {
    const navigate = useNavigate();
    return(
        <div className="homemain">
            <Header />
            <div className="homebody">
                <div onClick={() => navigate("/Quiz-Setup")}> 
                    <span style={{display : "block"}}><img src={quizsetup}></img><h2>Setup Quiz</h2></span>
                </div><br/>
                <div onClick={() => navigate("/Quiz-Dash")}>
                <span style={{display : "block"}}><img src={quizstart}></img><h2>Start Quiz</h2></span>
                </div>
            </div>
        </div>
    )

}