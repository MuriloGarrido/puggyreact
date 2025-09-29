import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Autenticacao from "./components/Autenticacao";
import SlotMachine from "./components/SlotMachine";
import Home from "./components/Home";
import Quiz from "./components/Quiz";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Autenticacao />} />{ }
        <Route path="/slot" element={<SlotMachine />} />{ }
        <Route path="/home" element={<Home />} />{ }
        <Route path="/quiz" element={<Quiz />} />{ }
      </Routes>
    </Router>
  );
}

export default App;
