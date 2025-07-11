import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => [Todo])
  todo() {
    return this.todoService.findAll();
  }

  @Query(() => Todo, { nullable: true })
  findUnique(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.findUnique(id);
  }

  @Mutation(() => Todo)
  createTodo(@Args('task') task: string): Promise<Todo> {
    console.log('added task:', task);
    return this.todoService.create({ task });
  }

  @Mutation(() => Todo)
  updateTodo(
    @Args('id', { type: () => Int }) id: number,
    @Args('task') task: string,
  ) {
    return this.todoService.update(id, task);
  }

  @Mutation(() => Todo)
  deleteTodo(@Args('id', { type: () => Int }) id: number): Promise<Todo> {
    return this.todoService.delete(id);
  }
}
