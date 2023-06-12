import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { connectDB } from './db.js';

export async function initializePassport(passport) {
  const pool = await connectDB();

  const getUserByUsername = async (username) => {
    const result = await pool
      .request()
      .input('username', username)
      .query('SELECT * FROM Users2 WHERE Username = @username');

    return result.recordset[0];
  };

  const getUserById = async (id) => {
    const result = await pool
      .request()
      .input('id', id)
      .query('SELECT * FROM Users2 WHERE Id = @id');

    return result.recordset[0];
  };

  const strategy = new LocalStrategy(async (username, password, cb) => {
    try {
      const user = await getUserByUsername(username);

      if (!user) {
        console.log('No usernames registered');
        return cb(null, false, { message: 'No usernames registered' });
      }

      const hashedPassword = user.Password;
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (!passwordMatch) {
        console.log('Wrong password');
        return cb(null, false, { message: 'Wrong password' });
      }

      return cb(null, user);
    } catch (error) {
      console.error('Error logging in:', error);
      return cb(error);
    }
  });

  passport.use(strategy);

  passport.serializeUser(function (user, cb) {
    return cb(null, user.Id);
  });

  passport.deserializeUser(async function (id, cb) {
    try {
      const user = await getUserById(id);

      if (!user) {
        console.log('No user with that id');
        return cb(new Error('No user with that id'));
      }

      return cb(null, user);
    } catch (error) {
      console.error('Error deserializing user:', error);
      return cb(error);
    }
  });
}
