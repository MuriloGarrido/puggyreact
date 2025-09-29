import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Autenticacao from "./components/Autenticacao";
import SlotMachine from "./components/SlotMachine";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Autenticacao />} />{ }
        <Route path="/slot" element={<SlotMachine />} />{ }
      </Routes>
    </Router>
  );
}

export default App;
