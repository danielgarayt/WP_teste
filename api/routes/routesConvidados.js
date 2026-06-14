import express from "express";

import {
    getConvidados,
    addConvidados,
    atualizarconvidado,
    deletarConvidado,
    checkinConvidado
} from "../controllers/convidadosControllers.js";

const router = express.Router();

router.get("/", getConvidados);

router.post("/", addConvidados);

router.put("/:id", atualizarconvidado);

router.delete("/:id", deletarConvidado);

router.put("/checkin/:id", checkinConvidado);

export default router;