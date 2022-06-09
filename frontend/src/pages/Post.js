import { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import Navbar from "../components/NavBar";
import "./Post.scss"
import dateFormat from "dateformat"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import Banner from "../components/Banner";



const Post = () => {



    const [post, setPost] = useState([]);
    const [user, setUser] = useState({});

    function getposts() {
        axios.get("http://localhost:3000/post/")
            .then(({ data }) => {
                console.log(data)
                setPost(data)
            })
    }

    const deletePost = (postid) => {
        console.log("C'est clické")
        axios.delete("http://localhost:3000/post/" + postid)
            .then(() =>
                getposts())

    }

    const liked = () => {
        console.log("C'est clické")
    }

    useEffect(() => {
        getposts();
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
                    return (
                        <div className="post">
                            <div className="publicationInfo">Publié le {date} par {element.pseudo}</div>
                            {element.title ? <h2>{element.title}</h2> : null}
                            <div>{element.text}</div>
                            <div className="postElements">
                                <div className="like" onClick={liked}>{like}</div>
                                {user.id === element.userId ? <div className="trash" onClick={() => deletePost(element.id)}>{trash}</div> : ""}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )

}

export default Post;