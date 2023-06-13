import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { connectDB } from './db.js';

export async function initializePassport(passport) {
  const pool = await connectDB();

  const getUserByGameUser = async (gameUser) => {
    const result = await pool
      .request()
      .input('gameUser', gameUser)
      .query('SELECT * FROM Users WHERE gameUser = @gameUser');

    return result.recordset[0];
  };

  const getUserByID_CET = async (ID_CET) => {
    const result = await pool
      .request()
      .input('ID_CET', ID_CET)
      .query('SELECT * FROM Users WHERE ID_CET = @ID_CET');

    return result.recordset[0];
  };

  const strategy = new LocalStrategy(async (gameUser, pwd, cb) => {
    try {
      const user = await getUserByGameUser(gameUser);

      if (!user) {
        console.log('No gameUsers registered');
        return cb(null, false, { message: 'No gameUsers registered' });
      }

      const hashedPwd = user.pwd;
      const pwdMatch = await bcrypt.compare(pwd, hashedPwd);

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

  passport.use(strategy);

  passport.serializeUser(function (user, cb) {
    return cb(null, user.ID_CET);
  });

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
