import { useForm } from "react-hook-form"
import axios from "axios"

const InscriptionForm = () => {

    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        axios.post("http://localhost:3000/auth/signup", data)
            .then(() => {
                console.log("Utilisateur inscrit")
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Pseudo</label>
                <input {...register('pseudo')} type="text" />
            </div>
            <div>
                <label>Email</label>
                <input {...register('email')} type="email" />
            </div>
            <div>
                <label>Password</label>
                <input {...register('password')} type="password" />
            </div>
            <button>S'inscrire</button>
        </form>
    )
}
export default InscriptionForm