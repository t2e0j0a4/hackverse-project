import { uploadToS3 } from '../../../connections/Aws.js';
import Instructor from '../../../models/Instructors.js';

export const addInstructor = async (req, res) => {
  const { name, occupation, description } = req.body;
  const profilePic = req.file ? req.file : null;
  if (!name) return res.status(400).json({ message: 'Provide name.' });
  if (!occupation)
    return res.status(400).json({ message: 'Provide Occupation.' });
  try {
    const format = profilePic.originalname.split('.').pop().toLowerCase();

    if (!format) {
      return res
        .status(400)
        .json({ message: 'Could not determine image format' });
    }
    const result = await uploadToS3(
      profilePic.buffer,
      `course/${Date.now().toString()}.${format}`
    );
    const intructor = new Instructor({
      name,
      occupation,
      description,
      profilePic: result.Location,
    });
    await intructor.save();
    res.status(201).json({ message: 'Instructor Added.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateInstructor = async (req, res) => {
  const updates = req.body;
  const { instructorId } = req.params;
  if (!instructorId)
    return res.status(400).json({ message: 'Provide Instructor id.' });

  const allowedUpdates = ['name', 'profilePic', 'description', 'occupation'];
  const profilePic = req.file;
  let profilePicLocation;
  const requestedUpdates = Object.keys(updates);
  const isValidUpdate = requestedUpdates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdate)
    return res.status(400).json({ message: 'Provide Valid Updates!' });

  try {
    const instructorToBeUpdated = await Instructor.findOne({
      _id: instructorId,
    });
    if (!instructorToBeUpdated)
      return res.status(404).json({ message: 'Instructor Not Found.' });
    profilePicLocation = instructorToBeUpdated.profilePic;
    if (profilePic) {
      const format = profilePic.originalname.split('.').pop().toLowerCase();

      if (!format) {
        return res
          .status(400)
          .json({ message: 'Could not determine image format' });
      }
      const result = await uploadToS3(
        profilePic.buffer,
        `course/${Date.now().toString()}.${format}`
      );
      profilePicLocation = result.Location;
    }

    const updatedIntructor = await Instructor.findByIdAndUpdate(instructorId, {
      ...updates,
      profilePic: profilePicLocation,
    });
    if (!updatedIntructor)
      return res
        .status(400)
        .json({ message: 'Unable to Update the Instructor!' });
    return res.status(201).json({ message: 'Instructor Updated!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteInstructor = async (req, res) => {
  const { instructorId } = req.params;
  if (!instructorId)
    return res.status(400).json({ message: 'Provide Instructor id.' });
  try {
    const deletedInstructor = await Instructor.findByIdAndDelete(instructorId);
    if (!deletedInstructor)
      return res.status(400).json({
        message: 'Unable to Delete the Instructor or Intructor Not found.',
      });
    return res.status(201).json({ message: 'Instructor Deleted!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getInstructorById = async (req, res) => {
  const { instructorId } = req.params;
  if (!instructorId)
    return res.status(400).json({ message: 'Provide Instructor id.' });
  try {
    const instructor = await Instructor.findOne({ _id: instructorId });
    res.status(200).json({ instructor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.status(200).json({ instructors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
