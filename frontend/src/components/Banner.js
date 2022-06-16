import "./Banner.scss"
import { useNavigate } from 'react-router-dom'
import logo from "./groupomania.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"

const Banner = () => {

    const navigate = useNavigate()

    function disconnect() {
        delete axios.defaults.headers.common['Authorization'];
        console.log("Utilisateur déconnecté")
        navigate("/")
    }

    const signout = <FontAwesomeIcon icon={faSignOutAlt} />



    return (
        <>
            <div className="centre">
                <img src={logo}
                    className="logo"
                    alt="logo"
                />
            </div>
            <span title="Se déconnecter">
                <div className="menu" onClick={() => disconnect()}> {signout} </div>
            </span>
        </>
    );

}

// delete axios.defaults.headers.common['Authorization'];

export default Banner