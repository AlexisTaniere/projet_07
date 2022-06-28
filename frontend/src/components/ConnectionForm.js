import axios from "axios"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import "./ConnectionForm.scss"

const ConnectionForm = () => {

    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState()

    const onSubmit = (data) => {
        console.log(data)
        if (data.password === "" || data.email === "") {
            setError("Veuillez remplir tous les champs")
        }
        else {
            axios.post("http://localhost:3000/auth/login", data)
                .then((result) => {
                    console.log(result.data.userId);
                    localStorage.token = result.data.token;
                    axios.defaults.headers.common['Authorization'] = "Bearer " + result.data.token;
                    setError("")

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
                <label for="email">Email</label>
                <input {...register('email')} type="email" onChange={resetError} id="email" />
            </div>
            <div>
                <label for="password">Password</label>
                <input {...register('password')} type="password" onChange={resetError} id="password" />
            </div>
            {error ?
                <><div>{error}</div><br></br></> : null}
            <button>Se connecter</button>
        </form>
    )
}
export default ConnectionForm