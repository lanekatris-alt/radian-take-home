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

// I cheat and my DTO/graphql attributed model MATCHES my database... So I don't have to do any mapping in resolvers of types. KISS
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

@ObjectType()
export class GetCarsByModelResult {
  @Field(() => String)
  make: string;

  @Field(() => [CarDto])
  items: CarDto[];
}
