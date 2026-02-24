import { Request, Response } from 'express';
import { AssignmentRepository } from '../repositories/AssignmentRepository';
import OpenAI from 'openai';

export class HintController {
  private assignmentRepo: AssignmentRepository;
  private openai: OpenAI | null = null;
  private hintCache: Map<string, string> = new Map();

  constructor(assignmentRepo: AssignmentRepository, apiKey?: string) {
    this.assignmentRepo = assignmentRepo;
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
    }
  }

  generateHint = async (req: Request, res: Response): Promise<void> => {
    try {
      const { assignmentId, currentQuery, previousHints } = req.body;

      if (!assignmentId) {
        res.status(400).json({
          success: false,
          error: 'Missing required field: assignmentId',
        });
        return;
      }

      // Check cache
      const cacheKey = `${assignmentId}-${currentQuery}`;
      if (this.hintCache.has(cacheKey)) {
        res.json({
          success: true,
          data: {
            hint: this.hintCache.get(cacheKey),
            hintsUsed: (previousHints || []).length + 1,
          },
        });
        return;
      }

      const assignment = await this.assignmentRepo.findById(assignmentId);

      if (!assignment) {
        res.status(404).json({
          success: false,
          error: 'Assignment not found',
        });
        return;
      }

      // If no OpenAI key, return pre-written hints
      if (!this.openai) {
        const hintIndex = (previousHints || []).length;
        const hint = (assignment as any).hints?.[hintIndex] || 'No more hints available';

        res.json({
          success: true,
          data: {
            hint,
            hintsUsed: hintIndex + 1,
          },
        });
        return;
      }

      // Generate hint using LLM
      const prompt = this.buildHintPrompt(assignment, currentQuery || '', previousHints || []);
      const hint = await this.callLLMWithRetry(prompt);

      // Cache the hint
      this.hintCache.set(cacheKey, hint);

      res.json({
        success: true,
        data: {
          hint,
          hintsUsed: (previousHints || []).length + 1,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to generate hint',
      });
    }
  };

  private buildHintPrompt(assignment: any, currentQuery: string, previousHints: string[]): string {
    let prompt = `Assignment: ${assignment.title}\n\n`;
    prompt += `Question: ${assignment.question}\n\n`;
    prompt += `Requirements:\n`;

    for (const req of assignment.requirements) {
      prompt += `- ${req}\n`;
    }

    prompt += `\nTable Schemas:\n`;
    for (const table of assignment.tables) {
      prompt += `${table.name}: `;
      prompt += table.columns.map((c: any) => `${c.name} (${c.type})`).join(', ');
      prompt += `\n`;
    }

    if (currentQuery.trim().length > 0) {
      prompt += `\nUser's current query:\n${currentQuery}\n`;
    } else {
      prompt += `\nUser hasn't written any query yet.\n`;
    }

    if (previousHints.length > 0) {
      prompt += `\nPrevious hints given:\n`;
      for (let i = 0; i < previousHints.length; i++) {
        prompt += `${i + 1}. ${previousHints[i]}\n`;
      }
    }

    prompt += `\nProvide a helpful hint that guides the user toward the solution without revealing the complete SQL query. `;
    prompt += `Focus on SQL concepts, table relationships, or query structure. `;
    prompt += `Do NOT write the complete SELECT statement.`;

    return prompt;
  }

  private async callLLMWithRetry(prompt: string, maxAttempts: number = 3): Promise<string> {
    if (!this.openai) {
      throw new Error('OpenAI client not initialized');
    }

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const response = await this.openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a SQL tutor. Provide hints without revealing the complete solution.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 200,
        });

        return response.choices[0].message.content || 'Unable to generate hint';
      } catch (error) {
        if (attempt === maxAttempts - 1) {
          throw new Error('Failed to generate hint after 3 attempts');
        }
        // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt + 1) * 1000));
      }
    }

    throw new Error('Failed to generate hint');
  }
}
