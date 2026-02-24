import { AttemptHistory, IAttemptHistory } from '../models/AttemptHistory';

export class AttemptHistoryRepository {
  async create(data: Partial<IAttemptHistory>): Promise<IAttemptHistory> {
    const attempt = new AttemptHistory(data);
    return await attempt.save();
  }

  async findByUser(
    userId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<{ attempts: any[]; total: number }> {
    const skip = (page - 1) * limit;

    const [attempts, total] = await Promise.all([
      AttemptHistory.find({ userId })
        .sort({ attemptedAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('assignmentId', 'title difficulty')
        .lean(),
      AttemptHistory.countDocuments({ userId }),
    ]);

    return { attempts, total };
  }
}
