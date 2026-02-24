import { Request, Response } from 'express';
import { AssignmentRepository } from '../repositories/AssignmentRepository';

export class AssignmentController {
  private assignmentRepo: AssignmentRepository;

  constructor(assignmentRepo: AssignmentRepository) {
    this.assignmentRepo = assignmentRepo;
  }

  getAllAssignments = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
      const difficulty = req.query.difficulty as string;
      const category = req.query.category as string;

      const { assignments, total } = await this.assignmentRepo.findAll(
        page,
        limit,
        difficulty,
        category
      );

      res.json({
        success: true,
        data: assignments,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch assignments',
      });
    }
  };

  getAssignmentById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const assignment = await this.assignmentRepo.findById(id);

      if (!assignment) {
        res.status(404).json({
          success: false,
          error: 'Assignment not found',
        });
        return;
      }

      res.json({
        success: true,
        data: assignment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch assignment',
      });
    }
  };
}
