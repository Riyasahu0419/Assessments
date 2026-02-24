import mongoose, { Schema, Document } from 'mongoose';
import { TableSchema } from '../types';

export interface IAssignment extends Document {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  question: string;
  requirements: string[];
  expectedOutput?: string;
  tables: TableSchema[];
  sampleData: Record<string, any[]>;
  solutionQuery?: string;
  hints: string[];
  estimatedTime: number;
  createdAt: Date;
  updatedAt: Date;
}

const AssignmentSchema = new Schema<IAssignment>(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['easy', 'medium', 'hard'],
    },
    category: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 5000,
    },
    requirements: {
      type: [String],
      required: true,
    },
    expectedOutput: String,
    tables: {
      type: Schema.Types.Mixed,
      required: true,
    },
    sampleData: {
      type: Schema.Types.Mixed,
      required: true,
    },
    solutionQuery: String,
    hints: [String],
    estimatedTime: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
AssignmentSchema.index({ difficulty: 1, category: 1 });
AssignmentSchema.index({ createdAt: -1 });

export const Assignment = mongoose.model<IAssignment>('Assignment', AssignmentSchema);
