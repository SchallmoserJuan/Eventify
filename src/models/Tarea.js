import fileManager from "../utils/fileManager.js";

class Tarea {
  constructor(
    id,
    titulo,
    descripcion,
    estado,
    prioridad,
    fechaInicio,
    fechaFin,
    empleadoId,
    eventoId,
    horasEstimadas,
    horasReales = 0
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.estado = estado; // 'pendiente', 'en proceso', 'finalizada'
    this.prioridad = prioridad; // 'alta', 'media', 'baja'
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.empleadoId = empleadoId;
    this.eventoId = eventoId;
    this.horasEstimadas = horasEstimadas;
    this.horasReales = horasReales;
    this.fechaCreacion = new Date();
  }

  static async getAll() {
    return await fileManager.readJSON("tareas.json");
  }

  static async getById(id) {
    const tareas = await this.getAll();
    return tareas.find((tarea) => tarea.id === parseInt(id));
  }

  static async getByFilters(filtros = {}) {
    let tareas = await this.getAll();

    if (filtros.estado) {
      tareas = tareas.filter((t) => t.estado === filtros.estado);
    }

    if (filtros.prioridad) {
      tareas = tareas.filter((t) => t.prioridad === filtros.prioridad);
    }

    if (filtros.empleadoId) {
      tareas = tareas.filter(
        (t) => t.empleadoId === parseInt(filtros.empleadoId)
      );
    }

    if (filtros.eventoId) {
      tareas = tareas.filter((t) => t.eventoId === parseInt(filtros.eventoId));
    }

    return tareas;
  }

  static async create(tareaData) {
    const tareas = await this.getAll();
    const nuevoId =
      tareas.length > 0 ? Math.max(...tareas.map((t) => t.id)) + 1 : 1;

    const nuevaTarea = new Tarea(
      nuevoId,
      tareaData.titulo,
      tareaData.descripcion,
      tareaData.estado || "pendiente",
      tareaData.prioridad,
      tareaData.fechaInicio,
      tareaData.fechaFin,
      parseInt(tareaData.empleadoId),
      parseInt(tareaData.eventoId),
      parseInt(tareaData.horasEstimadas),
      parseInt(tareaData.horasReales) || 0
    );

    tareas.push(nuevaTarea);
    await fileManager.writeJSON("tareas.json", tareas);
    return nuevaTarea;
  }

  static async update(id, tareaData) {
    const tareas = await this.getAll();
    const index = tareas.findIndex((t) => t.id === parseInt(id));

    if (index === -1) return null;

    tareas[index] = {
      ...tareas[index],
      titulo: tareaData.titulo,
      descripcion: tareaData.descripcion,
      estado: tareaData.estado,
      prioridad: tareaData.prioridad,
      fechaInicio: tareaData.fechaInicio,
      fechaFin: tareaData.fechaFin,
      empleadoId: parseInt(tareaData.empleadoId),
      eventoId: parseInt(tareaData.eventoId),
      horasEstimadas: parseInt(tareaData.horasEstimadas),
      horasReales: parseInt(tareaData.horasReales) || 0,
    };

    await fileManager.writeJSON("tareas.json", tareas);
    return tareas[index];
  }

  static async delete(id) {
    const tareas = await this.getAll();
    const tareasFiltradas = tareas.filter((t) => t.id !== parseInt(id));

    if (tareas.length === tareasFiltradas.length) return false;

    await fileManager.writeJSON("tareas.json", tareasFiltradas);
    return true;
  }
}

export default Tarea;
