import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export enum Make {
  Toyota = 'Toyota',
  Nissan = 'Nissan',
  BMW = 'BMW',
  Chevrolet = 'Chevrolet',
  Audi = 'Audi',
  Kia = 'Kia',
}

registerEnumType(Make, {
  name: 'Make',
});

@ObjectType()
export class CarDto {
  @Field(() => Int)
  vehicleId: number;

  @Field(() => Make)
  make: string;

  @Field(() => String)
  model: string;

  @Field(() => Number)
  year: number;

  @Field(() => String)
  color: string;
}

@InputType()
export class CreateCarInput {
  @Field(() => Make)
  make: string;

  @Field(() => String)
  model: string;

  @Field(() => Number)
  year: number;

  @Field(() => String)
  color: string;
}

@InputType()
export class CreateCarsInput {
  @Field(() => [CreateCarInput])
  entries: CreateCarInput[];
}

// @InputType()
// export class GetCarsByModelInput {
//   @Field(() => String)
//   model: string;
// }

@ObjectType()
export class GetCarsByModelResult {
  @Field(() => String)
  make: string;

  @Field(() => [CarDto])
  items: CarDto[];
}
