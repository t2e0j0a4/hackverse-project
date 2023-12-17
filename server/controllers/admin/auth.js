import Admin from '../../models/admin.js';
import bcrypt from 'bcryptjs';
import { validateEmail } from '../../utils/validation.js';
export const registerAdmin = async (req, res) => {
  const { email, username, password } = req.body;
  if (!username)
    return res.status(400).json({ message: 'Username is Required!' });
  if (!email) return res.status(400).json({ message: 'Email is Required!' });
  if (!password || password.length < 8)
    return res.status(400).json({ message: 'Provide Valid Password.' });
  const validEmail = validateEmail(email);
  if (!validEmail)
    return res.status(400).json({ message: 'Provide valid Email!' });
  try {
    const userExists = await Admin.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'Email Already Exists!' });
    const usernameExits = await Admin.findOne({ username });
    if (usernameExits)
      return res.status(400).json({ message: 'Username Already Exists!' });
    const admin = new Admin({
      username,
      email,
      password,
    });
    let adminToken = await admin.generateAuthToken();
    res.cookie('adminToken', adminToken, {
      httpOnly: true,
      maxAge: 60 * 24 * 60 * 60 * 1000,
    });
    await admin.save();
    res.status(201).json({ message: 'Admin Registered', adminToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Provide Email & Password.' });
  try {
    const adminExists = await Admin.findOne({ email });
    if (!adminExists)
      return res.status(404).json({ message: 'Email not Exists.' });
    const validPassword = await bcrypt.compare(password, adminExists.password);
    if (!validPassword)
      return res.status(400).json({ message: 'Invalid Password!' });
    let adminToken = await adminExists.generateAuthToken();
    res.cookie('adminToken', adminToken, {
      httpOnly: true,
      maxAge: 60 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ message: 'Login Sucessfull', adminToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};
