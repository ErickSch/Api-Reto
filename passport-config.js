import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { connectDB } from './db.js';

// Configuración para el inicio de sesión de la página.
export async function initializePassport(passport) {
  const pool = await connectDB();

  // Buscar al usuario por nombre de usuario en la base de datos.
  const getUserByGameUser = async (gameUser) => {
    const result = await pool
      .request()
      .input('gameUser', gameUser)
      .query('SELECT * FROM Users WHERE gameUser = @gameUser');

    return result.recordset[0];
  };

  // Buscar al usuario por Id en la base de datos.
  const getUserByID_CET = async (ID_CET) => {
    const result = await pool
      .request()
      .input('ID_CET', ID_CET)
      .query('SELECT * FROM Users WHERE ID_CET = @ID_CET');

    return result.recordset[0];
  };

  // Utilizar estrategia definida para el manejo del inicio de sesión.
  const strategy = new LocalStrategy(async (gameUser, pwd, cb) => {
    try {
      const user = await getUserByGameUser(gameUser);

      // Caso en el que no haya nombres de usuario registrados
      if (!user) {
        console.log('No gameUsers registered');
        return cb(null, false, { message: 'No gameUsers registered' });
      }
      // Comparar contraseña ingresada encriptada con contraseña del usuario ingresado.
      const hashedPwd = user.pwd;
      const pwdMatch = await bcrypt.compare(pwd, hashedPwd);

      // Caso en el que las contraseñas no coincidan.
      if (!pwdMatch) {
        console.log('Wrong pwd');
        return cb(null, false, { message: 'Wrong pwd' });
      }

      return cb(null, user);
    } catch (error) {
      console.error('Error logging in:', error);
      return cb(error);
    }
  });

  // Usar estrategia creada.
  passport.use(strategy);

  // Método utilizado para inicio de sesión.
  passport.serializeUser(function (user, cb) {
    return cb(null, user.ID_CET);
  });

  // Método utilizado para incio de sesión.
  passport.deserializeUser(async function (ID_CET, cb) {
    try {
      const user = await getUserByID_CET(ID_CET);

      if (!user) {
        console.log('No user with that ID_CET');
        return cb(new Error('No user with that ID_CET'));
      }

      return cb(null, user);
    } catch (error) {
      console.error('Error deserializing user:', error);
      return cb(error);
    }
  });
}
