import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class Database {
    constructor() {
        this.connect();
    }

    async connect() {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('🚀 Conectado a MongoDB Atlas exitosamente!');
            
            // Event listeners para monitorear la conexión
            mongoose.connection.on('error', (error) => {
                console.error('❌ Error de MongoDB:', error);
            });
            
            mongoose.connection.on('disconnected', () => {
                console.log('⚠️ MongoDB desconectado');
            });
            
        } catch (error) {
            console.error('❌ Error conectando a MongoDB:', error.message);
            process.exit(1);
        }
    }
}

export default new Database();