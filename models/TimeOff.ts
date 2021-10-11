import mongoose from 'mongoose';
import { TimeOffCode } from '@customTypes/timeOff';

const TimeOffSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Date is required!'],
    trim: true,
  },
  type: {
    type: TimeOffCode,
    required: [true, 'Time off type is required!'],
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: [true, 'Employee is required!'],
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.TimeOff || mongoose.model('TimeOff', TimeOffSchema);
