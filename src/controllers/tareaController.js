import Tarea from "../models/tarea.js";
import Empleado from "../models/Empleado.js";
import fileManager from "../utils/fileManager.js";

export async function index(req, res) {
  try {
    const filtros = req.query;
    const tareas = await Tarea.getByFilters(filtros);
    const empleados = await Empleado.getAll();
    const eventos = await fileManager.readJSON("eventos.json");
    const clientes = await fileManager.readJSON("clientes.json");

    res.render("tareas/index", {
      titulo: "Gestión de Tareas",
      tareas,
      empleados,
      eventos,
      clientes,
      filtros,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar tareas");
  }
}

export async function create(req, res) {
  try {
    const empleados = await Empleado.getAll();
    const eventos = await fileManager.readJSON("eventos.json");

    res.render("tareas/form", {
      titulo: "Nueva Tarea",
      tarea: null,
      empleados,
      eventos,
      estados: ["pendiente", "en proceso", "finalizada"],
      prioridades: ["alta", "media", "baja"],
    });
  } catch (error) {
    res.status(500).send("Error al cargar formulario");
  }
}

export async function store(req, res) {
  try {
    await Tarea.create(req.body);
    res.redirect("/tareas");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear tarea");
  }
}

export async function edit(req, res) {
  try {
    const tarea = await Tarea.getById(req.params.id);
    const empleados = await Empleado.getAll();
    const eventos = await fileManager.readJSON("eventos.json");

    if (!tarea) {
      return res.status(404).send("Tarea no encontrada");
    }

    res.render("tareas/form", {
      titulo: "Editar Tarea",
      tarea,
      empleados,
      eventos,
      estados: ["pendiente", "en proceso", "finalizada"],
      prioridades: ["alta", "media", "baja"],
    });
  } catch (error) {
    res.status(500).send("Error al cargar tarea");
  }
}

export async function update(req, res) {
  try {
    await Tarea.update(req.params.id, req.body);
    res.redirect("/tareas");
  } catch (error) {
    res.status(500).send("Error al actualizar tarea");
  }
}

export async function destroy(req, res) {
  try {
    await Tarea.delete(req.params.id);
    res.redirect("/tareas");
  } catch (error) {
    res.status(500).send("Error al eliminar tarea");
  }
}
