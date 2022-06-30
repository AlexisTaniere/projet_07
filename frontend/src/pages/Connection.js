import { NavLink } from 'react-router-dom'
import ConnectionForm from "../components/ConnectionForm"
import Logo from '../components/logo';
import { useState } from "react";
import InscriptionForm from '../components/InscriptionForm';

// Page d'accueil pour la connexion ou l'inscription
const Connection = () => {

    const [connection, setConnection] = useState(false);
    const [inscription, setInscription] = useState(false);
    const connectionHandler = () => {
        setConnection(true);
        setInscription(false);
    };
    const inscriptionHandler = () => {
        setConnection(false);
        setInscription(true);
    };
    return (
        <>
            <Logo />
            <nav>
                <button onClick={connectionHandler}>
                    Connexion</button>
                <button onClick={inscriptionHandler}>
                    Inscription</button>
                {connection && <ConnectionForm />

                }
                {inscription && <InscriptionForm />

                }
            </nav>
        </>
    );
}


export default Connection