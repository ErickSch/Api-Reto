import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { connectDB } from './db.js';

export async function initializePassport(passport) {
    const pool = await connectDB();
  const strategy = new LocalStrategy(async (username, password, cb) => {
    try {
      const result = await pool.request().query(
        `SELECT * FROM Users2 WHERE Username = '${username}'`
      );

      if (result.recordset.length === 0) {
        console.log('No usernames registered');
        return cb(null, false, { message: 'No usernames registered' });
      }

      const user = result.recordset[0];
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
    process.nextTick(function () {
      return cb(null, user.Id);
    });
  });

  passport.deserializeUser(async function (id, cb) {
    try {
      const result = await pool.request().query(
        `SELECT * FROM Users2 WHERE Id = '${id}'`
      );

      const user = result.recordset[0];

      if (!user) {
        console.log('No user with that id');
        return cb({ message: 'No user with that id' });
      }
      
      return cb(null, user);
    } catch (error) {
      console.error('Error deserializing user:', error);
      return cb(error);
    }
  });
}
