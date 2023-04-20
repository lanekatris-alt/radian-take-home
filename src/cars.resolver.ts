import { Mutation, Query, Resolver } from '@nestjs/graphql';

import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Car } from '@prisma/client';
import { CarDto } from './car.model';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  async getCars(): Promise<Car[]> {
    return this.prisma.car.findMany();
  }

  async createCar(): Promise<Car> {
    const {
      _max: { vehicleId: lastId },
    } = await this.prisma.car.aggregate({
      _max: {
        vehicleId: true,
      },
    });

    // console.log('lastid', lastId._max.vehicleId);

    return this.prisma.car.create({
      data: { vehicleId: lastId + 1, make: 'Toyota' },
    });
  }
}

@Resolver((of) => CarDto)
export class CarsResolver {
  constructor(private service: CarService) {}

  @Query((returns) => [CarDto])
  async GetAllCars(): Promise<Car[]> {
    const r = await this.service.getCars();

    return r;
    // return r.map(x => {
    //   ...x
    // })
    // return [{ id: 1 }, { id: 2 }];
  }

  @Mutation(() => CarDto)
  CreateCar() {
    // const r = await this.service.
    return this.service.createCar();
  }
}
