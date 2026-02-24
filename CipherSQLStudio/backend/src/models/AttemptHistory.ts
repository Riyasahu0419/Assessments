import mongoose, { Schema, Document } from 'mongoose';

export interface IAttemptHistory extends Document {
  userId: mongoose.Types.ObjectId;
  assignmentId: mongoose.Types.ObjectId;
  query: string;
  isCorrect: boolean;
  executionTime: number;
  hintsUsed: number;
  attemptedAt: Date;
}

const AttemptHistorySchema = new Schema<IAttemptHistory>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  },
  query: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10000,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
  executionTime: {
    type: Number,
    required: true,
  },
  hintsUsed: {
    type: Number,
    default: 0,
  },
  attemptedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create indexes
AttemptHistorySchema.index({ userId: 1, assignmentId: 1, attemptedAt: -1 });
AttemptHistorySchema.index({ assignmentId: 1, isCorrect: 1 });

export const AttemptHistory = mongoose.model<IAttemptHistory>(
  'AttemptHistory',
  AttemptHistorySchema
);
