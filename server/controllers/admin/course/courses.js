import slugify from 'slugify';
import { uploadToS3 } from '../../../connections/Aws.js';
import Course from '../../../models/course.js';

export const addCourse = async (req, res) => {
  const { title, description, domain, price, totalLectures, instructorId } =
    req.body;
  const coverImage = req.file;
  if (!title) return res.status(400).json({ message: 'Provide Title.' });
  if (!description)
    return res.status(400).json({ message: 'Provide Description.' });
  if (!domain) return res.status(400).json({ message: 'Provide Domain.' });
  if (!price) return res.status(400).json({ message: 'Provide Price.' });
  if (!totalLectures)
    return res.status(400).json({ message: 'Provide Total Videos.' });
  if (!coverImage)
    return res.status(400).json({ message: 'Provide Cover Image.' });
  if (!instructorId)
    return res.status(400).json({ message: 'Provide Instructor Id' });
  try {
    const format = coverImage.originalname.split('.').pop().toLowerCase();

    if (!format) {
      return res
        .status(400)
        .json({ message: 'Could not determine image format' });
    }
    const result = await uploadToS3(
      coverImage.buffer,
      `course/${Date.now().toString()}.${format}`
    );
    console.log(result.location);
    const slug = slugify(title, { lower: true });
    const newCourse = new Course({
      title,
      description,
      domain,
      price,
      totalLectures,
      slug,
      owner: req.admin._id,
      coverImage: result.Location,
      instructors: instructorId,
    });
    await newCourse.save();
    return res.status(201).json({ message: 'Course Created.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const updates = req.body;
  const coverImage = req.file;
  console.log(req.body);
  console.log(updates);
  console.log(courseId);

  let slug;
  let coverImageLocation;
  if (!courseId) return res.status(400).json({ message: 'Provide course id.' });
  try {
    const course = await Course.findOne({
      _id: courseId,
      owner: req.admin._id,
    });
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    const allowedUpdates = [
      'title',
      'description',
      'domain',
      'price',
      'totalVideos',
      'coverImage',
    ];
    slug = course.slug;
    coverImageLocation = course.coverImage;
    const requestedUpdates = Object.keys(updates);
    const isValidUpdate = requestedUpdates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidUpdate)
      return res.status(400).json({ message: 'Provide Valid Updates!' });
    if (requestedUpdates.includes('title')) {
      slug = slugify(req.body.title, { lower: true });
    }

    if (coverImage) {
      const format = coverImage.originalname.split('.').pop().toLowerCase();

      if (!format) {
        return res
          .status(400)
          .json({ message: 'Could not determine image format' });
      }
      const result = await uploadToS3(
        coverImage.buffer,
        `course/${Date.now().toString()}.${format}`
      );
      coverImageLocation = result.Location;
    }

    const updatedCourse = await Course.findByIdAndUpdate(courseId, {
      ...updates,
      slug,
      coverImage: coverImageLocation,
    });
    console.log(updateCourse);
    if (!updatedCourse)
      return res.status(400).json({ message: 'Unable to Update the Course!' });
    return res.status(201).json({ message: 'Course Updated!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteCourse = async (req, res) => {
  const { courseId } = req.params;

  if (!courseId) return res.status(400).json({ message: 'Provide course id.' });
  try {
    const course = await Course.findOne({
      _id: courseId,
      owner: req.admin._id,
    });
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse)
      return res
        .status(400)
        .json({ message: 'Something Went Wrong. Try Again!' });
    return res.status(200).json({ message: 'Course deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate({
      path: 'instructors',
      model: 'Instructor',
    });
    return res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getCourseById = async (req, res) => {
  const { courseId } = req.params;

  if (!courseId) return res.status(400).json({ message: 'Provide course id.' });
  try {
    const course = await Course.findOne({
      _id: courseId,
    }).populate({
      path: 'instructors',
      model: 'Instructor',
    });
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    return res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
