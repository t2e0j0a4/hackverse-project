import Course from '../../../models/course.js';

export const addSection = async (req, res) => {
  const { courseId } = req.params;
  const { title } = req.body;

  if (!courseId) return res.status(400).json({ message: 'Provide Course id.' });
  if (!title) return res.status(400).json({ message: 'Provide Title.' });
  try {
    const course = await Course.findOne({
      _id: courseId,
      owner: req.admin._id,
    });
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    course.sections.push({ title });
    await course.save();
    return res.status(201).json({ message: 'Section Added.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const getAllSections = async (req, res) => {
  const { courseId } = req.params;
  if (!courseId) return res.status(400).json({ message: 'Provide Course id.' });

  try {
    const { sections } = await Course.findById(courseId);
    res.status(200).json({ sections });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getSectionById = async (req, res) => {
  const { courseId, sectionId } = req.params;

  if (!courseId) return res.status(400).json({ message: 'Provide Course id.' });
  if (!sectionId)
    return res.status(400).json({ message: 'Provide Section id.' });
  try {
    const course = await Course.findOne({
      _id: courseId,
    });
    const section = course.sections.find(
      (section) => section._id.toString() === sectionId.toString()
    );
    if (!section)
      return res.status(404).json({ message: 'Section Not Found.' });

    res.status(200).json({ section });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSection = async (req, res) => {
  const { title, sectionId } = req.body;
  const { courseId } = req.params;

  if (!courseId) return res.status(400).json({ message: 'Provide Course id.' });
  if (!sectionId)
    return res.status(400).json({ message: 'Provide Section id.' });
  try {
    const course = await Course.findOne({
      _id: courseId,
      owner: req.admin._id,
    });
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    const sectionIdex = course.sections.findIndex(
      (section) => section._id.toString() === sectionId.toString()
    );
    if (!sectionIdex)
      return res.status(404).json({ message: 'Section not found.' });
    if (title) course.sections[sectionIdex].title = title;
    await course.save();
    res.status(201).json({ messaje: 'Section Updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteSection = async (req, res) => {
  const { courseId } = req.params;
  const { sectionId } = req.body;
  if (!courseId) return res.status(400).json({ message: 'Provide Course id.' });
  if (!sectionId)
    return res.status(400).json({ message: 'Provide Section id.' });
  try {
    const course = await Course.findOne({
      _id: courseId,
      owner: req.admin._id,
    });
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    const sectionIdex = course.sections.findIndex(
      (section) => section._id.toString() === sectionId.toString()
    );
    if (sectionIdex === -1) {
      return res.status(404).json({ message: 'Section not found.' });
    }
    console.log(sectionIdex);
    course.sections.splice(sectionIdex, 1);
    await course.save();
    res.status(200).json({ messaje: 'Section Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
