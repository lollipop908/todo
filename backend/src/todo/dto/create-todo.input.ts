import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field(() => String)
  task: string;
}