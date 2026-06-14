import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Convidados from "./pages/Convidados.jsx";
import Cerimonialista from "./pages/Cerimonialista.jsx";

function App() {
  
  return(

        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Login/>}
                />
                <Route
                    path="/admin"
                    element={<Convidados/>}
                />
                <Route
                    path="/cerimonialista"
                    element={<Cerimonialista/>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App


