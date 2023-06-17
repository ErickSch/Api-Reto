/*
Este  programa se conecta a la BD para realizar  diversas operaciones
CRUD, sus parametros los recibe de el sitio en REACT y desde ahi se mandan
a llamar estas funciones.
*/

import {connectDB} from "./db.js";

const pool = await connectDB();




export const getMonedas = async (req, res) => {
  const { userId } = req.query;
  console.log("USERID: ", userId);

  try {
    const result = await pool.request().query(`SELECT monedas FROM Users where userId ='${userId}';`);
    const myResult = result.recordset[0];
    console.log("monedas: ", myResult);

    res.status(200).json(myResult);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ message: 'Error fetching employee' });
  }
};

export const updateMonedas =  async (req, res) => {
  try {
    //const userId = req.params.userId;
    const { userId, monedas } = req.body;

    await pool.query(
      `UPDATE Users SET monedas += '${monedas}' WHERE userId = '${userId}';`
    );

    res.status(200).json({ message: 'Monedas updated successfully' });
  } catch (error) {
    console.error('Error updating person:', error);
    res.status(500).json({ message: 'Error updating person' });
  }
};

export const insertBuyCosmetic =  async (req, res) => {
  
    //const userId = req.params.userId;
    const data = req.body;

    const cosmeticosId = data.cosmeticosId;
    const userId = data.userId;
    
    console.log("BOUUGHT");

    pool.query(
      `insert into usuarioCos (cosmeticosId,userId, active) values ('${cosmeticosId}','${userId}',1) ;`, (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      });
  }; 


export const getTopScore = async (req, res) => {
  const { userId } = req.query;
  console.log("USERID: ", userId);

  try {
    const result = await pool.request().query(`SELECT topScore FROM Users where userId ='${userId}';`);
    const myResult = result.recordset[0];
    console.log("Topscore: ", myResult);

    res.status(200).json(myResult);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ message: 'Error fetching employee' });
  }
};

export const updateTopScore = async (req, res) => { 

  try {
    //const userId = req.params.userId;
    const { userId, topScore } = req.body;
    console.log("USER2:",userId);
    console.log("USER2:",topScore);

    await pool.query(
      `UPDATE Users SET topScore = '${topScore}' WHERE userId = '${userId}';`
    );

    res.status(200).json({ message: 'Monedas updated successfully' });
  } catch (error) {
    console.error('Error updating person:', error);
    res.status(500).json({ message: 'Error updating person' });
  }
};

export const updateSetMonedas =  async (req, res) => {
  try {
    //const userId = req.params.userId;
    const { userId, monedas } = req.body;


    await pool.query(
      `UPDATE Users SET monedas = '${monedas}' WHERE userId = '${userId}';`
    );

    res.status(200).json({ message: 'Monedas updated successfully' });
  } catch (error) {
    console.error('Error updating person:', error);
    res.status(500).json({ message: 'Error updating person' });
  }
};
