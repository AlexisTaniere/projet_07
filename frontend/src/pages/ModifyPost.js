import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import NavBar from "../components/NavBar"
import "./Post.scss"
import Banner from "../components/Banner"
import { useParams, useLocation } from "react-router-dom"

// Page de modification d'un post
const ModifyPost = () => {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState()
    const params = useParams()
    const location = useLocation()
    const { element } = location.state


    const onSubmit = (data) => {
        const formdata = new FormData()
        formdata.append("urlImage", data.image[0])
        formdata.append("title", data.title)
        formdata.append("text", data.text)
        axios.put("http://localhost:3000/post/" + params.id, formdata)
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
            <h1>Modification de post</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <label htmlFor="titre">Titre</label>
                    </div>
                    <textarea {...register('title')} defaultValue={element.title} type="text" rows="2" cols="100" autoFocus maxLength={255} id="titre" />
                </div>
                <div>
                    <div>
                        <label htmlFor="texte">Texte</label>
                    </div>
                    <textarea {...register('text')} defaultValue={element.text} type="text" rows="5" cols="100" maxLength={500} id="texte" />
                </div>
                <div>
                    <input {...register('image')} aria-label="Ajouter une image" type="file" />
                </div>
                <button>Modifier un post</button>
                {error ?
                    error : null}
            </form>
        </>
    )
}

export default ModifyPost;