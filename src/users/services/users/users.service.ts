import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User as UserEntity } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { SerializedUser, User } from 'src/users/types';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, username: 'anson', password: 'anson' },
    { id: 2, username: 'danny', password: 'danny' },
    { id: 3, username: 'derek', password: 'derek' },
    { id: 4, username: 'samantha', password: 'samantha' },
  ];

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  getUsers() {
    return this.users.map((user) => plainToClass(SerializedUser, user));
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: password,
    });
    return this.userRepository.save(newUser);
  }
  findUserByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }
}
