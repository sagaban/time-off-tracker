import mongoose from 'mongoose';
import { TimeOffCode } from '@customTypes/timeOff';

const TimeOffSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: [true, 'Start date is required!'],
    trim: true,
  },
  endDate: {
    type: Date,
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
