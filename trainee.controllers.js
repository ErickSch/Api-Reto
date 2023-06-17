import {connectDB} from "./db.js";

const pool = await connectDB();

// Definición de controladores para cada ruta definida.

// Registrar el inicio de sesión del usuario.
export const postLogin = async (req, res) => {
  
  try {
    console.log("postLogin successful");
    console.log(req.session)
    res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Error logging in' });
    }

};

// Obtener el usuario que ha iniciado sesión exitosamente.
export const getLogin = async (req, res) => {
  console.log("getLogin");
  if(req.session.passport.user) {
    res.send({loggedIn: true, user: req.session.user});
  } else {
    res.send({loggedIn: false});
  }
}

// Obtener el id del usuario de la sesión.
export const getSessionUser = async (req, res, next) => {
  try {
    const user = req.session.passport;
    // console.log('Session user')
    console.log('Session id')
    console.log(req.sessionID);
    // console.log(req.isAuthenticated());
    res.send(user);
  } catch (error) {
    console.error('Error fetching session user:', error);
    res.status(500).json({ message: 'Error fetching session user' });
  }

};

// Obtener información de empleado especificado.
export const getEmpleado = async (req, res) => {
    const id = req.params.id;
  
    try {
      const result = await pool.request().query(`SELECT * FROM Empleado WHERE ID_CET = ${id};`);
      const empleado = result.recordset[0];
    
      res.status(200).json(empleado);
    } catch (error) {
      console.error('Error fetching empleado:', error);
      res.status(500).json({ message: 'Error fetching empleado' });
    }
  };

  // Editar datos de empleado especificado.
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


// Obtener una lista con la información de todos los empleados.
export const getEmpleados = async (req, res) => {
  
    try {
      const result = await pool.request().query(`SELECT * FROM Empleado;`);
      const empleados = result.recordset;
    
      res.status(200).json(empleados);
    } catch (error) {
      console.error('Error fetching empleados:', error);
      res.status(500).json({ message: 'Error fetching empleados' });
    }
  };

  // Obtener id y nombre de todos los empleados registrados.
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
  
// Registrar un empleado nuevo.
export const postEmpleado = async (req, res) => {
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

// Eliminar empleado con ID_CET especificado.
export const deleteEmpleado = async (req, res) => {
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


// Obtener la información de todos los cursos registrados.
export const getCursos = async (req, res) => {
  
    try {
      const result = await pool.request().query(`SELECT * FROM Cursos;`);
      const cursos = result.recordset;
    
      res.status(200).json(cursos);
    } catch (error) {
      console.error('Error fetching cursos:', error);
      res.status(500).json({ message: 'Error fetching cursos' });
    }
  };
  
  // Obtener la información de los cursos correspondientes a un encuadre especificado.
  export const getCursosEncuadre = async (req, res) => {
    const id = req.params.id;
  
    try {
      const result = await pool.request().query(`SELECT * FROM vw_UserCursos WHERE ID_CET = 5;`);
      const infoCursos = result.recordset;
    
      res.status(200).json(infoCursos);
    } catch (error) {
      console.error('Error fetching cursos tomados:', error);
      res.status(500).json({ message: 'Error fetching cursos tomados' });
    }
    };

  // Obtener información de los cursos tomados por un empleado especificado.
  export const getCursosTomados = async (req, res) => {
    const id = req.params.id;
  
    try {
      const result = await pool.request().query(`SELECT dbo.fn_cursosCompletados(${id});`);
      const cursosTomados = result.recordset[0];
    
      res.status(200).json(cursosTomados);
    } catch (error) {
      console.error('Error fetching cursos tomados:', error);
      res.status(500).json({ message: 'Error fetching cursos tomados' });
    }
  };
  
  // Obtener el histórico de rotaciones de el empleado especificado.
  export const getHistoricoTrainee = async (req, res) => {
    const id = req.params.id;
  
    try {
      const result = await pool.request().query(`SELECT * FROM vw_empleadoCalificacionTrainee WHERE ID_CET = 1;`);
      const cursosTomados = result.recordset;
    
      res.status(200).json(cursosTomados);
    } catch (error) {
      console.error('Error fetching cursos tomados:', error);
      res.status(500).json({ message: 'Error fetching cursos tomados' });
    }
  };


// Obtener la información de usuario del usuario especificado.
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.request().query(`SELECT * FROM Users WHERE ID_CET = ${id};`);
    const user = result.recordset[0];
  
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// Obtener la información del perfil del empleado especificado.
export const getPerfilEmpleado = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.request().query(`EXEC sp_perfilGlobalTrainee @id =  ${id};`);
    const trainee = result.recordset[0];
  
    res.status(200).json(trainee);
  } catch (error) {
    console.error('Error fetching trainee profile:', error);
    res.status(500).json({ message: 'Error fetching trainee profile' });
  }
};

// Obtener información de las áreas de interés del empleado especificado.
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

// Obtener la lista del catálogo de áreas de interés.
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

// Agregar una nueva área de interés al empleado especificado.
export const postAreaInteres = async (req, res) => {
  const id = req.params.id;  
  try {
    const areaInteresId = req.body.selectedArea
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

// Eliminar área de interés del empleado especificado.
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

// Obtener información de todas las rotaciones registradas.
export const getRotaciones = async (req, res) => {

  try {
    const result = await pool.request().query(`SELECT * FROM vw_empleadoCalificacion;`);
    const calificacion = result.recordset;
  
    res.status(200).json(calificacion);
  } catch (error) {
    console.error('Error fetching calificacion:', error);
    res.status(500).json({ message: 'Error fetching calificacion' });
  }
};

// Obtener la lista del catálogo de potenciales.
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

// Registrar una nueva rotación.
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
