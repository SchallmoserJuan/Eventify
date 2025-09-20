import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// 🔹 Definir __dirname manualmente en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Clase para manejar la lectura y escritura de archivos JSON
 * Actúa como una capa de abstracción para el almacenamiento
 */
class FileManager {
    constructor() {
        this.dataPath = join(__dirname, '../../data');
        this.ensureDataDirectory();
    }

    /**
     * Asegura que el directorio de datos exista
     */
    async ensureDataDirectory() {
        try {
            await fs.access(this.dataPath);
        } catch (error) {
            await fs.mkdir(this.dataPath, { recursive: true });
        }
    }

    /**
     * Lee un archivo JSON y devuelve el contenido parseado
     * @param {string} filename - Nombre del archivo JSON
     * @returns {Promise<Array>} Array con los datos del archivo
     */
    async readJSON(filename) {
        try {
            const filePath = join(this.dataPath, filename);
            await fs.access(filePath); // Verificar si el archivo existe
            const data = await fs.readFile(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // Si el archivo no existe, crear uno vacío
                console.log(`📄 Archivo ${filename} no existe, creando archivo vacío...`);
                await this.writeJSON(filename, []);
                return [];
            }
            console.error(`❌ Error leyendo ${filename}:`, error.message);
            return [];
        }
    }

    /**
     * Escribe datos en un archivo JSON
     * @param {string} filename - Nombre del archivo JSON
     * @param {Array} data - Datos a escribir
     * @returns {Promise<boolean>} True si se escribió correctamente
     */
    async writeJSON(filename, data) {
        try {
            const filePath = join(this.dataPath, filename);
            await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
            console.log(`✅ Archivo ${filename} actualizado correctamente`);
            return true;
        } catch (error) {
            console.error(`❌ Error escribiendo ${filename}:`, error.message);
            return false;
        }
    }

    /**
     * Verifica si un archivo existe
     * @param {string} filename - Nombre del archivo
     * @returns {Promise<boolean>} True si el archivo existe
     */
    async fileExists(filename) {
        try {
            const filePath = join(this.dataPath, filename);
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Hace backup de un archivo
     * @param {string} filename - Nombre del archivo
     * @returns {Promise<boolean>} True si se hizo backup correctamente
     */
    async backupFile(filename) {
        try {
            const originalPath = join(this.dataPath, filename);
            const backupPath = join(this.dataPath, `${filename}.backup`);
            await fs.copyFile(originalPath, backupPath);
            console.log(`💾 Backup creado: ${filename}.backup`);
            return true;
        } catch (error) {
            console.error(`❌ Error creando backup de ${filename}:`, error.message);
            return false;
        }
    }
}

// Exportar una instancia única (Singleton)
export default new FileManager();
