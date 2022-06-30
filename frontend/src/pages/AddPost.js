import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import NavBar from "../components/NavBar"
import "./Post.scss"
import Banner from "../components/Banner"


// Page permettant d'ajouter un post
const AddPost = () => {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState()


    const onSubmit = (data) => {
        const formdata = new FormData()
        formdata.append("urlImage", data.image[0])
        formdata.append("title", data.title)
        formdata.append("text", data.text)
        axios.post("http://localhost:3000/post/", formdata)
            .then((result) => {
                navigate("/post");
            })
            .catch((error) => {
                setError(error.response.data.error)
            })
    }

    useEffect(() => {
        if (!window.localStorage.token) {
            navigate('/')
        }
    }, [])


    return (
        <>
            <Banner />
            <NavBar />
            <h1>Ajout de post</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <label htmlFor="titre">Titre</label>
                    </div>
                    <textarea {...register('title')} type="text" rows="2" cols="100" autoFocus maxLength={255} id="titre" />
                </div>
                <div>
                    <div>
                        <label htmlFor="texte">Texte</label>
                    </div>
                    <textarea {...register('text')} type="text" rows="5" cols="100" maxLength={500} id="texte" />
                </div>
                <div>
                    <input {...register('image')} aria-label="Ajouter une image" type="file" />
                </div>
                <button>Ajouter un post</button>
                {error ?
                    error : null}
            </form>
        </>
    )
}

export default AddPost;