import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { UserRepository } from '../repositories/UserRepository';

export class AuthController {
  private authService: AuthService;
  private userRepo: UserRepository;

  constructor(authService: AuthService, userRepo: UserRepository) {
    this.authService = authService;
    this.userRepo = userRepo;
  }

  signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;

      // Validation
      if (!name || !email || !password) {
        res.status(400).json({
          success: false,
          error: 'Missing required fields: name, email, password',
        });
        return;
      }

      if (name.length < 2 || name.length > 100) {
        res.status(400).json({
          success: false,
          error: 'Name must be between 2 and 100 characters',
        });
        return;
      }

      if (password.length < 8) {
        res.status(400).json({
          success: false,
          error: 'Password must be at least 8 characters',
        });
        return;
      }

      // Check if user exists
      const existingUser = await this.userRepo.findByEmail(email);
      if (existingUser) {
        res.status(409).json({
          success: false,
          error: 'Email already exists',
        });
        return;
      }

      // Hash password and create user
      const passwordHash = await this.authService.hashPassword(password);
      const user = await this.userRepo.create({
        name,
        email,
        passwordHash,
        role: 'student',
      } as any);

      // Generate token
      const token = this.authService.generateToken({
        userId: user._id.toString(),
        role: user.role,
      });

      res.status(201).json({
        success: true,
        data: {
          token,
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Signup failed',
      });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          error: 'Missing required fields: email, password',
        });
        return;
      }

      // Find user
      const user = await this.userRepo.findByEmail(email);
      if (!user) {
        res.status(401).json({
          success: false,
          error: 'Invalid credentials',
        });
        return;
      }

      // Verify password
      const isValid = await this.authService.comparePassword(password, user.passwordHash);
      if (!isValid) {
        res.status(401).json({
          success: false,
          error: 'Invalid credentials',
        });
        return;
      }

      // Update last login
      await this.userRepo.updateLastLogin(user._id.toString());

      // Generate token
      const token = this.authService.generateToken({
        userId: user._id.toString(),
        role: user.role,
      });

      res.json({
        success: true,
        data: {
          token,
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Login failed',
      });
    }
  };
}
