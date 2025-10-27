import logo from './logo.svg';
import '../src/styles/style.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Autenticacao from "./components/Autenticacao";
import SlotMachine from "./components/SlotMachine";
import Home from "./components/telaInicial/Home";
import Quiz from "./components/Quiz";
import GuardaRoupa from "./components/guardaRoupa/GuardaRoupa";
import MicrosoftCallback from "./components/MicrosoftCallback";



function App() {
    return ( <
        Router >
        <
        Routes >
        <
        Route path = "/"
        element = { < Autenticacao / > }
        /> <
        Route path = "/slot"
        element = { < SlotMachine / > }
        /> <
        Route path = "/home"
        element = { < Home / > }
        /> <
        Route path = "/quiz"
        element = { < Quiz / > }
        /> <
        Route path = "/guardaRoupa"
        element = { < GuardaRoupa / > }
        /> <
        Route path = "/microsoft-callback"
        element = { < MicrosoftCallback / > }
        /> <
        /Routes> <
        /Router>
    );

}

export default App;