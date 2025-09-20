import { Router } from "express";
import Tarea from "../models/tarea.js";

const router = Router();

// GET /api/tareas → lista todas
router.get("/", async (req, res) => {
  try {
    const filtros = req.query;
    const tareas = await Tarea.getByFilters(filtros);
    res.json(tareas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

// POST /api/tareas → crea nueva
router.post("/", async (req, res) => {
  try {
    const nueva = await Tarea.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear tarea" });
  }
});

// GET /api/tareas/:id → obtener una
router.get("/:id", async (req, res) => {
  try {
    const tarea = await Tarea.getById(req.params.id);
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });
    res.json(tarea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener tarea" });
  }
});

// PUT /api/tareas/:id → actualizar
router.put("/:id", async (req, res) => {
  try {
    const actualizada = await Tarea.update(req.params.id, req.body);
    res.json(actualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar tarea" });
  }
});

// DELETE /api/tareas/:id → eliminar
router.delete("/:id", async (req, res) => {
  try {
    await Tarea.delete(req.params.id);
    res.status(204).send(); // 204 = sin contenido
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
});

export default router;
