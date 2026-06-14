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

    const deletarConvidado = async function(id) {
        try{
            await api.delete(`/convidados/${id}`)
            listarConvidados();
        }catch(err){
            console.log(err);
        }
    }

    const atualizarFormulario = (e)=>{
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const cadastrarConvidado = async function(e){
        e.preventDefault();
        try{
            if(idEmEdicao){
                await api.put(`/convidados/${idEmEdicao}`, formulario);
                setIdEmEdicao(null);
            }else{
                await api.post("/convidados/", formulario);
            }
            listarConvidados();
            //limpar formulário
            setFormulario({
                nome: "",
                email: "",
                telefone: "",
                mesa: ""
            });

        }catch(err){
            console.log(err);
        }
    };

    const carregarDadosEdicao = (convidado) => {

        setFormulario({
            nome: convidado.nome,
            email: convidado.email,
            telefone: convidado.telefone,
            mesa: convidado.mesa
        });

        setIdEmEdicao(convidado.id);
    }

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

            <form onSubmit={cadastrarConvidado}>
                <input
                type="text"
                name="nome"
                placeholder="nome"
                value={formulario.nome}
                onChange={atualizarFormulario}
                />

                <input
                type="email"
                name="email"
                placeholder="email"
                value={formulario.email}
                onChange={atualizarFormulario}
                />

                <input
                type="text"
                name="telefone"
                placeholder="telefone"
                value={formulario.telefone}
                onChange={atualizarFormulario}
                />

                <input
                type="number"
                name="mesa"
                placeholder="mesa"
                value={formulario.mesa}
                onChange={atualizarFormulario}
                />

                <button type="submit">{idEmEdicao ? "Atualizar" : "Cadastrar"}</button>

            </form>

            
            {infoConvidados
                .filter((c)=> c.nome.toLowerCase().includes(busca.toLowerCase()))
                .map((c)=>(
                    <div className="containerConvidados" key={c.id}>
                        <p>{c.nome}</p>
                        <p>{c.email}</p>
                        <p>Mesa: {c.mesa}</p> 

                        <button onClick={()=> deletarConvidado(c.id)}>
                            Deletar
                        </button>
                        
                        <button onClick={()=> carregarDadosEdicao(c)}>
                            Editar
                        </button>

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