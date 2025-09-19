const Empleado = require('../models/Empleado');
const fileManager = require('../utils/fileManager');

const empleadoController = {
    // Mostrar lista de empleados
    async index(req, res) {
        try {
            const empleados = await Empleado.getAll();
            const roles = await fileManager.readJSON('roles.json');
            const areas = await fileManager.readJSON('areas.json');
            
            res.render('empleados/index', { 
                titulo: 'Gestión de Empleados',
                empleados,
                roles,
                areas
            });
        } catch (error) {
            res.status(500).send('Error al cargar empleados');
        }
    },

    // Mostrar formulario para crear empleado
    async create(req, res) {
        try {
            const roles = await fileManager.readJSON('roles.json');
            const areas = await fileManager.readJSON('areas.json');
            
            res.render('empleados/form', {
                titulo: 'Nuevo Empleado',
                empleado: null,
                roles,
                areas
            });
        } catch (error) {
            res.status(500).send('Error al cargar formulario');
        }
    },

    // Guardar nuevo empleado
    async store(req, res) {
        try {
            await Empleado.create(req.body);
            res.redirect('/empleados');
        } catch (error) {
            res.status(500).send('Error al crear empleado');
        }
    },

    // Mostrar formulario para editar
    async edit(req, res) {
        try {
            const empleado = await Empleado.getById(req.params.id);
            const roles = await fileManager.readJSON('roles.json');
            const areas = await fileManager.readJSON('areas.json');
            
            if (!empleado) {
                return res.status(404).send('Empleado no encontrado');
            }

            res.render('empleados/form', {
                titulo: 'Editar Empleado',
                empleado,
                roles,
                areas
            });
        } catch (error) {
            res.status(500).send('Error al cargar empleado');
        }
    },

    // Actualizar empleado
    async update(req, res) {
        try {
            await Empleado.update(req.params.id, req.body);
            res.redirect('/empleados');
        } catch (error) {
            res.status(500).send('Error al actualizar empleado');
        }
    },

    // Eliminar empleado
    async destroy(req, res) {
        try {
            await Empleado.delete(req.params.id);
            res.redirect('/empleados');
        } catch (error) {
            res.status(500).send('Error al eliminar empleado');
        }
    }
};

module.exports = empleadoController;