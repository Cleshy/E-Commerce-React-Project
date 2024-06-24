import express from "express";
import mysql2 from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Environment Variables from the .env file
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

// Connecting to the Database
const connection = mysql2.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connection to the database:", err.message);
  }
  console.log("Connected to the MYSQL database");
});

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

/*
A bodyParser middleware lehetővé teszi, hogy a beérkező kérések törzsében (body) található adatokat könnyen feldolgozd,
és hozzáférhetővé tedd. Alapértelmezés szerint az Express nem tudja automatikusan olvasni a beérkező kérések törzsét,
ezért van szükség a bodyParser middleware-re.
*/
app.use(bodyParser.json()); // JSON formátumú adatok feldolgozására szolgál
app.use(bodyParser.urlencoded({ extended: true })); // HTML formok küldik (általában)

app.post("/signup", async (request, response) => {
  const { name, email, password, role } = request.body;

  if (!name || !email || !password) {
    return response.status(400).send("Name, E-mail and password are required.");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO users (name, e-mail, password, role) VALUES (?, ?, ?, ?)";

    connection.query(
      query,
      [name, email, hashedPassword, role],
      (error, results) => {
        if (error) {
          console.error("Error inserting user into the database:", error);
          return response.status(500).send("Error registering user");
        }

        const userId = results.insertId;

        const selectQuery = "SELECT * FROM users WHERE id = ?";
        connection.query(selectQuery, [userId], (selectError, userResults) => {
          if (selectError) {
            console.error(
              "Error fetching user from the database:",
              selectError
            );
            return response.status(500).send("Error fetching registered user");
          }

          if (userResults.length === 0) {
            return response
              .status(404)
              .send("User not found after registration");
          }

          const user = userResults[0];

          // Generáljunk JWT tokent
          const token = jwt.sign(
            { userId: user.id, userRole: user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
          );

          // Visszaadjuk a felhasználó adatait és a tokent
          response.status(201).send({
            message: "Registered successfully!",
            token,
          });
        });
      }
    );
  } catch (error) {
    console.error("Error hashing password:", error);
    response.status(500).send("Internal server error");
  }
});

app.post("/login", (request, response) => {
  const { email, password } = request.body;

  try {
    const query = "SELECT * FROM users WHERE `e-mail` = ?";
    connection.query(query, [email], async (err, results) => {
      if (err) {
        console.error("Error selecting user from database:", err);
        return response.status(500).send({ message: "Error logging in" });
      }

      if (results.length === 0) {
        return response
          .status(401)
          .send({ message: "Invalid email or password" });
      }

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return response
          .status(401)
          .send({ message: "Invalid e-mail or password" });
      }

      const token = jwt.sign(
        { userId: user.id, userRole: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      response.status(200).json({ token });
    });
  } catch (error) {
    console.error("Error logging in:", error);
    response.status(500).send({ message: "Internal server error" });
  }
});

app.get("/profile", (request, response) => {
  const userId = request.headers["user-id"];

  try {
    const query =
      "SELECT id, name, `e-mail`, phone, zip, city, address FROM users WHERE id = ?";
    connection.query(query, [userId], (error, result) => {
      if (error) {
        response.status(400).send("Server error");
      }
      const user = result[0];
      response.status(200).send(user);
    });
  } catch (error) {}
});

app.get("/users", (request, response) => {
  try {
    const query = "SELECT * FROM users WHERE role = 1";
    connection.query(query, (error, result) => {
      if (error) {
        response.status(400).send("Server error");
      }
      const users = result;
      response.status(200).send(users);
    });
  } catch (error) {}
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
