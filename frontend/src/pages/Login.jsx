import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login(){

    const [formulario, setFormulario] = useState({
        email: "",
        senha: ""
    });

    const atualizarFormulario = (e) => {

        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const navegar = useNavigate();

    const fazerLogin = async function(e){
        e.preventDefault();
        
        try{
            const resposta = await api.post("/auth/login", formulario);
            console.log(resposta.data);
            
            if(resposta.data.tipo === "admin"){
                navegar("/admin");
            }else{
                navegar("/cerimonialista");
            }

        }catch(err){
            console.log(err);
        }
    };

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={fazerLogin}>
                <input
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    value={formulario.email}
                    onChange={atualizarFormulario}
                />
                <input
                    type="password"
                    name="senha"
                    placeholder="Digite sua senha"
                    value={formulario.senha}
                    onChange={atualizarFormulario}
                />
                <button type="submit">
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default Login;



