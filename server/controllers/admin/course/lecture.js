import { uploadToS3 } from '../../../connections/Aws.js';
import Course from '../../../models/course.js';
export const addLecture = async (req, res) => {
  const { courseId, sectionId } = req.params;
  const { title, duration } = req.body;
  const lectureVideo = req.file;

  if (!courseId) return res.status(400).json({ message: 'Provide course id.' });
  if (!sectionId)
    return res.status(400).json({ message: 'Provide course id.' });
  if (!title) return res.status(400).json({ message: 'Provide Title.' });
  if (!duration) return res.status(400).json({ message: 'Provide Duration.' });
  if (!lectureVideo)
    return res.status(400).json({ message: 'Provide Lecture Video.' });
  try {
    let course = await Course.findOne({
      _id: courseId,
      owner: req.admin._id,
    });
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    let section = course.sections.find(
      (section) => section._id.toString() === sectionId
    );
    if (!section)
      return res.status(404).json({ message: 'Section not found.' });
    const format = lectureVideo.originalname.split('.').pop().toLowerCase();

    if (!format) {
      return res
        .status(400)
        .json({ message: 'Could not determine image format' });
    }
    const result = await uploadToS3(
      lectureVideo.buffer,
      `course/${
        course._id.toString() + 'Z7Edja'
      }/${Date.now().toString()}.${format}`
    );
    const newLecture = {
      title,
      duration,
      videoUrl: result.Location,
    };
    section.lectures.push(newLecture);
    await course.save();
    return res.status(201).json({ message: 'lecture Added' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateLecture = async (req, res) => {
  const { courseId, sectionId, lectureId } = req.params;
  const { title, duration } = req.body;
  const lectureVideo = req.file;

  if (!courseId) return res.status(400).json({ message: 'Provide course id.' });
  if (!sectionId)
    return res.status(400).json({ message: 'Provide section id.' });
  if (!lectureId)
    return res.status(400).json({ message: 'Provide lecture id' });
  try {
    let course = await Course.findOne({
      _id: courseId,
      owner: req.admin._id,
    });
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    let section = course.sections.find(
      (section) => section._id.toString() === sectionId
    );
    if (!section)
      return res.status(404).json({ message: 'Section not found.' });
    let lecture = section.lectures.find(
      (lecture) => lecture._id.toString() === lectureId.toString()
    );
    if (!lecture)
      return res.status(404).json({ message: 'Lecture not found.' });
    if (title) lecture.title = title;
    if (duration) lecture.duration = duration;

    if (lectureVideo) {
      const result = await uploadToS3(
        lectureVideo.buffer,
        `course/${
          course._id.toString() + 'Z7Edja'
        }/${Date.now().toString()}.${format}`
      );
      lecture.videoUrl = result.Location;
    }
    await course.save();
    res.status(201).json({ message: 'Lecture updated.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteLecture = async (req, res) => {
  const { courseId, sectionId, lectureId } = req.params;
  if (!courseId) return res.status(400).json({ message: 'Provide course id.' });
  if (!sectionId)
    return res.status(400).json({ message: 'Provide course id.' });
  if (!lectureId)
    return res.status(400).json({ message: 'Provide lecture id' });
  try {
    let course = await Course.findOne({
      _id: courseId,
      owner: req.admin._id,
    });
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    let section = course.sections.find(
      (section) => section._id.toString() === sectionId
    );
    if (!section)
      return res.status(404).json({ message: 'Section not found.' });
    let lectureIndex = section.lectures.findIndex(
      (lecture) => lecture._id.toString() === lectureId.toString()
    );
    if (lectureIndex === -1)
      return res.status(404).json({ message: 'Lecture not found.' });
    section.lectures.splice(lectureIndex, 1);
    await course.save();
    res.status(200).json({ message: 'Lecture Deleted.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getLecturesBySection = async (req, res) => {
  const { courseId, sectionId } = req.params;
  if (!courseId) return res.status(400).json({ message: 'Provide course id.' });
  if (!sectionId)
    return res.status(400).json({ message: 'Provide course id.' });

  try {
    let course = await Course.findOne({
      _id: courseId,
      // owner: req.rootUser._id,
    });
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    let section = course.sections.find(
      (section) => section._id.toString() === sectionId
    );
    if (!section)
      return res.status(404).json({ message: 'Section not found.' });
    const lectures = section.lectures;
    res.status(200).json({ lectures });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getLectureById = async (req, res) => {
  const { courseId, sectionId, lectureId } = req.params;
  if (!courseId) return res.status(400).json({ message: 'Provide course id.' });
  if (!sectionId)
    return res.status(400).json({ message: 'Provide course id.' });
  if (!lectureId)
    return res.status(400).json({ message: 'Provide lecture id' });
  try {
    let course = await Course.findOne({
      _id: courseId,
      // owner: req.rootUser._id,
    });
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    let section = course.sections.find(
      (section) => section._id.toString() === sectionId.toString()
    );
    if (!section)
      return res.status(404).json({ message: 'Section not found.' });
    let lecture = section.lectures.find(
      (lecture) => lecture._id.toString() === lectureId.toString()
    );
    res.status(200).json({ lecture });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
