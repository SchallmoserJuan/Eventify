import express from "express";
import Empleado from "../models/Empleado.js";

const router = express.Router();

// Obtener todos
router.get("/", async (req, res) => {
  try {
    const empleados = await Empleado.getAll();
    res.json(empleados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener empleados" });
  }
});

// Obtener uno por ID
router.get("/:id", async (req, res) => {
  try {
    const empleado = await Empleado.getById(req.params.id);
    if (!empleado) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }
    res.json(empleado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener empleado" });
  }
});

// Crear
router.post("/", async (req, res) => {
  try {
    const nuevo = await Empleado.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear empleado" });
  }
});

// Actualizar
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Empleado.update(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar empleado" });
  }
});

// Eliminar
router.delete("/:id", async (req, res) => {
  try {
    await Empleado.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar empleado" });
  }
});

export default router;
