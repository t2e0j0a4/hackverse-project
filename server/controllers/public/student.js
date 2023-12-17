import Student from '../../models/student.js';
export const getStudent = async (req, res) => {
  const { studentId } = req.params;
  console.log(req.param);
  if (!studentId)
    return res.status(400).json({ message: 'Privide Student id.' });
  try {
    const student = await Student.findOne({ _id: studentId }).populate({
      path: 'enrolledCourses.course',
      model: 'Course',
    });
    res.status(200).json({ student });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate({
      path: 'enrolledCourses.course',
      model: 'Course',
    });
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
