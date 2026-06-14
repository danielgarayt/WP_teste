import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"sql@123",
    database:"wedding_pass",
    port: "3308"
});

db.connect((err)=>{
    if (err){
        console.log("Erro ao conectar no bando de dados", err);
    }else{
        console.log("Conectado ao Mysql com sucesso!!")
    }

});