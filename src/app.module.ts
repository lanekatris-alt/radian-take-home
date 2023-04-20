import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CarsResolver } from './cars.resolver';
import { PrismaService } from './prisma.service';
import { CarService } from './car.service';

// In a real world I would have a car module since that seems to be a domain. Keeping things simple for a take home
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [],
  providers: [CarsResolver, PrismaService, CarService],
})
export class AppModule {}
