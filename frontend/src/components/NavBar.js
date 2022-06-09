import { Link } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {

    return (
        <>
            <nav>
                <Link to="/post"><button>Voir tous les posts</button></Link>
                <Link to="/post/add"><button>Ajouter un post</button></Link>
            </nav>
        </>
    )
}

export default NavBar