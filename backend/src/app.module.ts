import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { TodoModule } from './todo/todo.module';
import { PrismaModule } from './prisma/prisma.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      sortSchema: true,
      plugins : [ApolloServerPluginLandingPageLocalDefault()],
      cors: {
        origin: 'http://localhost:5173',
        credentials: true,
      },   
    }),
    PrismaModule,
    TodoModule,
  ],
})
export class AppModule {}


