import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.pre('save', async function (next) {
  const admin = this;
  if (this.isModified('password')) {
    admin.password = await bcrypt.hash(admin.password, 12);
  }
  next();
});
adminSchema.methods.generateAuthToken = function () {
  try {
    const token = jwt.sign(
      { id: this._id, email: this.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d',
      }
    );
    return token;
  } catch (error) {
    console.log(
      'Error while Generating Auth Token for Admin : ',
      error.message
    );
  }
};
const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
