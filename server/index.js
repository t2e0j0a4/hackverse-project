import express from 'express';
import dotenv from 'dotenv';
import connectDB from './connections/mongoDB.js';
import cors from 'cors';
import studentRoutes from './routes/student/auth.js';
import publicRoutes from './routes/public/students.js';
import adminRoutes from './routes/admin/auth.js';
import adminCourse from './routes/admin/course/courses.js';
import adminLecture from './routes/admin/course/lecture.js';
import adminSection from './routes/admin/course/section.js';
import adminIntructor from './routes/admin/course/intructor.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/student', studentRoutes);
app.use('/api/v1/public', publicRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/admin/course', adminCourse);
app.use('/api/v1/admin/course', adminIntructor);
app.use('/api/v1/admin/course', adminLecture);
app.use('/api/v1/admin/course', adminSection);

app.listen(PORT, () => {
  console.log(`Server Listening At PORT-${PORT}`);
});
