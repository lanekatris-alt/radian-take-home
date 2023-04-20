import { Query, Resolver } from '@nestjs/graphql';
import { Car } from './car.model';

@Resolver((of) => Car)
export class CarsResolver {
  @Query((returns) => [Car])
  GetAllCars(): Car[] {
    return [{ id: 1 }, { id: 2 }];
  }
}
