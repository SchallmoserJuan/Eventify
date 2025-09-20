import fileManager from "../utils/fileManager.js";

class Empleado {
    constructor(id, nombre, email, rolId, areaId, fechaIngreso = new Date()) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.rolId = rolId;
        this.areaId = areaId;
        this.fechaIngreso = fechaIngreso;
    }

    static async getAll() {
        return await fileManager.readJSON("empleados.json");
    }

    static async getById(id) {
        const empleados = await this.getAll();
        return empleados.find(emp => emp.id === parseInt(id));
    }

    static async create(empleadoData) {
        const empleados = await this.getAll();
        const nuevoId = empleados.length > 0 ? Math.max(...empleados.map(e => e.id)) + 1 : 1;
        
        const nuevoEmpleado = new Empleado(
            nuevoId,
            empleadoData.nombre,
            empleadoData.email,
            parseInt(empleadoData.rolId),
            parseInt(empleadoData.areaId),
            new Date()
        );

        empleados.push(nuevoEmpleado);
        await fileManager.writeJSON("empleados.json", empleados);
        return nuevoEmpleado;
    }

    static async update(id, empleadoData) {
        const empleados = await this.getAll();
        const index = empleados.findIndex(emp => emp.id === parseInt(id));
        
        if (index === -1) return null;

        empleados[index] = {
            ...empleados[index],
            nombre: empleadoData.nombre,
            email: empleadoData.email,
            rolId: parseInt(empleadoData.rolId),
            areaId: parseInt(empleadoData.areaId)
        };

        await fileManager.writeJSON("empleados.json", empleados);
        return empleados[index];
    }

    static async delete(id) {
        const empleados = await this.getAll();
        const empleadosFiltrados = empleados.filter(emp => emp.id !== parseInt(id));
        
        if (empleados.length === empleadosFiltrados.length) return false;
        
        await fileManager.writeJSON("empleados.json", empleadosFiltrados);
        return true;
    }
}

export default Empleado;