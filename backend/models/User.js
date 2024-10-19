import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  education: [{
    institution: String,
    degree: String,
    year: String
  }],
  skills: [String],
  workExperience: [{
    company: String,
    position: String,
    duration: String
  }]
});

export default mongoose.model('User', userSchema);