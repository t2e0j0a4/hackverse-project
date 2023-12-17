import bcrypt from 'bcryptjs';
import { validateEmail } from '../../utils/validation.js';
import Student from '../../models/student.js';
import { OAuth2Client } from 'google-auth-library';
export const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName)
    return res.status(400).json({ message: 'Full Name is required.' });
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  if (!password || password.length < 8)
    return res.status(400).json({ message: 'Provide valid Password' });
  const isEmailValid = validateEmail(email);
  if (!isEmailValid) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  try {
    const emailExists = await Student.findOne({ email: email });

    if (emailExists) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const newStudent = new Student({
      fullName,
      email,

      password,
    });
    const accessToken = await newStudent.generateAuthToken();
    await newStudent.save();
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 60 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      message: 'Registered successfully',
      token: accessToken,
      user: {
        id: newStudent._id,
        email: newStudent.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
// export const additionalInfo = async (req, res) => {
//   const { userId, age, domains } = req.body;
//   if (!userId) return res.status(403).json({ message: 'User not provided' });
//   if (!age) return res.status(400).json({ message: 'Age should not be empty' });

//   if (!domains || !Array.isArray(domains)) {
//     return res
//       .status(400)
//       .json({ message: 'Domains should be an array of strings' });
//   }
//   if (domains.length === 0) {
//     return res
//       .status(400)
//       .json({ message: 'Domains array should not be empty' });
//   }
//   const areAllDomainsStrings = domains.every(
//     (domain) => typeof domain === 'string'
//   );

//   if (!areAllDomainsStrings)
//     return res
//       .status(400)
//       .json({ message: 'Domains should be an array of strings' });
//   const userExits = await user.findOne({ _id: userId });
//   if (!userExits) return res.status(403).json({ message: "User dosn't exits" });
//   try {
//     await user.findByIdAndUpdate(userId, {
//       age,
//       domains,
//     });

//     return res.status(201).json({ message: 'Age and domains added' });
//   } catch (error) {
//     return res.status(500).json({ message: 'Something went wrong' });
//   }
// };
export const googleAuth = async (req, res) => {
  try {
    const { tokenId } = req.body;
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const verify = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.CLIENT_ID,
    });
    const { email_verified, email, name } = verify.payload;
    if (!email_verified) res.json({ message: 'Email Not Verified' });
    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      res.cookie('accessToken', tokenId, {
        httpOnly: true,
        maxAge: 60 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ token: tokenId, user: userExist });
    } else {
      const password = email + Date.now().toString();
      const newStudent = await Student({
        fullName: name || 'New Student',
        email,
        password,
      });
      res.cookie('accessToken', tokenId, {
        httpOnly: true,
        maxAge: 60 * 24 * 60 * 60 * 1000,
      });
      await newStudent.save();
      res
        .status(200)
        .json({ message: 'Registered Successfully', token: tokenId });
    }
  } catch (error) {
    res.status(500).json({ error: error });
    console.log('error in googleAuth backend' + error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  const isEmailValid = validateEmail(email);
  if (!isEmailValid) {
    return res.status(400).json({ message: 'Invalid email' });
  }
  try {
    const studentExist = await Student.findOne({ email: email });

    if (!studentExist) {
      return res.status(409).json({ message: 'Student not exists' });
    }

    if (!password) return res.status(400).json({ message: 'Provide Password' });
    if (password.length < 6)
      res
        .status(400)
        .json({ message: 'Password should contain more than 6 characters' });

    const validPassword = await bcrypt.compare(password, studentExist.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid Password' });
    }
    const accessToken = await studentExist.generateAuthToken();
    const userData = {
      userId: studentExist._id,
      userName: studentExist.username,
    };
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 60 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: 'Login Sucessfull',
      accessToken: accessToken,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const validUser = async (req, res) => {
  try {
    const validStudent = await Student.findOne({
      _id: req.rootStudent._id,
    }).select('firstName lastName email _id');
    if (!validStudent) res.json({ message: 'Student is not valid' });
    res.status(201).json({
      user: validStudent,
      accessToken: req.token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};
export const updateUser = async (req, res) => {
  const studentId = req.rootStudent._id;
  let education;
  if (!studentId)
    return res.json(403).json({ message: 'Student not Authenticated' });
  const updates = req.body;
  const allowedUpdates = ['fullName', 'interests', 'education'];

  const requestedUpdates = Object.keys(updates);
  const isValidOperation = requestedUpdates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).json({ error: 'Invalid updates' });
  if (requestedUpdates.includes('education')) {
    const { school, degree, fieldOfStudy, startDate, endDate, description } =
      req.body.education;

    if (!school) return res.status(400).json({ message: 'provide school' });
    if (!degree) return res.status(400).json({ message: 'provide degree' });
    if (!fieldOfStudy)
      return res.status(400).json({ message: 'provide fieldOfStudy' });
    if (!startDate)
      return res.status(400).json({ message: 'provide startDate' });
    if (!endDate) return res.status(400).json({ message: 'provide endDate' });
  }
  try {
    const updatedUser = await Student.findByIdAndUpdate(studentId, updates, {
      new: true, // This option returns the updated user document
      runValidators: true, // This option runs the validators defined in the userSchema for the updates
    });
    if (updatedUser)
      return res.status(201).json({ message: 'Student updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const educationDetails = async (req, res) => {
  const { school, degree, fieldOfStudy, startDate, endDate, description } =
    req.body;

  if (!school) return res.status(400).json({ message: 'provide school' });
  if (!degree) return res.status(400).json({ message: 'provide degree' });
  if (!fieldOfStudy)
    return res.status(400).json({ message: 'provide fieldOfStudy' });
  if (!startDate) return res.status(400).json({ message: 'provide startDate' });
  if (!endDate) return res.status(400).json({ message: 'provide endDate' });
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: req.rootStudent._id },
      {
        $set: {
          education: {
            school,
            degree,
            fieldOfStudy,
            startDate,
            endDate,
            description,
          },
        },
      }
    );
    console.log(updatedStudent);
    res.status(200).json({ message: 'Education Added.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.log(error);
  }
};
