import { useState, useEffect } from "react";
import api from "../services/api.js";
import "../styles/convidados.css"

function Convidados (){

    const [infoConvidados, setConvidados] = useState([]);
    //Estado do formulário
    const [formulario, setFormulario] = useState({nome: "", email: "", telefone: "", mesa: ""});
    const [idEmEdicao, setIdEmEdicao] = useState(null);
    const [busca, setBusca] = useState("");


    const listarConvidados = async function (){
            try{
                // Faz uma requisição GET para a API e aguarda a resposta
                const resposta = await api.get("/convidados");
                // resposta.data contém os dados enviados pelo backend
                setConvidados(resposta.data);
                console.log(resposta);
                console.log(resposta.data);
            }catch (err){
                console.log(err);
            }
    };

    const fazerCheckin = async function (id) {
        try{
            await api.put(`/convidados/checkin/${id}`);
            listarConvidados();
        }catch(err){
            console.log(err);
            alert(err.response.data);
        }
    }

    useEffect(()=>{
        listarConvidados();
    },[]);

    
    return(
        <div>
            
            <input 
                type="text"
                placeholder="Buscar convidado..."
                value={busca}
                onChange={(e)=> setBusca(e.target.value)}
            />

            <h1>Lista de Convidados: </h1>

            {infoConvidados
                .filter((c)=> c.nome.toLowerCase().includes(busca.toLowerCase()))
                .map((c)=>(
                    <div className="containerConvidados" key={c.id}>
                        <p>{c.nome}</p>
                        <p>{c.email}</p>
                        <p>Mesa: {c.mesa}</p> 

                        <button onClick={()=> fazerCheckin(c.id)}>
                            Check-in
                        </button>

                        <p>Status:{c.checkin ? "Presente ✅" : "Não entrou ❌"}</p>    

                    </div>
            ))}
        </div>
    );
    
}

export default Convidados;  