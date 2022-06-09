const InscriptionForm = () => {

    return (
        <form>
            <div>
                <label>Pseudo</label>
                <input type="text" />
            </div>
            <div>
                <label>Email</label>
                <input type="email" />
            </div>
            <div>
                <label>Password</label>
                <input type="password" />
            </div>
            <button>S'inscrire</button>
        </form>
    )
}
export default InscriptionForm