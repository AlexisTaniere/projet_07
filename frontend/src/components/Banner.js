import "./Banner.scss"
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import Logo from "./logo";

const Banner = () => {

    const navigate = useNavigate()

    // Fonction permettant à un utilisateur de se déconnecter
    function disconnect() {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.clear();
        console.log("Utilisateur déconnecté")
        navigate("/")
    }

    // Fonction qui redirige vers la page de profil
    function seeProfil() {
        navigate("/Profil")
    }

    // Fonction qui redirige vers la page des posts
    function seePosts() {
        navigate("/Post")
    }

    // Déclaration des constantes pour les icones fontawesome
    const signout = <FontAwesomeIcon icon={faSignOutAlt} />
    const profil = <FontAwesomeIcon icon={faUser} />
    const post = <FontAwesomeIcon icon={faEnvelope} />


    // Affiche le logo groupomania et le menu de navigation
    return (
        <>
            <Logo />
            <div className="menu">
                <span title="Se déconnecter">
                    <div className="menu__element" onClick={() => disconnect()}> {signout} </div>
                </span>
                <span title="Profil">
                    <div className="menu__element" onClick={() => seeProfil()}> {profil} </div>
                </span>
                <span title="Post">
                    <div className="menu__element" onClick={() => seePosts()}> {post} </div>
                </span>
            </div>
        </>
    );

}


export default Banner