import { Link } from "react-router-dom";

const HomePage = () => {
    return(
        <div className="text-center">
            <h1>Página de Login</h1>
            <hr/>
            <Link to='/dashboard'>Entrar no Sistema</Link>
        </div>
    );
}

export default HomePage;