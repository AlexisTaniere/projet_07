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
                <label>Pseudo</label>
                <input {...register('pseudo')} type="text" onChange={resetError} />
            </div>
            <div>
                <label>Email</label>
                <input {...register('email')} type="email" onChange={resetError} />
            </div>
            <div>
                <label>Password</label>
                <input {...register('password')} type="password" onChange={resetError} />
            </div>
            {error ?
                <><div>{error}</div><br></br></> : null}
            <button>S'inscrire</button>
        </form>
    )
}
export default InscriptionForm