import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required!'],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  startingDate: {
    type: Date,
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);
