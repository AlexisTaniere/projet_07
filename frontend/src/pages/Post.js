import { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import Navbar from "../components/NavBar";
import "./Post.scss"
import dateFormat from "dateformat"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Banner from "../components/Banner";
import { useNavigate } from 'react-router-dom'


// Affiche l'ensemble des posts, la possibilité d'ajouter ou retirer un like
// et si l'utilisateur possède les droits, la modification ou la suppression d'un post
const Post = () => {
    const navigate = useNavigate();



    const [post, setPost] = useState([]);
    const [user, setUser] = useState({});

    // Récupère l'ensemble des posts
    function getposts() {
        axios.get("http://localhost:3000/post/")
            .then(({ data }) => {
                setPost(data)
            })
    }

    // Supprime le post ayant pour identifiant "postid"
    const deletePost = (postid) => {
        axios.delete("http://localhost:3000/post/" + postid)
            .then(() =>
                getposts())

    }

    // Gère les likes d'un post
    const liked = (postid) => {
        axios.post("http://localhost:3000/post/like/" + postid)
            .then(() => {
                getposts()
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        if (!window.localStorage.token) {
            navigate('/')
        }
        getposts();

        // Récupère les informations de l'utilisateur
        axios.get("http://localhost:3000/auth/")
            .then(({ data }) => {
                setUser(data)
            })
    }, [])

    return (
        <>
            <Banner />
            <Navbar />
            <div className="posts">
                <h1>Page des posts</h1>
                {post.map(element => {
                    const date = dateFormat(element.date, "dd/mm/yyyy") + ' à ' + dateFormat(element.date, "HH:MM");
                    const like = <FontAwesomeIcon icon={faThumbsUp} />
                    const trash = <FontAwesomeIcon icon={faTrash} />
                    const edit = <FontAwesomeIcon icon={faEdit} />
                    return (
                        <div className="post" key={`post-${element.id}`}>
                            <div className="publicationInfo">Publié le {date} par {element.pseudo}</div>
                            {element.title ? <h2>{element.title}</h2> : null}
                            <div>{element.text}</div>
                            {element.urlImage ? <div>
                                <img src={element.urlImage} alt="" />
                            </div> : null}

                            <div className="postElements">
                                <div className="like" onClick={() => liked(element.id)}>{like} {element.nbLike}</div>
                                {user.id === element.userId || user.admin === 1 ?
                                    <><Link aria-label="Modifier" to={`/post/edit/${element.id}`} state={{ element }}><div>{edit}</div></Link>
                                        <div className="trash" onClick={() => deletePost(element.id)}>{trash}</div></>
                                    : <div className="notrash"></div>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )

}

export default Post;