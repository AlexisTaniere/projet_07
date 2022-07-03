import Banner from "../components/Banner";
import { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSlash } from "@fortawesome/free-solid-svg-icons";
import "./Post.scss"

// Affiche les informations d'un utlisateur et permet la suppression du compte
const Profil = () => {

    const [user, setUser] = useState({});

    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3000/auth/")
            .then(({ data }) => {
                setUser(data)
            })
    }, [])

    const deleteUser = () => {
        axios.delete("http://localhost:3000/auth")
            .then(() =>
                navigate("/")
            )
    }

    const iconDeleteUser = <FontAwesomeIcon icon={faUserSlash} />
    return (
        <>
            <Banner />
            <h1>Mon Profil</h1>
            <div className="profil">
                <p>Pseudo : {user.pseudo}</p>
                <p>Email : {user.email} </p>
                <span title="Supprimer mon compte" className="centerIcon">
                    <div className="icon" onClick={() => deleteUser()}>{iconDeleteUser}</div>
                </span>
            </div>
        </>
    )


}

export default Profil;