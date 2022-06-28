import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useState } from "react"

const InscriptionForm = () => {

    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const [error, setError] = useState()


    const onSubmit = (data) => {
        if (data.password === "" || data.email === "" || data.pseudo === "") {
            console.log("Veuillez remplir tous les champs")
            setError("Veuillez remplir tous les champs")
        }
        else {
            axios.post("http://localhost:3000/auth/signup", data)
                .then(() => {
                    console.log("Utilisateur inscrit")
                    setError("Vous êtes bien inscrit " + data.pseudo)
                })
                .catch(error => {
                    setError(error.response.data.error)
                })
        }
    }

    const resetError = () => {
        setError("")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label for="pseudo">Pseudo</label>
                <input {...register('pseudo')} type="text" onChange={resetError} id="pseudo" />
            </div>
            <div>
                <label for="email">Email</label>
                <input {...register('email')} type="email" onChange={resetError} id="email" />
            </div>
            <div>
                <label for="password">Password</label>
                <input {...register('password')} type="password" onChange={resetError} id="password" />
            </div>
            {error ?
                <><div>{error}</div><br></br></> : null}
            <button>S'inscrire</button>
        </form>
    )
}
export default InscriptionForm