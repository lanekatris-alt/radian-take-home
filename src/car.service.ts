import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Car } from '@prisma/client';
import { CreateCarInput, GetCarsByModelResult } from './car.model';
import { groupBy } from 'lodash';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  getCars(): Promise<Car[]> {
    return this.prisma.car.findMany();
  }

  // I assume we'll chat on this
  // Can't get results with Mongo's groupBy?
  // Didn't seem worth it to do multiple round trips to the database. Plus, we are loading all data into memory, so why not manipulate in memory
  // I assume some map reduce could be used? Normally I'd want to push all work to the database if relevant, but for this take home I'm trying to keep things simple
  async getCarsByModel(): Promise<GetCarsByModelResult[]> {
    const cars = await this.getCars();
    const grouped = groupBy(cars, 'model');
    const keys = Object.keys(grouped);

    return keys.map((key) => ({
      make: key,
      items: grouped[key],
    }));
  }

  // See the resolver for notes, I don't like this solution, it doesn't scale, but keeping things simple for a take home
  async createCar(input: CreateCarInput): Promise<Car> {
    const {
      _max: { vehicleId: lastId },
    } = await this.prisma.car.aggregate({
      _max: {
        vehicleId: true,
      },
    });

    return this.prisma.car.create({
      data: {
        vehicleId: lastId + 1,
        ...input,
      },
    });
  }
}
