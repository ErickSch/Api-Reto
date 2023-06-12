import "dotenv/config";
import sql from "mssql";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('TecTechs', 'azureuser', 'PimientaSal02', {
    host: 'servertectechs.database.windows.net',
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: false
      }
    },
  });

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

  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export async function connectDB() {
    try {
        const pool = await sql.connect(config);
        console.log("Connected!!");
        return pool;
    } catch(error) {
        console.error(error);
    }
  }





