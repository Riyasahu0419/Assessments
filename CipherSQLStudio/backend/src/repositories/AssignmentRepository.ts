import { Assignment, IAssignment } from '../models/Assignment';
import { AssignmentDetail } from '../types';

export class AssignmentRepository {
  async findAll(
    page: number = 1,
    limit: number = 20,
    difficulty?: string,
    category?: string
  ): Promise<{ assignments: any[]; total: number }> {
    const query: any = {};

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (category) {
      query.category = category;
    }

    const skip = (page - 1) * limit;

    const [assignments, total] = await Promise.all([
      Assignment.find(query)
        .select('-solutionQuery')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Assignment.countDocuments(query),
    ]);

    return { assignments, total };
  }

  async findById(id: string): Promise<AssignmentDetail | null> {
    const assignment = await Assignment.findById(id).select('-solutionQuery').lean();

    if (!assignment) {
      return null;
    }

    return {
      id: assignment._id.toString(),
      title: assignment.title,
      description: assignment.description,
      difficulty: assignment.difficulty,
      category: assignment.category,
      question: assignment.question,
      requirements: assignment.requirements,
      tables: assignment.tables,
      sampleData: assignment.sampleData,
      estimatedTime: assignment.estimatedTime,
    };
  }

  async create(data: Partial<IAssignment>): Promise<IAssignment> {
    const assignment = new Assignment(data);
    return await assignment.save();
  }
}
