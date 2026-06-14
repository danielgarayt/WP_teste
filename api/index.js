import express from "express";
import cors from "cors";
import { db } from "./db.js";
import routesConvidados from "./routes/routesConvidados.js"
import authRoutes from "./routes/auth.js";



const app = express();

app.use(express.json());
app.use(cors());

app.use("/convidados", routesConvidados);
app.use("/auth", authRoutes);


app.get("/", (req, res) =>{
    res.send("APi rodando normalmente!! ");
});

const port = 8800

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
});



