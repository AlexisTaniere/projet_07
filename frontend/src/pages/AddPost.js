import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import NavBar from "../components/NavBar"
import "./Post.scss"
import Banner from "../components/Banner"

const AddPost = () => {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState()

    const onSubmit = (data) => {
        axios.post("http://localhost:3000/post/", data)
            .then((result) => {
                navigate("/post");
            })
            .catch((error) => {
                setError(error.response.data.error)
            })
    }


    return (
        <>
            <Banner />
            <NavBar />
            <h1>Ajout de post</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <label>Titre</label>
                    </div>
                    <textarea {...register('title')} type="text" rows="2" cols="100" autoFocus maxLength={255} />
                </div>
                <div>
                    <div>
                        <label>Texte</label>
                    </div>
                    <textarea {...register('text')} type="text" rows="5" cols="100" maxLength={500} />
                </div>
                <button>Ajouter un post</button>
                {error ?
                    error : null}
            </form>
        </>
    )
}

export default AddPost;