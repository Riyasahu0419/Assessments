import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
  private jwtSecret: string;

  constructor(jwtSecret: string) {
    this.jwtSecret = jwtSecret;
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  generateToken(payload: { userId: string; role: string }): string {
    return jwt.sign(payload, this.jwtSecret, {
      algorithm: 'HS256',
      expiresIn: '24h',
    });
  }

  verifyToken(token: string): { userId: string; role: string } {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as {
        userId: string;
        role: string;
      };
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
