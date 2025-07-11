import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { Todo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  async findUnique(id: number): Promise<Todo | null> {
    return this.prisma.todo.findUnique({
      where: { id },
    });
  }

  async create(createTodoInput: CreateTodoInput): Promise<Todo> {
    return this.prisma.todo.create({
      data: {
        task: createTodoInput.task,
      },
    });
  }

  async update(id: number, task: string): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id },
      data: { task },
    });
  }

  async delete(id: number): Promise<Todo> {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
