import {db} from "../db.js";

export const getConvidados = (req,res) => {
    const q = "SELECT * FROM convidados";

    db.query(q, (err, data)=>{
        if (err){
            return res.json(err);
        }
        return res.status(200).json(data);
    });
};

export const addConvidados = (req,res)=>{
    const q = "INSERT INTO convidados (nome, email, telefone, mesa) VALUES (?,?,?,?)"

    const valores = [
        req.body.nome,
        req.body.email,
        req.body.telefone,
        req.body.mesa
    ]

    db.query(q, valores, (err)=>{
        if(err){
            return res.json(err)
        }
        return res.status(200).json("Convidado cadastrado com sucesso!");
    });
};

export const atualizarconvidado = (req,res)=>{

    const q = "UPDATE convidados SET nome=?, email=?, telefone=?, mesa=? WHERE id = ?"
    const id = req.params.id;

    const valores = [
        req.body.nome,
        req.body.email,
        req.body.telefone,
        req.body.mesa
    ]

    db.query(q, [...valores, id], (err)=>{
        if(err){
            return res.json(err);
        }

        return res.status(200).json("Convidado atualizado com Sucesso!!");

    });
};

export const deletarConvidado = (req,res)=>{
    const q = "DELETE FROM convidados WHERE id =?"
    const id = req.params.id;

    db.query(q, [id], (err)=>{
        if (err){
            return res.json(err)
        }

        return res.status(200).json("Convidado deletado com sucesso!");
    });
};

export const checkinConvidado = (req, res) => {
    const q = "SELECT checkin FROM convidados WHERE id = ?";
    const id = req.params.id;
    
    db.query(q, [id], (err, data) => {
        if(err){
            return res.status(500).json(err);
        }
        if(data.length === 0){
            return res.status(404).json("Convidado não encontrado");
        }

        if(data[0].checkin){
            return res.status(400).json("Check-in já realizado");
        }

        const q2 = "UPDATE convidados SET checkin = true WHERE id = ?";

        db.query(q2, [id], (err) => {
            if(err){
                return res.status(500).json(err);
            }
            return res.status(200).json("Check-in realizado com sucesso");
        });

    });
};













