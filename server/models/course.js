import mongoose from 'mongoose';
const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 100,
    trim: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 0,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  lectures: [lectureSchema],
});
const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  value: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
    trim: true,
    maxlength: 500,
  },
});
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    description: {
      type: String,
      required: true,
      maxLength: 1000,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    domain: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    coverImage: {
      type: String,
      required: true,
    },
    instructors: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Instructor',
    },
    // ],
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    totalLectures: {
      type: Number,
      required: true,
    },
    sections: [sectionSchema],
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
    ratings: [ratingSchema],
  },
  {
    timestamps: true,
  }
);

export const Section = mongoose.model('Section', sectionSchema);
export const Lecture = mongoose.model('Lecture', lectureSchema);

const Course = mongoose.model('Course', courseSchema);
export default Course;
