import "./Banner.scss"
import { useNavigate } from 'react-router-dom'
import logo from "./groupomania.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"

const Banner = () => {

    const navigate = useNavigate()

    function disconnect() {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.clear();
        console.log("Utilisateur déconnecté")
        navigate("/")
    }

    function seeProfil() {
        console.log("Profile cliqué")
        navigate("/Profil")
    }

    const signout = <FontAwesomeIcon icon={faSignOutAlt} />
    const profil = <FontAwesomeIcon icon={faUser} />



    return (
        <>
            <div className="centre">
                <img src={logo}
                    className="logo"
                    alt="logo"
                />
            </div>
            <div className="menu">
                <span title="Se déconnecter">
                    <div className="menu__element" onClick={() => disconnect()}> {signout} </div>
                </span>
                <span title="Profil">
                    <div className="menu__element" onClick={() => seeProfil()}> {profil} </div>
                </span>
            </div>
        </>
    );

}

// delete axios.defaults.headers.common['Authorization'];

export default Banner