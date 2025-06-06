import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetChargeabilityResponseDto {
  @IsNumber()
  @IsNotEmpty()
  chargeability: number;
}
