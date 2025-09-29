import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserDummy } from './user-dummy.interface';

@Injectable()
export class UserDummyService {
  private users: UserDummy[] = [
    { id: 1, name: 'John Doe', email: 'test1@email.com' },
    { id: 2, name: 'Jane Smith', email: 'test2@email.com' },
    { id: 3, name: 'Alice Johnson', email: 'test3@email.com' },
    { id: 4, name: 'Bob Brown', email: 'test4@email.com' },
    { id: 5, name: 'Charlie Davis', email: 'test5@email.com' },
    { id: 6, name: 'Diana Evans', email: 'test6@email.com' },
    { id: 7, name: 'Frank Green', email: 'test7@email.com' },
    { id: 8, name: 'Grace Harris', email: 'test8@email.com' },
    { id: 9, name: 'Hank Ingram', email: 'test9@email.com' },
    { id: 10, name: 'Ivy ', email: 'test10@email.com' },
    { id: 11, name: 'Jackson', email: 'test11@email.com' },
    { id: 12, name: 'Jon Test', email: 'test12@email.com' },
  ];

  findAll(page = 1, size = 10) {
    const start = (page - 1) * size;
    const end = start + size;

    const data = this.users.slice(start, end);
    return {
      data,
      currentPage: page,
      size,
      totalData: this.users.length,
    };
  }

  findOne(id: number): UserDummy {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotAcceptableException(`User with ID ${id} not found`);
    }
    return user;
  }

  create(user: Omit<UserDummy, 'id'>): UserDummy {
    const emailExists = this.users.some((u) => u.email === user.email);
    if (emailExists) throw new Error('EMAIL_EXISTS');

    const newUser = { ...user, id: Date.now() };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: Partial<UserDummy>): UserDummy {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotAcceptableException(`User with ID ${id} not found`);
    }

    // Cek jika ada email baru
    if (updatedUser.email) {
      const currentUser = this.users[userIndex];
      if (updatedUser.email !== currentUser.email) {
        const emailExists = this.users.some(
          (user) => user.email === updatedUser.email && user.id !== id,
        );
        if (emailExists) throw new Error('EMAIL_EXISTS');
      }
    }

    this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
    return this.users[userIndex];
  }

  delete(id: number): void {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotAcceptableException(`User with ID ${id} not found`);
    }
    this.users.splice(userIndex, 1);
  }
}
