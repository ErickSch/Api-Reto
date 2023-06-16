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
      
      // console.log(`UPDATE Empleado SET
      //     apellidoMat ='${apellidoMat}', 
      //     apellidoPat ='${apellidoPat}', 
      //     clerical ='${clerical}' 
      //     descTitulo ='${descTitulo}' 
      //     escuela ='${escuela}' 
      //     esp ='${esp}' 
      //     estado ='${estado}' 
      //     fechNac ='${fechNac}' 
      //     grad ='${grad}' 
      //     isManager ='${isManager}' 
      //     nombre ='${nombre}' 
      //     origenCand ='${origenCand}' 
      //     pais ='${pais}' 
      //     posAct ='${posAct}' 
      //     posIngreso ='${posIngreso}' 
      //     remuneracion ='${remuneracion}' 
      //     WHERE ID_CET='${ID_CET}'`);
      await pool.query(
          `UPDATE Empleado SET
         apellidoMat ='${apellidoMat}', 
         apellidoPat ='${apellidoPat}', 
         clerical ='${clerical}', 
         descTitulo ='${descTitulo}', 
         escuela ='${escuela}', 
         esp ='${esp}', 
         estado ='${estado}',
         fechNac ='${fechNac}', 
         grad ='${grad}', 
         isManager ='${isManager}', 
         nombre ='${nombre}', 
         origenCand ='${origenCand}', 
         pais ='${pais}', 
         posAct ='${posAct}', 
         posIngreso ='${posIngreso}', 
         remuneracion ='${remuneracion}' 
         WHERE ID_CET='${ID_CET}'`
      );
  
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

  export const getEmpleadosIdNombre = async (req, res) => {
  
    try {
      const result = await pool.request().query(`SELECT ID_CET, nombre, apellidoPat, apellidoMat FROM Empleado;`);
      const empleados = result.recordset;
    
      res.status(200).json(empleados);
    } catch (error) {
      console.error('Error fetching empleados:', error);
      res.status(500).json({ message: 'Error fetching empleados' });
    }
  };
  

export const postEmpleado = async (req, res) => {
  console.log(req.body);
  const {
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
  } = req.body
  console.log('postEmpleado')
  pool.query(
    `EXEC sp_insertTrainee
    @fechNac = '${fechNac}' , 
    @pais = '${pais}' , 
    @estado = '${estado}' , 
    @origenCand = '${origenCand}' , 
    @posIngreso = '${posIngreso}',
    @posAct = '${posAct}',
    @clerical = '${clerical}' , 
    @descTitulo = '${descTitulo}' , 
    @grad = '${grad}' , 
    @esp = '${esp}' , 
    @nombre = '${nombre}' , 
    @apellidoPat = '${apellidoPat}' , 
    @apellidoMat = '${apellidoMat}' , 
    @escuela = '${escuela}' , 
    @isManager = ${isManager} , 
    @remuneracion = '${remuneracion}',
    @pPicture = NULL,
    @jefeId = 1`
    , (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  });
};

export const deleteEmpleado = async (req, res) => {
  console.log('deleteEmpleado');
  const id = req.params.id;
  try {

    await pool.request().query(`
    DELETE FROM Rotacion WHERE ID_CET = ${id}
    DELETE FROM Empleado WHERE ID_CET = ${id};
    `);

    res.status(200).json({message: "Empleado deleted successfully"});
  } catch (error) {
    console.error('Error deleting empleado:', error);
    res.status(500).json({ message: 'Error deleting empleado' });
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


export const getAreasInteresEmpleado = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.request().query(`SELECT * FROM vw_areaDeInteres WHERE ID_CET = ${id};`);
    const areasEmpleado = result.recordset;

    res.status(200).json(areasEmpleado);
  } catch (error) {
    console.error('Error fetching areasEmpleado:', error);
    res.status(500).json({ message: 'Error fetching areasEmpleado' });
  }
};

export const getAreasInteres = async (req, res) => {

  try {
    const result = await pool.request().query(`SELECT * FROM areasCatalogo;`);
    const areas = result.recordset;
  
    res.status(200).json(areas);
  } catch (error) {
    console.error('Error fetching areas:', error);
    res.status(500).json({ message: 'Error fetching areas' });
  }
};

export const postAreaInteres = async (req, res) => {
  const id = req.params.id;

  console.log(req.body);

  // const areaInteresId = 1;
  
  try {
    const areaInteresId = req.body.selectedArea
    // Check if the user already exists in the database
    const existingArea = await pool.request().query(
      `SELECT * FROM areaInteres WHERE empleadoAreaId = ${id} AND nombreAreaId = ${areaInteresId};
      `
    );

    if (existingArea.recordset.length > 0) {
      // Area already exists, return an error message
      return res.status(400).json({ message: 'Area already exists' });
    }

    await pool.request().query(`INSERT INTO areaInteres (nombreAreaId, empleadoAreaId) VALUES (${areaInteresId}, ${id});`);

    res.status(200).json({message: "Area added successfully"});
  } catch (error) {
    console.error('Error adding area:', error);
    res.status(500).json({ message: 'Error adding area' });
  }
};


export const deleteAreaInteres = async (req, res) => {
  const id = req.params.id;
  const areaId = req.params.area

  console.log(`id: ${id}, area: ${areaId}`)

  try {


    await pool.request().query(`DELETE FROM areaInteres WHERE empleadoAreaId = ${id} AND nombreAreaId = ${areaId};`);

    res.status(200).json({message: "Area deleted successfully"});
  } catch (error) {
    console.error('Error deleting area:', error);
    res.status(500).json({ message: 'Error deleting area' });
  }
};

export const getRotaciones = async (req, res) => {

  try {
    const result = await pool.request().query(`SELECT * FROM vw_empleadoCalificacion;`);
    const calificacion = result.recordset;
  //   console.log('calificacion');
  //   console.log(calificacion);
  
    res.status(200).json(calificacion);
  } catch (error) {
    console.error('Error fetching calificacion:', error);
    res.status(500).json({ message: 'Error fetching calificacion' });
  }
};

export const getPotenciales = async (req, res) => {

  try {
    const result = await pool.request().query(`SELECT * FROM potencialCatalogo;`);
    const potencial = result.recordset;

    res.status(200).json(potencial);
  } catch (error) {
    console.error('Error fetching potencial:', error);
    res.status(500).json({ message: 'Error fetching potencial' });
  }
};



export const postRotacion = async (req, res) => {
  const {
    calificacion,
    comentarios,
    potencial,
    rotId
  } = req.body.evaluacionForm
  pool.query( `EXEC sp_insertEval @calificacion = ${calificacion}, @comentario = '${comentarios}', @potencial = ${potencial}, @rotId = ${rotId}`, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  });
};
