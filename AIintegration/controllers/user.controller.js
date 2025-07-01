
import User from '../models/User.model.js';
import argon2 from 'argon2';
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await argon2.hash(password);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};
