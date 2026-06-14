import { db } from "../db.js";

export const login = (req, res) => {
    
    const q ="SELECT * FROM usuarios WHERE email = ?";
    

    db.query(q, [req.body.email], (err, data) => {

        if(err){
            return res.status(500).json(err);
        } 

        if(data.length === 0){
            return res.status(404).json("Usuário não encontrado");
        }

        const usuario = data[0];

        if(req.body.senha !== usuario.senha){
            return res.status(401).json("Senha incorreta");
        }

        res.status(200).json({
            message: "Login realizado",
            id: usuario.id,
            nome: usuario.nome,
            tipo: usuario.tipo
        });
    });
};



