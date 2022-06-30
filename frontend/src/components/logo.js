import logo from "./groupomania.png"
import "./Banner.scss"

// Composant qui affiche le logo de Groupomania
const Logo = () => {

    return (
        <>
            <div className="centre">
                <img src={logo}
                    className="logo"
                    alt="logo de groupomania"
                />
            </div>
        </>
    )

}

export default Logo
