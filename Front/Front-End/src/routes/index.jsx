import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/registro";
const Routescomponentes = () =>{
    return(
        <Routes>
            <Route path="/login" element={ <Login /> }/>
            <Route path="/register" element={ <Register /> }/>
            <Route path="/" element={ <Home /> }/>
        </Routes>

    )
}

export default Routescomponentes;