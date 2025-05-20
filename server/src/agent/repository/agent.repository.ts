import axios, { AxiosInstance } from 'axios';
import { ProjectRecomendationsRequestDto } from '../dto/request/projectRecomendations.request.dto';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { ProjectRecomendationsResponseDto } from '../dto/response/projectRecomendations.response.dto';
import { lastValueFrom } from 'rxjs';

export class AgentRepository {
  private httpClient: AxiosInstance;
  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.MS_AGENT_HELPER,
      timeout: 5000,
    });
  }

  async agentProjectRecomendations(
    payload: ProjectRecomendationsRequestDto,
  ): Promise<ProjectRecomendationsResponseDto> {
    try {
      const response = await this.httpClient.post(
        '/api/agent/recommend',
        payload,
      );
      Logger.log(
        'Project recomendations succesfully requested',
        'AgentRepository',
      );
      return {
        projects: response.data,
      };
    } catch (error) {
      Logger.error('Error on MsAgent request', error.stack, 'AgentRepository');
      throw new InternalServerErrorException('Failed to request projects');
    }
  }
}
