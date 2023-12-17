import mongoose from 'mongoose';
import Course from '../../models/course.js';
import Student from '../../models/student.js';

export const enrollCourse = async (req, res) => {
  const { courseId } = req.params;
  if (!courseId) return res.status(400).json({ message: 'Provide course id.' });
  try {
    const course = await Course.findOne({ _id: courseId });
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    if (course.enrolledStudents.includes(req.rootStudent._id))
      return res.status(400).json({ message: 'User already enrolled' });
    course.enrolledStudents.push(req.rootStudent._id);
    req.rootStudent.enrolledCourses.push({
      course: course._id,
    });
    await req.rootStudent.save();
    await course.save();
    res.status(201).json({ message: 'Course Enrolled' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const courseProgress = async (req, res) => {
  // /:userId/progress/:courseId/:sectionIndex/:lectureIndex
  try {
    const { courseId, sectionId, lectureId } = req.params;

    // Find the enrolled course
    const query = {
      _id: req.rootStudent._id,
      'enrolledCourses.course': new mongoose.Types.ObjectId(courseId),
    };

    const update = {
      $set: {
        'enrolledCourses.course.sections.$[sectionIndex].lectures.$[lectureIndex].completed': true,
      },
    };

    const options = {
      arrayFilters: [
        { 'sectionIndex._id': new mongoose.Types.ObjectId(sectionId) },
        { 'lectureIndex._id': new mongoose.Types.ObjectId(lectureId) },
      ],
    };

    const result = await Student.updateOne(query, update, options);

    // Check if the update was successful
    if (result.nModified === 1) {
      return res.json({ message: 'Lecture marked as completed successfully.' });
    } else {
      return res
        .status(500)
        .json({ error: 'Failed to update student progress.' });
    }
  } catch (error) {
    console.log('THIS IS ERROR');
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
const calculateOverallCourseProgress = (enrolledCourse) => {
  const totalSections = enrolledCourse.course.sections.length;
  let totalProgress = 0;

  enrolledCourse.course.sections.forEach((section) => {
    totalProgress += section.completed ? 100 : 0;
  });

  return totalProgress / enrolledCourse.course.totalLectures;
};
