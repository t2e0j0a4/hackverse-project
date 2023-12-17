import mongoose from 'mongoose';
const instructorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 30,
    },
    profilePic: {
      type: String,
      trim: true,
    },
    occupation: {
      type: String,
      required: true,
      trim: true,
      maxLength: 25,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
    description: {
      type: String,
      maxLength: 600,
    },
  },
  {
    timestamps: true,
  }
);
const Instructor = mongoose.model('Instructor', instructorSchema);
export default Instructor;
