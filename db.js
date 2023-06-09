import "dotenv/config";
import sql from "mssql";

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

export async function connectDB() {
    try {
        const pool = await sql.connect(config);
        console.log("Connected!!");
        return pool;
    } catch(error) {
        console.error(error);
    }
  }



