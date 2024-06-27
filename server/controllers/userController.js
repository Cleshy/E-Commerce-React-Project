import { models } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const addUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, E-mail and Password are required!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await models.User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: newUser.id, userRole: newUser.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).send({ message: "Registered successfully!", token });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await models.User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).send({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, userRole: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Something went wrong:", error);
  }
};

const getUserProfile = async (req, res) => {
  const userId = req.headers["user-id"];

  try {
    const user = models.User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(500).json({ error: "User not found." });
    }

    res.status(200).send(user);
  } catch (error) {}
};

const getAllUsers = async (req, res) => {
  try {
    const users = await models.User.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addUser, loginUser, getUserProfile, getAllUsers };
