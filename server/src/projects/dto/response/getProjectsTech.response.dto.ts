import { IsArray, IsNotEmpty } from 'class-validator';
import { TechDto } from 'src/common/dto/tech.dto';

export class GetProjectsTechResponseDto {
  @IsArray()
  @IsNotEmpty()
  ProjectsTechs: TechDto[];
}
