import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Car } from '@prisma/client';
import {
  CarDto,
  CreateCarInput,
  CreateCarsInput,
  GetCarsByModelResult,
} from './car.model';
import { CarService } from './car.service';

// I prefer naming of queries/mutations to start with the object (i.e. cars, carCreate) for sorting purposes in graphiql but going off requirements
@Resolver((of) => CarDto)
export class CarsResolver {
  constructor(private service: CarService) {}

  @Query((returns) => [CarDto])
  GetAllCars(): Promise<Car[]> {
    return this.service.getCars();
  }

  @Query(() => [GetCarsByModelResult])
  GetCarsByModel(): Promise<GetCarsByModelResult[]> {
    return this.service.getCarsByModel();
  }

  @Mutation(() => CarDto)
  CreateCar(@Args('input') input: CreateCarInput) {
    return this.service.createCar(input);
  }

  // This is NOT a good implementation, it doesn't scale, not performant, not concurrent, can have collisions, and not using database to full potential (like sending multiple documents to write at once)
  // I assume we'll talk about this 😉
  // Firstly I would ask what is the use case for an auto incrementing ID. We don't get this functionality natively out of the DB
  // In a real world scenario I would explore triggers, pub sub of created data and backfilling data, etc.
  @Mutation(() => [CarDto])
  async CreateCars(@Args('input') input: CreateCarsInput) {
    const newCars: Car[] = [];

    // Intentionally synchronous :(
    for (const entry of input.entries) {
      const newCar = await this.service.createCar(entry);
      newCars.push(newCar);
    }

    return newCars;
  }
}
