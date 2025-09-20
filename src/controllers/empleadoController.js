import Empleado from "../models/Empleado.js";
import fileManager from "../utils/fileManager.js";

const empleadoController = {
    async index(req, res) {
        try {
            const empleados = await Empleado.getAll();
            const roles = await fileManager.readJSON("roles.json");
            const areas = await fileManager.readJSON("areas.json");
            
            res.render("empleados/index", { 
                titulo: "Gestión de Empleados",
                empleados,
                roles,
                areas
            });
        } catch (error) {
            console.error("Error en empleadoController.index:", error);
            res.status(500).send("Error al cargar empleados");
        }
    },

    async create(req, res) {
        try {
            const roles = await fileManager.readJSON("roles.json");
            const areas = await fileManager.readJSON("areas.json");
            
            res.render("empleados/form", {
                titulo: "Nuevo Empleado",
                empleado: null,
                roles,
                areas
            });
        } catch (error) {
            console.error("Error en empleadoController.create:", error);
            res.status(500).send("Error al cargar formulario");
        }
    },

    async store(req, res) {
        try {
            await Empleado.create(req.body);
            res.redirect("/empleados");
        } catch (error) {
            console.error("Error en empleadoController.store:", error);
            res.status(500).send("Error al crear empleado");
        }
    },

    async edit(req, res) {
        try {
            const empleado = await Empleado.getById(req.params.id);
            const roles = await fileManager.readJSON("roles.json");
            const areas = await fileManager.readJSON("areas.json");
            
            if (!empleado) {
                return res.status(404).send("Empleado no encontrado");
            }

            res.render("empleados/form", {
                titulo: "Editar Empleado",
                empleado,
                roles,
                areas
            });
        } catch (error) {
            console.error("Error en empleadoController.edit:", error);
            res.status(500).send("Error al cargar empleado");
        }
    },

    async update(req, res) {
        try {
            await Empleado.update(req.params.id, req.body);
            res.redirect("/empleados");
        } catch (error) {
            console.error("Error en empleadoController.update:", error);
            res.status(500).send("Error al actualizar empleado");
        }
    },

    async destroy(req, res) {
        try {
            await Empleado.delete(req.params.id);
            res.redirect("/empleados");
        } catch (error) {
            console.error("Error en empleadoController.destroy:", error);
            res.status(500).send("Error al eliminar empleado");
        }
    }
};

export default empleadoController;