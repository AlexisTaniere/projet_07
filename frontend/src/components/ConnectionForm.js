import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import "./ConnectionForm.scss"

const ConnectionForm = () => {

    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        axios.post("http://localhost:3000/auth/login", data)
            .then((result) => {
                console.log(result.data.userId);
                localStorage.token = result.data.token;
                axios.defaults.headers.common['Authorization'] = "Bearer " + result.data.token;
                navigate("/post");
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Email</label>
                <input {...register('email')} type="email" />
            </div>
            <div>
                <label>Password</label>
                <input {...register('password')} type="password" />
            </div>
            <button>Se connecter</button>
        </form>
    )
}
export default ConnectionForm