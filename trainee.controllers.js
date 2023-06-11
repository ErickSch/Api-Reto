import {connectDB} from "./db.js";
import bcrypt from 'bcrypt';

const pool = await connectDB();


export const getEmpleado = async (req, res) => {
    const id = req.params.id;
  
    try {
      const result = await pool.request().query(`SELECT * FROM People2 WHERE Id = ${id};`);
      const person = result.recordset[0];
  
      res.status(200).json(person);
    } catch (error) {
      console.error('Error fetching person:', error);
      res.status(500).json({ message: 'Error fetching person' });
    }
  };