import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Home';
import QuizStart from './Components/QuizStart';
import Quizsetup from './Components/Quizsetup';
import QuizDash from './Components/QuizDash';
import { useState } from "react";

function App() {
  const [Exam , setExam] = useState([{
    exam : "Test",
    time : 2,
    totmark : 12,
    qstns : [
      {
        "question": "A flashing red traffic light signifies that a driver should do what?",
        "A": "stop",
        "B": "speed up",
        "C": "proceed with caution",
        "D": "honk the horn",
        "answer": "A",
        "correctmark": 4,
        "wrongmark": -1
      }, {
        "question": "A knish is traditionally stuffed with what filling?",
        "A": "potato",
        "B": "creamed corn",
        "C": "lemon custard",
        "D": "raspberry jelly",
        "answer": "A",
        "correctmark": 4,
        "wrongmark": -1
      }, {
        "question": "A pita is a type of what?",
        "A": "fresh fruit",
        "B": "flat bread",
        "C": "French tart",
        "D": "friend bean dip",
        "answer": "B",
        "correctmark": 4,
        "wrongmark": -1
      }
    ]
  },
  {
    exam : "Test Sample",
    time : 1,
    totmark : 8,
    qstns : [
      {
        "question": "Heelo Name",
        "A": "stop",
        "B": "speed up",
        "C": "proceed with caution",
        "D": "honk the horn",
        "answer": "A",
        "correctmark": 4,
        "wrongmark": -1
      }, {
        "question": "hello Age",
        "A": "potato",
        "B": "creamed corn",
        "C": "lemon custard",
        "D": "raspberry jelly",
        "answer": "A",
        "correctmark": 4,
        "wrongmark": -1
      }
    ]
  }]);

  return (
    <Router>
      <Routes>
          <Route  path ='/Quiz-App' element={<Home />} />
          <Route path ='/Quiz-Start' element={<QuizStart Exam={Exam} />} />
          <Route path ='/Quiz-Dash' element={<QuizDash Exam={Exam} />} />
          <Route path ='/Quiz-Setup' element={<Quizsetup Exam={Exam} setExam={setExam} />} />
      </Routes>
    </Router>
    );
}

export default App;
