import { useState } from "react"
import "../styles/autenticacao.css";
import Login from "./Login";
import Register from "./Register";



const Autenticacao = () => {

    const [flipped, setFlipped] = useState(false)

    const showLogin = () => setFlipped(false)
    const showRegister = () => setFlipped(true)

    return (
        <div className={`flip-container ${flipped ? "flipped" : ""}`}>
            <div className="flipper">
                <Login gotoRegister={showRegister} />
                <Register gotoLogin={showLogin} />
            </div>
        </div>
    );


}

export default Autenticacao;