import express from "express";
import empleadoController from "../controllers/empleadoController.js";

const router = express.Router();

router.get("/", empleadoController.index);
router.get("/nuevo", empleadoController.create);
router.post("/", empleadoController.store);
router.get("/:id/editar", empleadoController.edit);
router.put("/:id", empleadoController.update);
router.delete("/:id", empleadoController.destroy);

export default router;