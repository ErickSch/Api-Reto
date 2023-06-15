import {connectDB} from "./db.js";

const pool = await connectDB();


export const getEmpleado = async (req, res) => {
    const id = req.params.id;
  
    try {
      const result = await pool.request().query(`SELECT * FROM Empleado WHERE ID_CET = ${id};`);
      const empleado = result.recordset[0];
    //   console.log('empleado');
    //   console.log(empleado);
    
      res.status(200).json(empleado);
    } catch (error) {
      console.error('Error fetching empleado:', error);
      res.status(500).json({ message: 'Error fetching empleado' });
    }
  };

  export const putEmpleado = async (req, res) => {
    
    try {
      const {
        ID_CET,
        apellidoMat,
        apellidoPat,
        clerical,
        descTitulo,
        escuela,
        esp,
        estado,
        fechNac,
        grad,
        isManager,
        nombre,
        origenCand,
        pais,
        posAct,
        posIngreso,
        remuneracion, 
      } = req.body;
      
      console.log(`UPDATE Empleado SET
          apellidoMat ='${apellidoMat}', 
          apellidoPat ='${apellidoPat}', 
          clerical ='${clerical}' 
          descTitulo ='${descTitulo}' 
          escuela ='${escuela}' 
          esp ='${esp}' 
          estado ='${estado}' 
          fechNac ='${fechNac}' 
          grad ='${grad}' 
          isManager ='${isManager}' 
          nombre ='${nombre}' 
          origenCand ='${origenCand}' 
          pais ='${pais}' 
          posAct ='${posAct}' 
          posIngreso ='${posIngreso}' 
          remuneracion ='${remuneracion}' 
          WHERE ID_CET='${ID_CET}'`);
      // await pool.query(
        //   `UPDATE Empleado SET
      //    apellidoMat ='${apellidoMat}', 
      //    apellidoPat ='${apellidoPat}', 
      //    clerical ='${clerical}' 
      //    descTitulo ='${descTitulo}' 
      //    escuela ='${escuela}' 
      //    esp ='${esp}' 
      //    estado ='${estado}' 
      //    fechNac ='${fechNac}' 
      //    grad ='${grad}' 
      //    isManager ='${isManager}' 
      //    nombre ='${nombre}' 
      //    origenCand ='${origenCand}' 
      //    pais ='${pais}' 
      //    posAct ='${posAct}' 
      //    posIngreso ='${posIngreso}' 
      //    remuneracion ='${remuneracion}' 
      //    WHERE ID_CET='${ID_CET}'`
      // );
  
      res.status(200).json({ message: 'Empleado updated successfully' });
    } catch (error) {
      console.error('Error updating empleado:', error);
      res.status(500).json({ message: 'Error updating empleado' });
    }
  };



export const getEmpleados = async (req, res) => {
  
    try {
      const result = await pool.request().query(`SELECT * FROM Empleado;`);
      const empleados = result.recordset;
    //   console.log('empleados');
    //   console.log(empleados);
    
      res.status(200).json(empleados);
    } catch (error) {
      console.error('Error fetching empleados:', error);
      res.status(500).json({ message: 'Error fetching empleados' });
    }
  };



export const getCursos = async (req, res) => {
  
    try {
      const result = await pool.request().query(`SELECT * FROM Cursos;`);
      const cursos = result.recordset;
    //   console.log('cursos');
    //   console.log(cursos);
    
      res.status(200).json(cursos);
    } catch (error) {
      console.error('Error fetching cursos:', error);
      res.status(500).json({ message: 'Error fetching cursos' });
    }
  };
  
  export const getCursosEncuadre = async (req, res) => {
    
    const id = req.params.id;
  
    try {
      // const result = await pool.request().query(`SELECT * FROM vw_UserCursos WHERE ID_CET = ${id};`);
      const result = await pool.request().query(`SELECT * FROM vw_UserCursos WHERE ID_CET = 5;`);
      const infoCursos = result.recordset;
      // console.log('infoCursos por usuario ' + id);
      // console.log(infoCursos);
    
      res.status(200).json(infoCursos);
    } catch (error) {
      console.error('Error fetching cursos tomados:', error);
      res.status(500).json({ message: 'Error fetching cursos tomados' });
    }
    };

  export const getCursosTomados = async (req, res) => {
    const id = req.params.id;
  
    try {
      const result = await pool.request().query(`SELECT dbo.fn_cursosCompletados(${id});`);
      const cursosTomados = result.recordset[0];
      // console.log('cursosTomados por usuario ' + id);
      // console.log(cursosTomados);
    
      res.status(200).json(cursosTomados);
    } catch (error) {
      console.error('Error fetching cursos tomados:', error);
      res.status(500).json({ message: 'Error fetching cursos tomados' });
    }
  };
  
  export const getHistoricoTrainee = async (req, res) => {
    const id = req.params.id;
  
    try {
      // const result = await pool.request().query(`SELECT * FROM vw_empleadoCalificacionTrainee WHERE ID_CET = ${id};`);
      const result = await pool.request().query(`SELECT * FROM vw_empleadoCalificacionTrainee WHERE ID_CET = 1;`);
      const cursosTomados = result.recordset;
      // console.log('cursosTomados por usuario ' + id);
      // console.log(cursosTomados);
    
      res.status(200).json(cursosTomados);
    } catch (error) {
      console.error('Error fetching cursos tomados:', error);
      res.status(500).json({ message: 'Error fetching cursos tomados' });
    }
  };



export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.request().query(`SELECT * FROM Users WHERE ID_CET = ${id};`);
    const user = result.recordset[0];
  //   console.log('user');
  //   console.log(user);
  
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

export const getPerfilEmpleado = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.request().query(`EXEC sp_perfilGlobalTrainee @id =  ${id};`);
    const trainee = result.recordset[0];
  //   console.log('trainee');
  //   console.log(trainee);
  
    res.status(200).json(trainee);
  } catch (error) {
    console.error('Error fetching trainee profile:', error);
    res.status(500).json({ message: 'Error fetching trainee profile' });
  }
};



