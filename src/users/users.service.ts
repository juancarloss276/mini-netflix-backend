import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async createAdmin() {
  const exists = await this.findByUsername('admin');
  if (exists) return exists;

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = this.usersRepository.create({
    username: 'admin',
    password: hashedPassword,
    role: 'admin',
  });

  return this.usersRepository.save(admin);
}
}
