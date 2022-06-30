import axios from "axios"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import "./ConnectionForm.scss"


// Composant du formulaire de connexion de la page principale
const ConnectionForm = () => {

    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState()

    const onSubmit = (data) => {
        if (data.password === "" || data.email === "") {
            setError("Veuillez remplir tous les champs")
        }
        else {
            axios.post("http://localhost:3000/auth/login", data)
                .then((result) => {
                    localStorage.token = result.data.token;
                    axios.defaults.headers.common['Authorization'] = "Bearer " + result.data.token;

                    navigate("/post");
                })
                .catch(error => {
                    setError(error.response.data.erreur)
                    console.log(error)
                })
        }
    }

    const resetError = () => {
        setError("")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="email">Email</label>
                <input {...register('email')} type="email" onChange={resetError} id="email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" onChange={resetError} {...register('password')} id="password" />
            </div>
            {error ?
                <><div>{error}</div><br></br></> : null}
            <button>Se connecter</button>
        </form>
    )
}
export default ConnectionForm