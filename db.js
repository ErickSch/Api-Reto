import "dotenv/config";
import sql from "mssql";

// Configuración para conexión con base de datos en la nube.
const config = {
    user: 'azureuser',
    password: 'PimientaSal02',
    server: 'servertectechs.database.windows.net', 
    database: 'TecTechs',
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
  };

// Función para hacer la conexión con la base de datos en la nube utilizando la información de "config".
export async function connectDB() {
    try {
        const pool = await sql.connect(config);
        console.log("Connected!!");
        return pool;
    } catch(error) {
        console.error(error);
    }
  }





