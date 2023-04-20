import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CarDto {
  @Field(() => Int)
  vehicleId?: number;

  @Field(() => String)
  make: string;
}
