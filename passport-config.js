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

  const getUserByUserId = async (userId) => {
    const result = await pool
      .request()
      .input('userId', userId)
      .query('SELECT * FROM Users WHERE userId = @userId');

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
    return cb(null, user.userId);
  });

  passport.deserializeUser(async function (userId, cb) {
    try {
      const user = await getUserByUserId(userId);

      if (!user) {
        console.log('No user with that userId');
        return cb(new Error('No user with that userId'));
      }

      return cb(null, user);
    } catch (error) {
      console.error('Error deserializing user:', error);
      return cb(error);
    }
  });
}
