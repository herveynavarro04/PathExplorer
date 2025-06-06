import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateChargeabilityRequestDto {
  @IsNumber()
  @IsNotEmpty()
  newChargeability: number;
}
