import { IsArray, IsNotEmpty } from 'class-validator';

export class MsAgentResponse {
  @IsArray()
  @IsNotEmpty()
  projects: string[];
}
