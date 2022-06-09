import "./Banner.scss"
import logo from "./groupomania.png"

const Banner = () => {


    return (
        <div className="centre">
            <img src={logo}
                className="logo"
                alt="logo"
            />
        </div>
    );

}


export default Banner