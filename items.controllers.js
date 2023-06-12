import {connectDB} from "./db.js";
import bcrypt from 'bcrypt';

const pool = await connectDB();
export const getPeople = async (req, res) => {
  try {
    const result = await pool.request().query('SELECT * FROM People2;');
    const people = result.recordset;
    res.json(people);
  } catch (error) {
    console.error('Error fetching people:', error);
    res.status(500).json({ message: 'Error fetching people' });
  }
};

export const getOnePeople = async (req, res) => {
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

export const getIsManager = async (req, res) => {
  console.log(getIsManager);
  const id = req.params.id;

  try {
    const result = await pool.request().query(`SELECT isManager FROM Empleado WHERE Id = ${id};`);
    const person = result.recordset[0];

    res.status(200).json(person);
  } catch (error) {
    console.error('Error fetching empleado:', error);
    res.status(500).json({ message: 'Error fetching empleado' });
  }
}

export const postPeople = async (req, res) => {
  // console.log(req.body);
  const data = req.body;

  const name = data.Name;
  const age = data.Age;
  const city = data.City;

  pool.query(`INSERT INTO People2 (Name, Age, City) VALUES ('${name}', ${age}, '${city}');`, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  });
};

export const getEmployee = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.request().query(`SELECT * FROM People2 WHERE Id = ${id};`);
    const person = result.recordset[0];
    // console.log(result);

    res.status(200).json(person);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ message: 'Error fetching employee' });
  }
};

export const postEmployee = async (req, res) => {
  // console.log(req.body);
  const data = req.body;

  const { username, password, name, age, city } = req.body;
  // console.log(`username: ${username}, password: ${password}, name: ${name}, age: ${age}, city: ${city}`);

  try {
    // Check if the user already exists in the database
    const existingUser = await pool.request().query(
      `SELECT * FROM Users2 WHERE Username = '${username}'`
    );

    if (existingUser.recordset.length > 0) {
      // User already exists, return an error message
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Encrypt the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Proceed with registration and store the hashed password in the database
    const result = await pool.request().query(
      `INSERT INTO Users2 (IdEmpleado, username, password) VALUES (1, '${username}', '${hashedPassword}')`
    );

    pool.query(`INSERT INTO People2 (Name, Age, City) VALUES ('${name}', ${age}, '${city}');`, (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    });

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};


export const deletePeople = async (req, res) => {
  try {
    const id = req.params.id;

    await pool.query(`DELETE FROM People2 WHERE Id = '${id}'`);

    res.status(200).json({ message: 'Person deleted successfully' });
  } catch (error) {
    console.error('Error deleting person:', error);
    res.status(500).json({ message: 'Error deleting person' });
  }
};

export const updatePeople = async (req, res) => {
  try {
    const id = req.params.id;
    const { Name, Age, City } = req.body;

    await pool.query(
      `UPDATE People2 SET Name='${Name}', Age='${Age}', City='${City}' WHERE Id='${id}'`
    );

    res.status(200).json({ message: 'Person updated successfully' });
  } catch (error) {
    console.error('Error updating person:', error);
    res.status(500).json({ message: 'Error updating person' });
  }
};

//////////////////
// Authentication 
//////////////////
//Id - Name - Age - City    
export const postRegister = async (req, res) => {
  console.log("Post register");
  console.log("Authenticating");
  console.log(req.isAuthenticated());
  const { username, password } = req.body;
  try {
    // Check if the user already exists in the database
    const existingUser = await pool.request().query(
      `SELECT * FROM Users2 WHERE Username = '${username}'`
    );

    if (existingUser.recordset.length > 0) {
      // User already exists, return an error message
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Encrypt the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Proceed with registration and store the hashed password in the database
    const result = await pool.request().query(
      `INSERT INTO Users2 (username, password) VALUES ('${username}', '${hashedPassword}')`
    );

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};


// --------------------------------------

export const getLogin = async (req, res) => {
  console.log("getLogin");
  if(req.session.passport.user) {
    res.send({loggedIn: true, user: req.session.user});
  } else {
    res.send({loggedIn: false});
  }
}


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


export const getProfile = async (req, res) => {
  const id = req.params.id; // Assuming you have a middleware that sets the authenticated user's ID in the request object
  console.log("getProfile id:" + id);  
  try {
    const result = await pool.request().query(`SELECT * FROM Users2 WHERE id = ${id}`);
    const user = result.recordset[0];
    // Return the user profile information
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};

export const postLogout = (req, res) => {
  try {
    req.logout(function (err) {
      if (err) {
        console.error('Error logging out:', err);
        return res.status(500).json({ message: 'Error logging out' });
      }
      // Clear the session and remove the stored user ID
      req.session.destroy(function (err) {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).json({ message: 'Error logging out' });
        }
        res.status(200).json({ message: 'Logout successful' });
      });
    });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: 'Error logging out' });
  }
};


export const isAuthenticated = (req, res, next) => {
    console.log("Authenticating");
    console.log(req.user);
  if (req.user) {
    // User is authenticated, proceed to the next middleware or route
    console.log("User is authenticated");
    // res.status(200).json({message: "User is authenticated"});
    return next();
  }else{
    // User is not authenticated, redirect to the login page or send an error response
    console.log("The user is not authenticated");
    res.status(401).json({ message: 'Unauthorized' });

  }
  //   console.log("Authenticating");
  //   console.log(req.isAuthenticated());
  // if (req.isAuthenticated()) {
  //   // User is authenticated, proceed to the next middleware or route
  //   console.log("User is authenticated");
  //   // res.status(200).json({message: "User is authenticated"});
  //   return next();
  // }else{
  //   // User is not authenticated, redirect to the login page or send an error response
  //   console.log("The user is not authenticated");
  //   res.status(401).json({ message: 'Unauthorized' });

  // }

};

export const getSessionUser = async (req, res, next) => {
  try {
    const user = req.session.passport;
    console.log('Session user')
    console.log(req.user);
    // console.log(req.isAuthenticated());
    res.send(user);
  } catch (error) {
    console.error('Error fetching session user:', error);
    res.status(500).json({ message: 'Error fetching session user' });
  }

};

export const getIsAuthenticated = async (req, res) => {
  try {
    const authenticated = req.isAuthenticated();
    console.log('getIsAuthenticated')
    // console.log(req.isAuthenticated);
    // console.log(authenticated);
    res.status(200).json(authenticated);
  } catch (error) {
    console.error('Error fetching auth:', error);
    res.status(500).json({ message: 'Error fetching auth' });
  }

};














